// NutriTrack Deployment Configuration
// Centralized path configuration for all environments
// Single source of truth for deployment paths

const DEPLOY_CONFIG = {
  // Base paths for production and test environments
  BASE_PATH: '/NutriTrack/',
  TEST_BASE_PATH: '/NutriTrack-test/',
  
  // Asset definitions
  ASSETS: {
    FOODS_JSON: 'foods.json',
    MAIN_JS: 'NutriTrack.js',
    MAIN_JSX: 'NutriTrack.jsx',
    SW_JS: 'sw.js',
    MANIFEST: 'manifest.webmanifest',
    ICONS: 'icons/',
    INDEX_HTML: 'index.html',
    RECOVER_HTML: 'recover.html',
  },
  
  // Version configuration
  CACHE_VERSION: 'nutritrack-v75',
  APP_VERSION: '75',
  BUILD_VERSION: 'v75',
  FOODS_DB_VERSION: '5',
  
  // Babel configuration for build process
  BABEL_CONFIG: {
    presets: [['@babel/preset-react', { runtime: 'classic' }], ['@babel/preset-env', { modules: false }]],
    plugins: [],
  },
  
  // Worker configuration
  WORKER_ORIGIN: 'https://nutritrack-proxy.nickkropf.workers.dev',
  WORKER_FETCH_CONCURRENCY: 3,
};

// Get the full path for an asset in a given environment
function getPath(assetKey, isTest = false) {
  const base = isTest ? DEPLOY_CONFIG.TEST_BASE_PATH : DEPLOY_CONFIG.BASE_PATH;
  return base + DEPLOY_CONFIG.ASSETS[assetKey];
}

// Get all precache assets for a given environment
function getPrecacheAssets(isTest = false) {
  const base = isTest ? DEPLOY_CONFIG.TEST_BASE_PATH : DEPLOY_CONFIG.BASE_PATH;
  return [
    base + DEPLOY_CONFIG.ASSETS.MAIN_JS,
    base + DEPLOY_CONFIG.ASSETS.FOODS_JSON,
    base + DEPLOY_CONFIG.ASSETS.ICONS + 'icon-192.png',
    base + DEPLOY_CONFIG.ASSETS.ICONS + 'icon-512.png',
    base + DEPLOY_CONFIG.ASSETS.ICONS + 'apple-touch-icon.png',
  ];
}

// Get service worker registration path for a given environment
function getSWPath(isTest = false) {
  const base = isTest ? DEPLOY_CONFIG.TEST_BASE_PATH : DEPLOY_CONFIG.BASE_PATH;
  return base + DEPLOY_CONFIG.ASSETS.SW_JS;
}

// Get service worker scope for a given environment
function getSWScope(isTest = false) {
  return isTest ? DEPLOY_CONFIG.TEST_BASE_PATH : DEPLOY_CONFIG.BASE_PATH;
}

// Get foods.json URL for a given environment
function getFoodsJsonUrl(isTest = false) {
  const base = isTest ? DEPLOY_CONFIG.TEST_BASE_PATH : DEPLOY_CONFIG.BASE_PATH;
  return base + DEPLOY_CONFIG.ASSETS.FOODS_JSON + '?v=' + DEPLOY_CONFIG.FOODS_DB_VERSION;
}

// Export for Node.js usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DEPLOY_CONFIG,
    getPath,
    getPrecacheAssets,
    getSWPath,
    getSWScope,
    getFoodsJsonUrl,
  };
}
