// @filename: internalClassPropertyAssignability_0.d.ts
declare class Class1 {
	public x: number;
	internal y: number;
}

declare class Class2 extends Class1 {
	internal y: number; // ok
}

// @filename: internalClassPropertyAssignability_1.ts
/// <reference path="internalClassPropertyAssignability_0.d.ts" />
interface XY {
	x: number;
	y: number;
}

declare class Class3 extends Class1 {
	internal y: number; // error
}

declare class Class4 extends Class1 {
}


declare class Class5 {
	public x: number;
	internal y: number;
}

declare var xy: XY;
declare var c1: Class1;
declare var c2: Class2;
declare var c3: Class3;
declare var c4: Class4;
declare var c5: Class5;

xy = c1; // error
xy = c2; // error
xy = c3; // ok
xy = c4; // error
xy = c5; // ok
c1 = xy; // error
c1 = c2; // ok
c1 = c3; // ok
c1 = c4; // ok
c1 = c5; // error
c2 = xy; // error
c2 = c3; // error
c2 = c4; // error
c2 = c5; // error
c3 = xy; // ok
c3 = c4; // error
c3 = c5; // ok
c4 = xy; // error
c4 = c5; // error
c5 = xy; // ok