/// <reference path='fourslash.ts' />

//// class Car {
////     drive() { return "vroom"; }
////     /*z*/drinkAndDrive/*y*/() { return "glug " + this.drive(); }
//// }
//// class Driver {
////     car: Car = new Car();
////     drinkAndDrive() { return this.car.drinkAndDrive(); }
//// }

goTo.select("z", "y");
edit.applyRefactor({
    refactorName: "Inline function",
    actionName: "Inline all",
    actionDescription: "Inline all",
    newContent: `class Car {
    drive() { return "vroom"; }
}
class Driver {
    car: Car = new Car();
    drinkAndDrive() { return "glug " + this.car.drive(); }
}`
});
