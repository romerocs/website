const snowpackConfig = require('./snowpack.config');

module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    // Templates:
    'html',
    'njk',
    'md',
    // Static Assets:
    'css',
    'jpeg',
    'jpg',
    'png',
    'svg',
    'woff',
    'woff2',
  ]);
  eleventyConfig.addPassthroughCopy('static');

  eleventyConfig.setBrowserSyncConfig({
    files: ['src/**/*'],
    rewriteRules: [
      {
          match: /(\/dist\/)/g,
          fn: function (req, res, match) {
              const port = snowpackConfig.devOptions.port;

              return `http://localhost:${port}/dist/`;
          }
      }
  ]
  });

  return {
    dir: {
      input: '_template',
      includes: '../_includes',
      output: '_output',
    },
  };
};
