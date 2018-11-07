/// <reference path='fourslash.ts' />

//// class Car {
////     drive() { return "vroom"; }
////     drinkAndDrive() { return "glug " + this./*z*/drive/*y*/(); }
//// }

goTo.select("z", "y");
edit.applyRefactor({
    refactorName: "Inline function",
    actionName: "Inline all",
    actionDescription: "Inline all",
    newContent: `class Car {
    drinkAndDrive() { return "glug " + "vroom"; }
}`
});
