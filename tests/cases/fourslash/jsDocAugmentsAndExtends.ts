///<reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true
// @Filename: dummy.js

//// /**
////  * @augments {Thing<number>}
////  * [|@extends {Thing<string>}|]
////  */
//// class MyStringThing extends Thing {
////     constructor() {
////         super();
////         var x = this.mine;
////         x/**/;
////     }
//// }

// @Filename: declarations.d.ts
//// declare class Thing<T> {
////     mine: T;
//// }

// if more than one tag is present, report an error and take the type of the first entry.

goTo.marker();
verify.quickInfoIs("(local var) x: number");
verify.getSemanticDiagnostics([{
    message: "Class declarations cannot have more than one \`@augments\` or \`@extends\` tag.",
    code: 8025
}]);
