// @strict: true
// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /a.js
/**
 * @typedef Sig
 * @property {object} Args
 * @property {string} Args.name
 * @property {function(string)=} Args.onSave
 * @property {((v: string) => void)=} Args.onCancel
 */

/**
 * @typedef Flat
 * @property {string} name
 * @property {function(string)=} onSave
 * @property {((v: string) => void)=} onCancel
 */

export {};

// @Filename: /b.ts
import type { Sig, Flat } from "./a.js";

export const nested: Array<keyof Sig["Args"]> = ["name", "onCancel"];
export const flat: Array<keyof Flat> = ["name", "onCancel"];
export const onCancel: Sig["Args"]["onCancel"] = (v: string) => {};
