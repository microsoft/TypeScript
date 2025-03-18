//// [tests/cases/compiler/recursiveTypes1.ts] ////

//// [recursiveTypes1.ts]
interface Entity<T extends Entity<T>> {
   X: T;
   Y: T;
}

interface Person<U extends Person<U>> extends Entity<U> {
	n: number;
}

interface Customer extends Person<Customer> {
	s: string;
}


//// [recursiveTypes1.js]
