//// [tests/cases/compiler/varianceAnnotationValidation.ts] ////

//// [varianceAnnotationValidation.ts]
// Repro from #49607

// Variance annotation error expected

interface Controller<out T> {
	createAnimal: () => T;
	run: (animal: T) => void;
}

interface Animal {
	run(): void;
};

class Dog implements Animal {
	run() {};
	bark() {};
}

interface AnimalContainer<T> {
	controller: Controller<T>;
}

declare let ca: AnimalContainer<Animal>;
declare let cd: AnimalContainer<Dog>;

ca = cd;  // Ok
cd = ca;  // Error


//// [varianceAnnotationValidation.js]
"use strict";
// Repro from #49607
;
var Dog = /** @class */ (function () {
    function Dog() {
    }
    Dog.prototype.run = function () { };
    ;
    Dog.prototype.bark = function () { };
    ;
    return Dog;
}());
ca = cd; // Ok
cd = ca; // Error


//// [varianceAnnotationValidation.d.ts]
interface Controller<out T> {
    createAnimal: () => T;
    run: (animal: T) => void;
}
interface Animal {
    run(): void;
}
declare class Dog implements Animal {
    run(): void;
    bark(): void;
}
interface AnimalContainer<T> {
    controller: Controller<T>;
}
declare let ca: AnimalContainer<Animal>;
declare let cd: AnimalContainer<Dog>;
