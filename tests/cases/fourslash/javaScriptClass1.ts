///<reference path="fourslash.ts" />

// Classes have their shape inferred from assignments
// to properties of 'this' in the constructor

// @allowNonTsExtensions: true
// @Filename: Foo.js
//// class Foo {
////    constructor() {
////        this.bar = 'world';
////        this.thing = () => 0;
////        this.union = 'foo';
////        this.union = 100;
////    }
//// }
//// var x = new Foo();
//// x/**/


goTo.marker();
edit.insert('.');
verify.completions({
    exact: [
        "bar",
        "thing",
        "union",
        { name: "Foo", sortText: completion.SortText.JavascriptIdentifiers },
        { name: "x", sortText: completion.SortText.JavascriptIdentifiers }
    ]
});

edit.insert('bar.');
verify.completions({ includes: ["substring"] });
edit.backspace('bar.'.length);

edit.insert('union.');
verify.completions({ includes: "toString" });
