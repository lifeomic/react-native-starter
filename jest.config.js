module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRunner: 'jest-circus/runner',
  testMatch: [
    '<rootDir>/__tests__/**/*-test.{js,jsx,ts,tsx}',
  ],
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx', 'jsx', 'node', 'mjs'],
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](|coverage|node_modules)[/\\\\]'],
  preset: 'react-native',
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts'
  ],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx,js,jsx}'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native)',
  ]
};
