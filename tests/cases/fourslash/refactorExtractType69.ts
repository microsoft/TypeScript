/// <reference path='fourslash.ts' />
/// Doesn't duplicate comments - #31629

//// type a = /*a*/{ x: string } /* foo */ | string /* bar */ /*b*/;

goTo.select("a", "b");
edit.applyRefactor({
  refactorName: "Extract type",
  actionName: "Extract to type alias",
  actionDescription: "Extract to type alias",
  newContent: `type /*RENAME*/NewType = {
    x: string;
} /* foo */ | string /* bar */;

type a = NewType;`,
});
