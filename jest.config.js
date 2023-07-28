module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRunner: 'jest-circus/runner',
  testMatch: [
    '<rootDir>/__tests__/**/*-test.{js,jsx,ts,tsx}',
  ],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.tsx',
    "\\.(png|jpg|ico|jpeg|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/imageMock.ts"
  },
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
    'node_modules/(?!(jest-)?@?react-native|react-navigation-header-buttons|query-string|decode-uri-component|split-on-first|filter-obj|victory)',
  ]
};
