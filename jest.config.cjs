module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src/state/__tests__"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx"],
};
