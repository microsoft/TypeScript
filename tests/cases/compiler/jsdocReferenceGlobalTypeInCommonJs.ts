// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: a.js
const other = require('./other');
/** @type {Puppeteer.Keyboard} */
var ppk;
Puppeteer.connect;
// @Filename: puppet.d.ts
export as namespace Puppeteer;
export interface Keyboard {
    key: string
}
export function connect(name: string): void;

// @Filename: other.d.ts
declare function f(): string;
export = f;
