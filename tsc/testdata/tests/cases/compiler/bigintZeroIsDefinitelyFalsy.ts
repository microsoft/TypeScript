// @strict: true
// @target: es2020
// @noEmit: true

declare const x: 0n | 1n;
const y = x && "a";
const z: 0n | "a" = x && "a";
