// @strict: true
// @noEmit: true
// @allowJs: true
// @checkJs: true

// @filename: index.js
/**
 * @typedef Sig
 * @property {object} Args
 * @property {string} Args.name
 * @property {function(string)=} Args.onSave
 * @property {((v: string) => void)=} Args.onCancel
 */

export {};

// @filename: check.ts
import type { Sig } from './index.js';

export const a: Array<keyof Sig['Args']> = ['name'];
export const b: Array<keyof Sig['Args']> = ['onSave'];
export const c: Array<keyof Sig['Args']> = ['onCancel'];
