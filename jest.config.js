module.exports = {
  moduleFileExtensions: [
    'vue',
    'js',
    'json'

  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
  },
  transformIgnorePatterns: [
    '/node_modules/'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^TEST_DIR/(.*)$': '<rootDir>/tests/$1',
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  testMatch: [
    '**/tests/**/*.(spec|test).(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  testURL: 'http://localhost/',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  collectCoverage: false,
  collectCoverageFrom: ["<rootDir>/src/**/*.{js,vue}"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/src/configs/",
    "<rootDir>/src/data/",
  ],
  coverageReporters: ["text-summary", "html"]
}
