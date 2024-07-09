/// <reference path='fourslash.ts' />

//// const zoo = /*x*/f/*w*/unction () {
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
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to named function");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to anonymous function");
verify.refactorAvailable("Convert arrow function or function expression", "Convert to arrow function");
