// @allowJs: true
// @noEmit: true
// @checkJs: true

// @Filename: file1.js
var SomeClass = function () {
    this.otherProp = 0;
};

new SomeClass();

// @Filename: file2.js
class SomeClass { }
SomeClass.prop = 0
