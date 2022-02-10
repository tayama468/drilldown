module.exports = {
  moduleFileExtensions: [
    "js",
    "json",
    "vue"
  ],
  setupFilesAfterEnv: ['<rootDir>jest.setup.js'],
  transformIgnorePatterns: ['node_modules/'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
  }
}

