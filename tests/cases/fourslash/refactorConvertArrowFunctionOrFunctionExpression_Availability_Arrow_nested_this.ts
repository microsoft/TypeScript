/// <reference path='fourslash.ts' />

//// const zoo = /*x*/(/*w*/) => {
////     class Animal {
////         weight = 42
////         askWeight() { return this.weight }
////     }
////     const Insect = class {
////         weight = 42
////         askWeight() { return this.weight }
////     }
////     function callTaxi() { this.no = "054 xxx xx xx" }
////     const callPizzaDelivery = function() { this.phone = "064 yyy yy yy"}
//// };

goTo.select("x", "w");
verify.refactorAvailable("Convert arrow function or function expression", "Convert to named function");
verify.refactorAvailable("Convert arrow function or function expression", "Convert to anonymous function");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to arrow function");
