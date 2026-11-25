// tsc treats the reference paths "C:" and "c:" as the drive roots "C:/" and
// "c:/". No file has these names, so the compiler reports that it cannot
// resolve the paths.

// @filename: /a.ts
/// <reference path="C:" />
/// <reference path="c:" />
export {};
