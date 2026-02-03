//// [tests/cases/compiler/objectLiteralArraySpecialization.ts] ////

//// [objectLiteralArraySpecialization.ts]
declare function create<T>(initialValues?: T[]): MyArrayWrapper<T>;
interface MyArrayWrapper<T> {
	constructor(initialItems?: T[]);
	doSomething(predicate: (x: T, y: T) => boolean): void;
}
var thing = create([ { name: "bob", id: 24 }, { name: "doug", id: 32 } ]); // should not error
thing.doSomething((x, y) => x.name === "bob"); // should not error


//// [objectLiteralArraySpecialization.js]
var thing = create([{ name: "bob", id: 24 }, { name: "doug", id: 32 }]); // should not error
thing.doSomething(function (x, y) { return x.name === "bob"; }); // should not error
