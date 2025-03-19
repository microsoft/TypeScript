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
;
class Dog {
    run() { }
    ;
    bark() { }
    ;
}
ca = cd; // Ok
cd = ca; // Error
