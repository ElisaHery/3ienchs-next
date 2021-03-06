module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testMatch: ['**/*.(test|spec).(ts|tsx|js)'],
  coveragePathIgnorePatterns: ['/node_modules/', 'setupTests.js'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
};
