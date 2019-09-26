module.exports = {
  // Use a preprocessor for all Jest tests and inject babel config needed for
  // Jest which differs from Gatsby's.
  "transform": {
    "^.+\\.jsx?$": "<rootDir>/jest-preprocess.js"
  },
  "moduleNameMapper": {
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
  },
  "testPathIgnorePatterns": ["node_modules", ".cache"],
  // Gatsby includes un-transpiled ES6 code in gatsby-browser-entry.js.
  // gatsby-theme-osiolabs-drupal contains uncompiled ES6.
  "transformIgnorePatterns": ["node_modules/(?!(gatsby|gatsby-theme-osiolabs-drupal)/)"],
  "globals": {
    "__PATH_PREFIX__": ""
  },
  "testURL": "http://localhost",
  "setupFiles": [
    "<rootDir>/loadershim.js",
  ],
  "setupFilesAfterEnv": [
    "<rootDir>/setup-test-env.js"
  ],
};
