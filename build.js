#!/usr/bin/env node
// NutriTrack Build Script
// Automated Babel compilation from NutriTrack.jsx to NutriTrack.js
// All paths are injected from deploy-config.js using placeholder tokens

const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const { DEPLOY_CONFIG, getPath, getPrecacheAssets, getSWPath, getSWScope } = require('./deploy-config.js');

console.log('Building NutriTrack...');
console.log('Version:', DEPLOY_CONFIG.CACHE_VERSION);

try {
  // Read the JSX source
  const jsxPath = path.join(__dirname, DEPLOY_CONFIG.ASSETS.MAIN_JSX);
  const jsPath = path.join(__dirname, DEPLOY_CONFIG.ASSETS.MAIN_JS);
  
  if (!fs.existsSync(jsxPath)) {
    throw new Error(`JSX source not found: ${jsxPath}`);
  }
  
  console.log('Reading:', jsxPath);
  const jsxCode = fs.readFileSync(jsxPath, 'utf8');
  
  // Transform with Babel
  console.log('Compiling with Babel...');
  const result = babel.transformSync(jsxCode, DEPLOY_CONFIG.BABEL_CONFIG);
  let compiledCode = result.code;
  
  // Post-process the compiled code:
  // 1. Remove ESM import statements (React is loaded as UMD global)
  compiledCode = compiledCode.replace(
    /^\s*import\s+{[^}]*}\s*from\s*["']react["']\s*;\s*\n/gm,
    ''
  );
  
  // 2. Convert export default function to plain function
  compiledCode = compiledCode.replace(
    /\bexport\s+default\s+function\s+NutriTrack\b/,
    'function NutriTrack'
  );
  
  // 3. Add the loader footer
  compiledCode = compiledCode.trimEnd() + '\n';
  compiledCode += 'window.NutriTrack = NutriTrack;\n';
  compiledCode += 'window._MainApp = (typeof NutriTrack !== "undefined" ? NutriTrack : null);\n';
  
  // 4. Add header comment
  const headerComment = `// NutriTrack - Pre-compiled by Babel (${DEPLOY_CONFIG.CACHE_VERSION})\n` +
    `// Built from ${DEPLOY_CONFIG.ASSETS.MAIN_JSX} on ${new Date().toISOString()}\n` +
    `// React and ReactDOM are UMD globals loaded from CDN\n`;
  compiledCode = headerComment + compiledCode;
  
  // Write the compiled output
  console.log('Writing:', jsPath);
  fs.writeFileSync(jsPath, compiledCode, 'utf8');
  console.log('\u2713 Compiled', jsxPath, '->', jsPath);
  
  // ========================================================================
  // Update sw.js - Replace PLACEHOLDER TOKENS with values from deploy-config
  // ========================================================================
  console.log('Updating sw.js placeholders from deploy-config.js...');
  let swJs = fs.readFileSync('sw.js', 'utf8');
  
  // Get values for PRODUCTION environment (isTest = false)
  const basePath = DEPLOY_CONFIG.BASE_PATH;
  const precacheAssets = getPrecacheAssets(false);
  const swScope = getSWScope(false);
  
  // Replace placeholder tokens with actual values
  swJs = swJs.replace(/NUTRITRACK_CACHE_VERSION/g, DEPLOY_CONFIG.CACHE_VERSION);
  swJs = swJs.replace(/NUTRITRACK_WORKER_ORIGIN/g, DEPLOY_CONFIG.WORKER_ORIGIN);
  swJs = swJs.replace(/NUTRITRACK_BASE_PATH/g, basePath);
  
  // Replace PRECACHE_ASSETS placeholder with actual array
  const precacheAssetsString = '[' + precacheAssets.map(a => `\n  "${a}"`).join(',') + '\n]';
  swJs = swJs.replace(/NUTRITRACK_PRECACHE_ASSETS/g, precacheAssetsString);
  
  // Also replace BASE_PATH variable assignment
  swJs = swJs.replace(/const BASE_PATH = "NUTRITRACK_BASE_PATH";/, `const BASE_PATH = "${basePath}";`);
  
  fs.writeFileSync('sw.js', swJs, 'utf8');
  console.log('\u2713 Updated sw.js placeholders for PRODUCTION');
  console.log('   - CACHE_VERSION:', DEPLOY_CONFIG.CACHE_VERSION);
  console.log('   - WORKER_ORIGIN:', DEPLOY_CONFIG.WORKER_ORIGIN);
  console.log('   - BASE_PATH:', basePath);
  console.log('   - SW_SCOPE:', swScope);
  console.log('   - PRECACHE_ASSETS:', precacheAssets.length, 'assets');
  
  // ========================================================================
  // Update index.html - Replace PLACEHOLDER TOKENS with values from deploy-config
  // ========================================================================
  console.log('Updating index.html placeholders from deploy-config.js...');
  let indexHtml = fs.readFileSync('index.html', 'utf8');
  
  const manifestPath = getPath('MANIFEST');
  const appleTouchIconPath = getPath('ICONS') + 'apple-touch-icon.png';
  const swPath = getSWPath(false);
  
  // Replace placeholder tokens with actual values
  indexHtml = indexHtml.replace(/NUTRITRACK_MANIFEST_PATH/g, manifestPath);
  indexHtml = indexHtml.replace(/NUTRITRACK_APPLE_TOUCH_ICON_PATH/g, appleTouchIconPath);
  indexHtml = indexHtml.replace(/NUTRITRACK_SW_PATH/g, swPath);
  indexHtml = indexHtml.replace(/NUTRITRACK_SW_SCOPE/g, swScope);
  
  // Update SHELL_APP_VERSION
  indexHtml = indexHtml.replace(
    /const SHELL_APP_VERSION = ['"](.*)['"]/,
    `const SHELL_APP_VERSION = '${DEPLOY_CONFIG.BUILD_VERSION}'`
  );
  
  // Update build-info comment
  indexHtml = indexHtml.replace(
    /v\d+ - \d{4}-\d{2}-\d{2} \d{2}:\d{2}/,
    `${DEPLOY_CONFIG.BUILD_VERSION} - ${new Date().toISOString().split('T')[0]} ${new Date().toTimeString().split(' ')[0]}`
  );
  
  fs.writeFileSync('index.html', indexHtml, 'utf8');
  console.log('\u2713 Updated index.html placeholders for PRODUCTION');
  console.log('   - MANIFEST_PATH:', manifestPath);
  console.log('   - APPLE_TOUCH_ICON_PATH:', appleTouchIconPath);
  console.log('   - SW_PATH:', swPath);
  console.log('   - SW_SCOPE:', swScope);
  
  // Validate the compiled output
  console.log('Validating compiled output...');
  
  try {
    const syntaxCheck = fs.readFileSync(jsPath, 'utf8');
    new Function(syntaxCheck);
    console.log('\u2713 Compiled JavaScript has valid syntax');
  } catch (e) {
    console.warn('\u26a0 Syntax check warning:', e.message);
  }
  
  if (compiledCode.includes('React.') || compiledCode.includes('window.React')) {
    console.log('\u2713 React used as global');
  }
  
  if (compiledCode.includes('window._MainApp')) {
    console.log('\u2713 window._MainApp assignment present');
  }
  
  console.log('\n\u2705 Build successful!');
  console.log(`   Version: ${DEPLOY_CONFIG.CACHE_VERSION}`);
  console.log(`   App Version: ${DEPLOY_CONFIG.APP_VERSION}`);
  console.log(`   Built: ${new Date().toISOString()}`);
  
} catch (error) {
  console.error('\u274c Build failed:', error.message);
  if (error.stack) {
    console.error(error.stack);
  }
  process.exit(1);
}
