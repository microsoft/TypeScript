//// [tests/cases/compiler/testTypings.ts] ////

//// [testTypings.ts]
interface IComparable<T> {
   compareTo(other: T);
}

declare function sort<U extends IComparable<U>>(items: U[]): U[];









//// [testTypings.js]
