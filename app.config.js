const { existsSync, readFileSync } = require("node:fs");

module.exports = {
  expo: {
    name: "packUP",
    slug: "packUP",
    version: "1.0.0",
    newArchEnabled: true,
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "packup",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "net.packupapp.packup",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "net.packupapp.packup",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: ["expo-router", "expo-font", "expo-secure-store"],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "4586fee6-95b8-4a22-96e0-88ac988d1231",
      },
      ...(existsSync("./env.json") ? JSON.parse(readFileSync("./env.json", "utf-8")) : {}),
    },
  },
};
