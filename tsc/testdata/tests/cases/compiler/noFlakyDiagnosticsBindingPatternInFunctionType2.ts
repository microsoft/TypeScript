// @allowJs: true
// @checkJs: true
// @strict: true
// @declaration: true
// @outDir: /out
// @Filename: /a.js
/** @template T */
class Base {}
/** @extends {Base<{ e: function({ a: boolean }): void }>} */
export class C extends Base {}
