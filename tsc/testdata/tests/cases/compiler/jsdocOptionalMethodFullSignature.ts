// @target: es2015
// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /a.js
/** @typedef {{ method?: (s: string) => number }} Example */

const example = {
  /** @type {Example['method']} */
  method(s) {
    return s.length;
  }
};

/** @type {Example['method']} */
function tooManyParams(s, extra) {
  return 0;
}
