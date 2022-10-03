/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: something.js
//// function TestObj(){
////     this.property = "value";
//// }
//// var constructor = TestObj;
//// var instance = new constructor();
//// instance./*a*/
//// var class2 = function() { };
//// class2.prototype.blah = function() { };
//// var inst2 = new class2();
//// inst2.blah/*b*/;

goTo.marker('a');
verify.completions({
    exact: [
        "property",
        { name: "blah", sortText: completion.SortText.JavascriptIdentifiers },
        { name: "class2", sortText: completion.SortText.JavascriptIdentifiers },
        { name: "constructor", sortText: completion.SortText.JavascriptIdentifiers },
        { name: "inst2", sortText: completion.SortText.JavascriptIdentifiers },
        { name: "instance", sortText: completion.SortText.JavascriptIdentifiers },
        { name: "prototype", sortText: completion.SortText.JavascriptIdentifiers },
        { name: "TestObj", sortText: completion.SortText.JavascriptIdentifiers },
    ]
});
edit.backspace();

goTo.marker('b');
verify.quickInfoIs('(method) class2.blah(): void');
