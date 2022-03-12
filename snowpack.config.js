module.exports = {
  mount: {
    _output: { url: '/', static: true },
    "src/scss": { url: '/dist/css' },
    "src/js": { url: '/dist/js' },
  },
  plugins: [
    [
      '@snowpack/plugin-sass', 
      { 
        native: true,
        compilerOptions: {
          loadPath: "node_modules"
        }
      }
    ]
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
    knownEntrypoints: ['gsap/gsap-core']
  },
  devOptions: {
    // Eleventy updates multiple files at once, so add a 300ms delay before we trigger a browser update
    port: 3000,
    open: "none",
    output: "stream"
  },
  buildOptions: {
    /* ... */
  },
};
