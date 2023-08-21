module.exports = {
  presets: [
    [
      "module:metro-react-native-babel-preset",
      { unstable_transformProfile: "hermes-stable" },
    ],
  ],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        envName: "APP_ENV",
        moduleName: "@env",
        path: ".env",
        safe: true,
        allowUndefined: false,
        verbose: false,
      },
    ],
  ],
};