///<reference path="fourslash.ts" />

// Inside an inferred method body, the type of 'this' is the class type

// @noLib: true
// @allowNonTsExtensions: true
// @Filename: myMod.js
//// function myCtor(x) {
////     this.qua = 10;
//// }
//// myCtor.prototype.foo = function() { return this./**/; };
//// myCtor.prototype.bar = function() { return '' };
////

goTo.marker();
edit.insert('.');

// Check members of the function
verify.completions({
    marker: "",
    unsorted: [
        { name: "bar", kind: "method" },
        { name: "qua", kind: "property" },
        ...["myCtor", "x", "prototype"].map(name => ({
            name,
            kind: "warning",
            sortText: completion.SortText.JavascriptIdentifiers
        })),
        { name: "foo", kind: "method" },
    ],
});
