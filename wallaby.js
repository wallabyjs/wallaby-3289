const path = require('path');

module.exports = {
  files: [
    'package.json',
    'src/**/*.ts',
    '!src/**/*.spec.ts',
  ],
  tests: [
    'src/**/*.spec.ts'
  ],
  env: {
    type: 'node',
    params: {
      // This needs to be the fully-qualified path
      runner: "--experimental-loader " + path.join(__dirname, 'custom-loader.mjs')
    }
  },
  testFramework: 'mocha',
  setup: function(wallaby) {
    const Module = require("module");
    const path = require('path');
  
    const originalResolveFilename = Module._resolveFilename;
  
    Module._resolveFilename = function (request, _parent) {
      if (request === '#example') {
        const modifiedArguments = [path.join(wallaby.projectCacheDir, 'src', 'dist', 'index.js'), ...[].slice.call(arguments, 1)];
        return originalResolveFilename.apply(this, modifiedArguments);
      }

      return originalResolveFilename.apply(this, arguments);
    };
  }
};