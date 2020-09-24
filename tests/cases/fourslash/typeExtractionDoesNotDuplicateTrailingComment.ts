/// <reference path='fourslash.ts' />
/// Doesn't duplicate comments - #31629

//// type a = /*a*/{ x: string } /* foo */ | string /* bar *//*b*/;
//// type b = /*c*//* leading */{ x: string } /* trailing *//*d*/;
//// type c = /*e*/{ x: string } /* inner */ | string// trailing/*f*/
////

goTo.select("a", "b");
edit.applyRefactor({
  refactorName: "Extract type",
  actionName: "Extract to type alias",
  actionDescription: "Extract to type alias",
  newContent: `type /*RENAME*/NewType = {
    x: string;
} /* foo */ | string /* bar */;

type a = NewType;
type b = /* leading */{ x: string } /* trailing */;
type c = { x: string } /* inner */ | string// trailing
`,
});

// Extract to interface
goTo.select("c", "d");
edit.applyRefactor({
  refactorName: "Extract type",
  actionName: "Extract to interface",
  actionDescription: "Extract to interface",
  newContent: `type NewType = {
    x: string;
} /* foo */ | string /* bar */;

type a = NewType;
interface /*RENAME*/NewType_1 {
    x: string;
} /* trailing */

type b = /* leading */NewType_1;
type c = { x: string } /* inner */ | string// trailing
`,
});

// Trailing comment using '//'
goTo.select("e", "f");
edit.applyRefactor({
  refactorName: "Extract type",
  actionName: "Extract to type alias",
  actionDescription: "Extract to type alias",
  newContent: `type NewType = {
    x: string;
} /* foo */ | string /* bar */;

type a = NewType;
interface NewType_1 {
    x: string;
} /* trailing */

type b = /* leading */NewType_1;
type /*RENAME*/NewType_2 = {
    x: string;
} /* inner */ | string // trailing
    ;

type c = NewType_2
`,
});
