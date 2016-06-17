// @allowJs: true
// @filename: thistag.js
// @out: dummy167.js
/** @constructor */
function Foo(name) {
    setName.apply(this, name);
}

/** @this Foo */
function setName(name) {
    /** document me */
    this.name = name;
}