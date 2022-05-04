// @outdir: out/
// @target: esnext
// @module: esnext
// @allowJs: true
// @filename: plainJSGrammarErrors2.js

// @filename: /a.js
export default 1;

// @filename: /b.js
/**
 * @deprecated
 */
export { default as A } from "./a";
