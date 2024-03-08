/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

// Ajout d'une entrée "transform" dans la configuration pour transformer les fichiers TypeScript en JavaScript compréhensible par Jest.
// On utilise le preset ts - jest, qui est un ensemble de configurations prédéfinies pour prendre en charge TypeScript dans Jest.
// Cela permet à Jest de comprendre et d'exécuter les fichiers TypeScript lors de l'exécution des tests.

    const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
    clearMocks: true,
    collectCoverage: true,
    moduleNameMapper: {
        '\\.(css|scss)$': '<rootDir>/src/__mocks__/styleMock.ts',
        '\\.(svg)$': '<rootDir>/src/__mocks__/fileMock.ts'
    },
    coverageDirectory: "coverage",
    testEnvironment: "jsdom",
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    transform: {
        ...tsjPreset.transform,
    },
};
