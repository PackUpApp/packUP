import Constants from "expo-constants";

export const apiBaseUrl = `http://${Constants.expoConfig?.hostUri?.split(":")?.shift() ?? "localhost"}:8083`;
