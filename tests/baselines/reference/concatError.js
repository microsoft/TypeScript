//// [concatError.ts]
var n1: number[];
/*
interface Array<T> {
    concat(...items: T[][]): T[]; // Note: This overload needs to be picked for arrays of arrays, even though both are applicable
    concat(...items: T[]): T[];
}
*/
var fa: number[];

fa = fa.concat([0]);
fa = fa.concat(0);





/*




declare class C<T> {
	public m(p1: C<C<T>>): C<T>;
	//public p: T;
}

var c: C<number>;
var cc: C<C<number>>;

c = c.m(cc);
*/

//// [concatError.js]
var n1;
/*
interface Array<T> {
    concat(...items: T[][]): T[]; // Note: This overload needs to be picked for arrays of arrays, even though both are applicable
    concat(...items: T[]): T[];
}
*/
var fa;
fa = fa.concat([0]);
fa = fa.concat(0);
/*




declare class C<T> {
    public m(p1: C<C<T>>): C<T>;
    //public p: T;
}

var c: C<number>;
var cc: C<C<number>>;

c = c.m(cc);
*/ 
