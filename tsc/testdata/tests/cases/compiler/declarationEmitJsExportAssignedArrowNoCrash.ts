// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @filename: node_modules/@jest/types/index.d.ts
declare namespace Config {
  export {
    InitialOptions,
  };
}
export { Config };

declare interface ConfigGlobals {
  x: unknown;
}

declare type InitialOptions = {
  globals?: ConfigGlobals;
};
// @filename: repro.js
/** @type {(x: import("@jest/types").Config.InitialOptions) => void} */
module.exports = (x) => {};