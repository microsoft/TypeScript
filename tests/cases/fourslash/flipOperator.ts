///<reference path="fourslash.ts"/>

////const foo = 1 /*a*/</*b*/ 2
goTo.select("a", "b")
verify.refactorAvailable("Flip operator")
edit.applyRefactor({
  refactorName: "Flip operator",
  actionName: "Flip operator",
  actionDescription: "Flip operator",
  newContent: `const foo = 2 > 1`
})