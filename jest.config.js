module.exports = {
  preset: "jest-expo",
  testPathIgnorePatterns: [
    "node_modules/(?!(jest-)?@react-native|react-native|react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|native-base|@sentry/.*)"
  ],
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "jest-styled-components"
  ],
  setupFiles: ["./setupFile.js"]
}
