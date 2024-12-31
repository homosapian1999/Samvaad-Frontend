import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(jpg|jpeg|png|svg)$": "<rootDir>/__mocks__/fileMock.ts",
    "^.+\\.(css|scss)$": "identity-obj-proxy",
  },
};

export default config;
