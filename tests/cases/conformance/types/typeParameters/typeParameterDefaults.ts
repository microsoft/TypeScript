/** Defaults on interfaces **/
interface HasDefault1<T = number> {
	x: T;
}
// OK
let a3: HasDefault1;
// a3.x: number
a3.x = 10;

interface HasDefault2<T1, T2 = number> {
	x1: T1;
	x2: T2;
}
// Same as <string, number>
let a5: HasDefault2<string>;
// a5.x1: string
a5.x1 = '';
// a5.x2: number
a5.x2 = 42;

let a6: HasDefault2<boolean, boolean>;
// a6.x1: boolean, a6.x2: boolean
a6.x1 = true;
a6.x2 = false;

/** Defaults on classes */
class ClassDefault1<T = number> {
	x: T;
}
let c1 = new ClassDefault1();
// c1.x: number
c1.x = 10;

class Derived1 extends ClassDefault1 {	
}
let d1 = new Derived1();
// d1.x: number
d1.x = 10;

class Derived2<T = string> extends ClassDefault1<T> {
}
let d2a = new Derived2();
// d2a.x: string
d2a.x = 'hello';

let d2b = new Derived2<number>();
// d2b.x: number
d2b.x = 43;

class ClassDefault2<T, U = string> {
	t: T;
	u: U;
}
class Derived3 extends ClassDefault2<string> {}
let d3 = new Derived3();
// d3.u: string
d3.u = '';

