// @allowJs: true
// @checkJs: true
// @strict: true
// @noEmit: true
// @filename: a.js
/** @extends {String} */
class S extends String {}

class Boolean {
    value = true;
}

/** @implements {Boolean} */
class B {
    value = false;
}

export {};
