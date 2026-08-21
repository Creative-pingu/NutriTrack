#!/usr/bin/env node
// NutriTrack Path Consistency Checker
// Validates that all paths in the codebase match the centralized configuration

const fs = require('fs');
const path = require('path');
const { DEPLOY_CONFIG, getPath, getPrecacheAssets, getSWPath, getSWScope, getFoodsJsonUrl } = require('../deploy-config.js');

console.log('Checking path consistency...\n');

let errors = 0;
let warnings = 0;

function checkFile(filePath, checks) {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠ File not found: ${filePath}`);
    warnings++;
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  for (const check of checks) {
    const { pattern, expected, description, shouldExist, shouldNotExist } = check;
    
    if (shouldExist) {
      if (pattern.test(content)) {
        console.log(`✓ ${filePath}: ${description}`);
      } else {
        console.error(`✗ ${filePath}: Missing expected pattern: ${description}`);
        console.error(`  Expected: ${expected}`);
        errors++;
      }
    } else if (shouldNotExist) {
      const matches = content.match(pattern);
      if (matches) {
        console.error(`✗ ${filePath}: Found unexpected hardcoded path: ${description}`);
        console.error(`  Found: ${matches.join(', ')}`);
        errors++;
      } else {
        console.log(`✓ ${filePath}: No hardcoded paths found: ${description}`);
      }
    } else {
      const matches = content.match(pattern);
      if (matches) {
        const actual = matches[0];
        if (actual === expected) {
          console.log(`✓ ${filePath}: ${description} = "${actual}"`);
        } else {
          console.error(`✗ ${filePath}: ${description}`);
          console.error(`  Expected: "${expected}"`);
          console.error(`  Found: "${actual}"`);
          errors++;
        }
      } else {
        console.error(`✗ ${filePath}: Pattern not found: ${description}`);
        console.error(`  Pattern: ${pattern}`);
        errors++;
      }
    }
  }
}

// Check index.html
console.log('=== Checking index.html ===');
checkFile('index.html', [
  {
    pattern: /const SHELL_APP_VERSION = ['"](.*)['"]/,
    expected: DEPLOY_CONFIG.BUILD_VERSION,
    description: 'SHELL_APP_VERSION matches config'
  },
  {
    pattern: /\/NutriTrack\/sw\.js\?v=v(\d+)/,
    expected: `/NutriTrack/sw.js?v=${DEPLOY_CONFIG.BUILD_VERSION}`,
    description: 'SW registration URL matches version'
  },
  {
    pattern: /scope:\s*['"]\/NutriTrack\/['"]/,
    expected: '/NutriTrack/',
    description: 'SW scope is correct'
  },
  {
    pattern: /href=["']\/NutriTrack\/manifest\.webmanifest["']/,
    expected: '/NutriTrack/manifest.webmanifest',
    description: 'Manifest path is correct'
  },
  {
    pattern: /href=["']\/NutriTrack\/icons\/apple-touch-icon\.png["']/,
    expected: '/NutriTrack/icons/apple-touch-icon.png',
    description: 'Apple touch icon path is correct'
  },
  {
    pattern: /src=['"]\.\/NutriTrack\.js\?v=(\d+)/,
    expected: `./NutriTrack.js?v=${DEPLOY_CONFIG.APP_VERSION}`,
    description: 'NutriTrack.js load URL matches version'
  },
  {
    pattern: /hardcoded.*\/NutriTrack\/|\/NutriTrack\/.*hardcoded/,
    shouldNotExist: true,
    description: 'No hardcoded NutriTrack paths (should use config)'
  }
]);

// Check sw.js
console.log('\n=== Checking sw.js ===');
checkFile('sw.js', [
  {
    pattern: /const CACHE_VERSION = ["']nutritrack-v(\d+)["']/,
    expected: DEPLOY_CONFIG.CACHE_VERSION,
    description: 'CACHE_VERSION matches config'
  },
  {
    pattern: /\/NutriTrack\/NutriTrack\.js/,
    expected: '/NutriTrack/NutriTrack.js',
    description: 'NutriTrack.js in precache assets'
  },
  {
    pattern: /\/NutriTrack\/foods\.json/,
    expected: '/NutriTrack/foods.json',
    description: 'foods.json in precache assets'
  },
  {
    pattern: /\/NutriTrack\/icons\/icon-192\.png/,
    expected: '/NutriTrack/icons/icon-192.png',
    description: 'icon-192.png in precache assets'
  },
  {
    pattern: /\/NutriTrack\/icons\/icon-512\.png/,
    expected: '/NutriTrack/icons/icon-512.png',
    description: 'icon-512.png in precache assets'
  },
  {
    pattern: /\/NutriTrack\/icons\/apple-touch-icon\.png/,
    expected: '/NutriTrack/icons/apple-touch-icon.png',
    description: 'apple-touch-icon.png in precache assets'
  },
  {
    pattern: /url\.pathname === ["']\/NutriTrack\/["']/,
    expected: '/NutriTrack/',
    description: 'index.html path check'
  },
  {
    pattern: /url\.pathname === ["']\/NutriTrack\/index\.html["']/,
    expected: '/NutriTrack/index.html',
    description: 'index.html explicit path check'
  },
  {
    pattern: /scope:\s*['"]\/NutriTrack\/['"]/,
    shouldNotExist: true,
    description: 'SW scope should be set via registration, not in file'
  }
]);

// Check NutriTrack.jsx
console.log('\n=== Checking NutriTrack.jsx ===');
checkFile('NutriTrack.jsx', [
  {
    pattern: /const FOODS_DB_VERSION = ["'](\d+)["']/,
    expected: DEPLOY_CONFIG.FOODS_DB_VERSION,
    description: 'FOODS_DB_VERSION matches config'
  },
  {
    pattern: /\/NutriTrack\/foods\.json\?v=\$\{FOODS_DB_VERSION\}/,
    shouldExist: true,
    description: 'foods.json URL uses FOODS_DB_VERSION variable'
  },
  {
    pattern: /const WORKER_URL = ["'](https:\/\/[^"']+)["']/,
    expected: DEPLOY_CONFIG.WORKER_ORIGIN,
    description: 'WORKER_URL matches config'
  },
  {
    pattern: /const WORKER_FETCH_CONCURRENCY = (\d+)/,
    expected: DEPLOY_CONFIG.WORKER_FETCH_CONCURRENCY,
    description: 'WORKER_FETCH_CONCURRENCY matches config'
  },
  {
    pattern: /const APP_VERSION = ["'][^"']*["']/,
    shouldExist: true,
    description: 'APP_VERSION is defined (reads from window.APP_VERSION)'
  },
  {
    pattern: /hardcoded.*\/NutriTrack\/|\/NutriTrack\/.*hardcoded/,
    shouldNotExist: true,
    description: 'No hardcoded NutriTrack paths (should use config or variables)'
  }
]);

// Check deploy-config.js exists and is valid
console.log('\n=== Checking deploy-config.js ===');
if (fs.existsSync('deploy-config.js')) {
  console.log('✓ deploy-config.js exists');
  
  const configContent = fs.readFileSync('deploy-config.js', 'utf8');
  
  // Check that all expected properties are defined
  const requiredProps = [
    'BASE_PATH',
    'TEST_BASE_PATH',
    'CACHE_VERSION',
    'APP_VERSION',
    'BUILD_VERSION',
    'FOODS_DB_VERSION',
    'WORKER_ORIGIN',
    'WORKER_FETCH_CONCURRENCY'
  ];
  
  for (const prop of requiredProps) {
    if (configContent.includes(prop)) {
      console.log(`✓ ${prop} defined in config`);
    } else {
      console.error(`✗ ${prop} missing from config`);
      errors++;
    }
  }
  
  // Check that helper functions are exported
  const requiredFunctions = [
    'getPath',
    'getPrecacheAssets',
    'getSWPath',
    'getSWScope',
    'getFoodsJsonUrl'
  ];
  
  for (const func of requiredFunctions) {
    if (configContent.includes(`function ${func}`)) {
      console.log(`✓ ${func} function defined`);
    } else {
      console.error(`✗ ${func} function missing`);
      errors++;
    }
  }
} else {
  console.error('✗ deploy-config.js not found');
  errors++;
}

// Check build.js exists
console.log('\n=== Checking build.js ===');
if (fs.existsSync('build.js')) {
  console.log('✓ build.js exists');
  
  const buildContent = fs.readFileSync('build.js', 'utf8');
  
  // Check that it references deploy-config.js
  if (buildContent.includes('deploy-config.js')) {
    console.log('✓ build.js references deploy-config.js');
  } else {
    console.error('✗ build.js does not reference deploy-config.js');
    errors++;
  }
  
  // Check that it uses Babel
  if (buildContent.includes('@babel/core')) {
    console.log('✓ build.js uses @babel/core');
  } else {
    console.error('✗ build.js does not use @babel/core');
    errors++;
  }
} else {
  console.error('✗ build.js not found');
  errors++;
}

// Check recover.html exists
console.log('\n=== Checking recover.html ===');
if (fs.existsSync('recover.html')) {
  console.log('✓ recover.html exists');
  
  const recoverContent = fs.readFileSync('recover.html', 'utf8');
  
  // Check that it has the necessary functionality
  if (recoverContent.includes('exportData') && recoverContent.includes('localStorage')) {
    console.log('✓ recover.html has export functionality');
  } else {
    console.error('✗ recover.html missing export functionality');
    errors++;
  }
  
  if (recoverContent.includes('indexedDB')) {
    console.log('✓ recover.html has IndexedDB support');
  } else {
    console.warn('⚠ recover.html missing IndexedDB support');
    warnings++;
  }
  
  if (recoverContent.includes('download')) {
    console.log('✓ recover.html has download capability');
  } else {
    console.error('✗ recover.html missing download capability');
    errors++;
  }
} else {
  console.error('✗ recover.html not found');
  errors++;
}

// Check package.json exists
console.log('\n=== Checking package.json ===');
if (fs.existsSync('package.json')) {
  console.log('✓ package.json exists');
  
  const pkgContent = fs.readFileSync('package.json', 'utf8');
  const pkg = JSON.parse(pkgContent);
  
  // Check for Babel dependencies
  const requiredDeps = ['@babel/core', '@babel/preset-react', '@babel/preset-env'];
  
  for (const dep of requiredDeps) {
    if (pkg.devDependencies && pkg.devDependencies[dep]) {
      console.log(`✓ ${dep} in devDependencies`);
    } else {
      console.error(`✗ ${dep} missing from devDependencies`);
      errors++;
    }
  }
  
  // Check for scripts
  if (pkg.scripts && pkg.scripts.build) {
    console.log('✓ build script defined');
  } else {
    console.warn('⚠ build script not defined in package.json');
    warnings++;
  }
} else {
  console.error('✗ package.json not found');
  errors++;
}

// Check .husky/pre-commit exists
console.log('\n=== Checking .husky/pre-commit ===');
if (fs.existsSync('.husky/pre-commit')) {
  console.log('✓ .husky/pre-commit exists');
  
  const preCommitContent = fs.readFileSync('.husky/pre-commit', 'utf8');
  
  if (preCommitContent.includes('node build.js') || preCommitContent.includes('npm run build')) {
    console.log('✓ pre-commit runs build');
  } else {
    console.error('✗ pre-commit does not run build');
    errors++;
  }
  
  if (preCommitContent.includes('check-paths.js')) {
    console.log('✓ pre-commit runs path check');
  } else {
    console.error('✗ pre-commit does not run path check');
    errors++;
  }
} else {
  console.error('✗ .husky/pre-commit not found');
  errors++;
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('SUMMARY');
console.log('='.repeat(50));
console.log(`Errors: ${errors}`);
console.log(`Warnings: ${warnings}`);

if (errors > 0) {
  console.error('\n❌ Path consistency check FAILED');
  process.exit(1);
} else if (warnings > 0) {
  console.warn('\n⚠ Path consistency check PASSED with warnings');
  process.exit(0);
} else {
  console.log('\n✅ Path consistency check PASSED');
  process.exit(0);
}
