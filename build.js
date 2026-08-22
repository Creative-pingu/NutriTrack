#!/usr/bin/env node
// NutriTrack Build Script
// Automated Babel compilation from NutriTrack.jsx to NutriTrack.js

const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const { DEPLOY_CONFIG, getPath } = require('./deploy-config.js');

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
  console.log('✓ Compiled', jsxPath, '->', jsPath);
  
  // Update index.html version references
  console.log('Updating index.html versions...');
  let indexHtml = fs.readFileSync('index.html', 'utf8');
  
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
  
  // Update SW registration version
  indexHtml = indexHtml.replace(
    /\/NutriTrack\/sw\.js\?v=v\d+/g,
    `/NutriTrack/sw.js?v=${DEPLOY_CONFIG.BUILD_VERSION}`
  );
  
  fs.writeFileSync('index.html', indexHtml, 'utf8');
  console.log('✓ Updated index.html version references');
  
  // Update sw.js CACHE_VERSION
  console.log('Updating sw.js CACHE_VERSION...');
  let swJs = fs.readFileSync('sw.js', 'utf8');
  swJs = swJs.replace(
    /const CACHE_VERSION = ["']nutritrack-v\d+["']/,
    `const CACHE_VERSION = "${DEPLOY_CONFIG.CACHE_VERSION}"`
  );
  fs.writeFileSync('sw.js', swJs, 'utf8');
  console.log('✓ Updated sw.js CACHE_VERSION');
  
  // Validate the compiled output
  console.log('Validating compiled output...');
  
  // Check that it's valid JavaScript syntax
  try {
    const syntaxCheck = require('fs').readFileSync(jsPath, 'utf8');
    // Simple syntax check - Node.js will throw if there's a syntax error
    new Function(syntaxCheck);
    console.log('✓ Compiled JavaScript has valid syntax');
  } catch (e) {
    console.warn('⚠ Syntax check warning:', e.message);
  }
  
  // Check for ESM imports/exports (should be none)
  if (compiledCode.includes('import ') || compiledCode.includes('export ')) {
    console.warn('⚠ Warning: Compiled output still contains ESM imports/exports');
  } else {
    console.log('✓ No ESM imports/exports in compiled output');
  }
  
  // Check for React global usage
  if (compiledCode.includes('React.') || compiledCode.includes('window.React')) {
    console.log('✓ React used as global');
  }
  
  // Check for window._MainApp assignment
  if (compiledCode.includes('window._MainApp')) {
    console.log('✓ window._MainApp assignment present');
  }
  
  console.log('\n✅ Build successful!');
  console.log(`   Version: ${DEPLOY_CONFIG.CACHE_VERSION}`);
  console.log(`   App Version: ${DEPLOY_CONFIG.APP_VERSION}`);
  console.log(`   Built: ${new Date().toISOString()}`);
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  if (error.stack) {
    console.error(error.stack);
  }
  process.exit(1);
}
