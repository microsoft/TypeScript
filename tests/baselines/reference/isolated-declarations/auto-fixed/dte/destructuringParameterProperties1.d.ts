//// [tests/cases/conformance/es6/destructuring/destructuringParameterProperties1.ts] ////

//// [destructuringParameterProperties1.ts]
class C1 {
    constructor(public [x, y, z]: string[]) {
    }
}

type TupleType1 = [string, number, boolean];

class C2 {
    constructor(public [x, y, z]: TupleType1) {
    }
}

type ObjType1 = { x: number; y: string; z: boolean }

class C3 {
    constructor(public { x, y, z }: ObjType1) {
    }
}

var c1: C1 = new C1([]);
c1 = new C1(["larry", "{curly}", "moe"]);
var useC1Properties: boolean = c1.x === c1.y && c1.y === c1.z;

var c2: C2 = new C2(["10", 10, !!10]);
const dest: any[] = [c2.x, c2.y, c2.z];
const c2_x: any = dest[0];
const c2_y: any = dest[1];
const c2_z: any = dest[2];

var c3: C3 = new C3({x: 0, y: "", z: false});
c3 = new C3({x: 0, "y": "y", z: true});
const dest_1: any[] = [c3.x, c3.y, c3.z];
const c3_x: any = dest_1[0];
const c3_y: any = dest_1[1];
const c3_z: any = dest_1[2];

/// [Declarations] ////



//// [destructuringParameterProperties1.d.ts]
declare class C1 {
    x: invalid;
    y: invalid;
    z: invalid;
    constructor([x, y, z]: string[]);
}
type TupleType1 = [string, number, boolean];
declare class C2 {
    x: invalid;
    y: invalid;
    z: invalid;
    constructor([x, y, z]: TupleType1);
}
type ObjType1 = {
    x: number;
    y: string;
    z: boolean;
};
declare class C3 {
    x: invalid;
    y: invalid;
    z: invalid;
    constructor({ x, y, z }: ObjType1);
}
declare var c1: C1;
declare var useC1Properties: boolean;
declare var c2: C2;
declare const dest: any[];
declare const c2_x: any;
declare const c2_y: any;
declare const c2_z: any;
declare var c3: C3;
declare const dest_1: any[];
declare const c3_x: any;
declare const c3_y: any;
declare const c3_z: any;

/// [Errors] ////

destructuringParameterProperties1.ts(2,17): error TS1187: A parameter property may not be declared using a binding pattern.
destructuringParameterProperties1.ts(2,25): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
destructuringParameterProperties1.ts(2,28): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
destructuringParameterProperties1.ts(2,31): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
destructuringParameterProperties1.ts(9,17): error TS1187: A parameter property may not be declared using a binding pattern.
destructuringParameterProperties1.ts(9,25): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
destructuringParameterProperties1.ts(9,28): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
destructuringParameterProperties1.ts(9,31): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
destructuringParameterProperties1.ts(16,17): error TS1187: A parameter property may not be declared using a binding pattern.
destructuringParameterProperties1.ts(16,26): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
destructuringParameterProperties1.ts(16,29): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
destructuringParameterProperties1.ts(16,32): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
destructuringParameterProperties1.ts(22,35): error TS2339: Property 'x' does not exist on type 'C1'.
destructuringParameterProperties1.ts(22,44): error TS2339: Property 'y' does not exist on type 'C1'.
destructuringParameterProperties1.ts(22,52): error TS2339: Property 'y' does not exist on type 'C1'.
destructuringParameterProperties1.ts(22,61): error TS2339: Property 'z' does not exist on type 'C1'.
destructuringParameterProperties1.ts(25,25): error TS2339: Property 'x' does not exist on type 'C2'.
destructuringParameterProperties1.ts(25,31): error TS2339: Property 'y' does not exist on type 'C2'.
destructuringParameterProperties1.ts(25,37): error TS2339: Property 'z' does not exist on type 'C2'.
destructuringParameterProperties1.ts(32,27): error TS2339: Property 'x' does not exist on type 'C3'.
destructuringParameterProperties1.ts(32,33): error TS2339: Property 'y' does not exist on type 'C3'.
destructuringParameterProperties1.ts(32,39): error TS2339: Property 'z' does not exist on type 'C3'.


==== destructuringParameterProperties1.ts (22 errors) ====
    class C1 {
        constructor(public [x, y, z]: string[]) {
                    ~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS1187: A parameter property may not be declared using a binding pattern.
                            ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                               ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                                  ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        }
    }
    
    type TupleType1 = [string, number, boolean];
    
    class C2 {
        constructor(public [x, y, z]: TupleType1) {
                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS1187: A parameter property may not be declared using a binding pattern.
                            ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                               ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                                  ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        }
    }
    
    type ObjType1 = { x: number; y: string; z: boolean }
    
    class C3 {
        constructor(public { x, y, z }: ObjType1) {
                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS1187: A parameter property may not be declared using a binding pattern.
                             ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                                ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                                   ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        }
    }
    
    var c1: C1 = new C1([]);
    c1 = new C1(["larry", "{curly}", "moe"]);
    var useC1Properties: boolean = c1.x === c1.y && c1.y === c1.z;
                                      ~
!!! error TS2339: Property 'x' does not exist on type 'C1'.
                                               ~
!!! error TS2339: Property 'y' does not exist on type 'C1'.
                                                       ~
!!! error TS2339: Property 'y' does not exist on type 'C1'.
                                                                ~
!!! error TS2339: Property 'z' does not exist on type 'C1'.
    
    var c2: C2 = new C2(["10", 10, !!10]);
    const dest: any[] = [c2.x, c2.y, c2.z];
                            ~
!!! error TS2339: Property 'x' does not exist on type 'C2'.
                                  ~
!!! error TS2339: Property 'y' does not exist on type 'C2'.
                                        ~
!!! error TS2339: Property 'z' does not exist on type 'C2'.
    const c2_x: any = dest[0];
    const c2_y: any = dest[1];
    const c2_z: any = dest[2];
    
    var c3: C3 = new C3({x: 0, y: "", z: false});
    c3 = new C3({x: 0, "y": "y", z: true});
    const dest_1: any[] = [c3.x, c3.y, c3.z];
                              ~
!!! error TS2339: Property 'x' does not exist on type 'C3'.
                                    ~
!!! error TS2339: Property 'y' does not exist on type 'C3'.
                                          ~
!!! error TS2339: Property 'z' does not exist on type 'C3'.
    const c3_x: any = dest_1[0];
    const c3_y: any = dest_1[1];
    const c3_z: any = dest_1[2];