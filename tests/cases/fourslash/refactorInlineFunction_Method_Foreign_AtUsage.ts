/// <reference path='fourslash.ts' />

//// class Car {
////     drive() { return "vroom"; }
////     drinkAndDrive() { return "glug " + this.drive(); }
//// }
//// class Driver {
////     car: Car = new Car();
////     drinkAndDrive() { return this.car./*z*/drinkAndDrive/*y*/(); }
//// }

goTo.select("z", "y");
edit.applyRefactor({
    refactorName: "Inline function",
    actionName: "Inline here",
    actionDescription: "Inline here",
    newContent: `class Car {
    drive() { return "vroom"; }
}
class Driver {
    car: Car = new Car();
    drinkAndDrive() { return "glug " + this.car.drive(); }
}`
});
