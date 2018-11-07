/// <reference path='fourslash.ts' />

//// class Car {
////     /*z*/drive/*y*/() { return "vroom"; }
////     drinkAndDrive() { return "glug " + this.drive(); }
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
