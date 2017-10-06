///<reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true
// @Filename: dummy.js

//// /**
////  * @augments {Thing<number>}
////  * @extends {Thing<string>}
////  */
//// class MyStringThing extends Thing {
////     constructor() {
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
verify.getSemanticDiagnostics(
`[
  {
    "message": "The total number of \`@augments\` and \`@extends\` tags allowed for a single class declaration is at most 1.",
    "start": 36,
    "length": 24,
    "category": "error",
    "code": 8025
  },
  {
    "message": "Constructors for derived classes must contain a \'super\' call.",
    "start": 105,
    "length": 59,
    "category": "error",
    "code": 2377
  },
  {
    "message": "\'super\' must be called before accessing \'this\' in the constructor of a derived class.",
    "start": 137,
    "length": 4,
    "category": "error",
    "code": 17009
  }
]`);