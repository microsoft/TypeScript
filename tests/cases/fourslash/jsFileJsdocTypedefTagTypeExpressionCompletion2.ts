/// <reference path="fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsFileJsdocTypedefTagTypeExpressionCompletion2_typedef.js

//// class Foo {
////     constructor(value: number) { this.property1 = "hello"; }
////     static method1() {}
////     method3() { return 3; }
////     /**
////      * @param {string} foo A value.
////      * @returns {number} Another value
////      * @mytag
////      */
////     method4(foo) { return 3; }
//// }
//// /**
////  * @type { /*type*/Foo }
////  */
////var x;
/////*globalValue*/
////x./*valueMember*/

function getCompletions(nonWarnings: ReadonlyArray<string>): ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> {
    const withKinds: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntryObject> = [
        { name: "Foo", kind: "class" },
        { name: "x", kind: "var" },
        { name: "property1", kind: "property" },
        { name: "method3", kind: "method" },
        { name: "method4", kind: "method" },
        { name: "foo", kind: "warning" },
    ];
    for (const name of nonWarnings) ts.Debug.assert(withKinds.some(entry => entry.name === name));
    return withKinds.map(entry => nonWarnings.includes(entry.name) ? entry : ({ name: entry.name, kind: "warning" }));
}

verify.completions(
    { marker: "type", includes: getCompletions(["Foo"]) },
    { marker: "globalValue", includes: getCompletions(["Foo", "x"]) },
    { marker: "valueMember", includes: getCompletions(["property1", "method3", "method4", "foo"]) },
);
