// @target: es2019
// @strict: true

declare const keys: ("language" | "theme")[];
const settings = Object.fromEntries(keys.map(key => [key, ""]));
settings.timestamp = "";
