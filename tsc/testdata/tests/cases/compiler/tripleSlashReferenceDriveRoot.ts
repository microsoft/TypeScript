// The reference paths "C:" and "c:" are only a drive root. No file has these
// names, so the compiler reports that it cannot resolve the paths.

// @filename: /a.ts
/// <reference path="C:" />
/// <reference path="c:" />
export {};
