// @noTypesAndSymbols: true
// @allowJs: true
// @noEmit: true
// @checkJs: true,false

// @filename: a.js
function dec(target, key, index) {}

class Foo {
    method(@dec x) {}
}
