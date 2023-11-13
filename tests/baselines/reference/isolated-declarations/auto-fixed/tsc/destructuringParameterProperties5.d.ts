//// [tests/cases/conformance/es6/destructuring/destructuringParameterProperties5.ts] ////

//// [destructuringParameterProperties5.ts]
type ObjType1 = { x: number; y: string; z: boolean }
type TupleType1 = [ObjType1, number, string]

class C1 {
    constructor(public [{ x1, x2, x3 }, y, z]: TupleType1) {
        var foo: any = x1 || x2 || x3 || y || z;
        var bar: any = this.x1 || this.x2 || this.x3 || this.y || this.z;
    }
}

var a: C1 = new C1([{ x1: 10, x2: "", x3: true }, "", false]);
const dest: any[] = [a.x1, a.x2, a.x3, a.y, a.z];
const a_x1: any = dest[0];
const a_x2: any = dest[1];
const a_x3: any = dest[2];
const a_y: any = dest[3];
const a_z: any = dest[4];

/// [Declarations] ////



//// [destructuringParameterProperties5.d.ts]
type ObjType1 = {
    x: number;
    y: string;
    z: boolean;
};
type TupleType1 = [ObjType1, number, string];
declare class C1 {
    x1: any;
    x2: any;
    x3: any;
    { x1, x2, x3 }: any;
    y: number;
    z: string;
    constructor([{ x1, x2, x3 }, y, z]: TupleType1);
}
declare var a: C1;
declare const dest: any[];
declare const a_x1: any;
declare const a_x2: any;
declare const a_x3: any;
declare const a_y: any;
declare const a_z: any;
/// [Errors] ////

destructuringParameterProperties5.ts(5,17): error TS1187: A parameter property may not be declared using a binding pattern.
destructuringParameterProperties5.ts(5,27): error TS2339: Property 'x1' does not exist on type 'ObjType1'.
destructuringParameterProperties5.ts(5,31): error TS2339: Property 'x2' does not exist on type 'ObjType1'.
destructuringParameterProperties5.ts(5,35): error TS2339: Property 'x3' does not exist on type 'ObjType1'.
destructuringParameterProperties5.ts(7,29): error TS2339: Property 'x1' does not exist on type 'C1'.
destructuringParameterProperties5.ts(7,40): error TS2339: Property 'x2' does not exist on type 'C1'.
destructuringParameterProperties5.ts(7,51): error TS2339: Property 'x3' does not exist on type 'C1'.
destructuringParameterProperties5.ts(7,62): error TS2339: Property 'y' does not exist on type 'C1'.
destructuringParameterProperties5.ts(7,72): error TS2339: Property 'z' does not exist on type 'C1'.
destructuringParameterProperties5.ts(11,23): error TS2353: Object literal may only specify known properties, and 'x1' does not exist in type 'ObjType1'.
destructuringParameterProperties5.ts(11,51): error TS2322: Type 'string' is not assignable to type 'number'.
destructuringParameterProperties5.ts(11,55): error TS2322: Type 'boolean' is not assignable to type 'string'.
destructuringParameterProperties5.ts(12,24): error TS2339: Property 'x1' does not exist on type 'C1'.
destructuringParameterProperties5.ts(12,30): error TS2339: Property 'x2' does not exist on type 'C1'.
destructuringParameterProperties5.ts(12,36): error TS2339: Property 'x3' does not exist on type 'C1'.
destructuringParameterProperties5.ts(12,42): error TS2339: Property 'y' does not exist on type 'C1'.
destructuringParameterProperties5.ts(12,47): error TS2339: Property 'z' does not exist on type 'C1'.


==== destructuringParameterProperties5.ts (17 errors) ====
    type ObjType1 = { x: number; y: string; z: boolean }
    type TupleType1 = [ObjType1, number, string]
    
    class C1 {
        constructor(public [{ x1, x2, x3 }, y, z]: TupleType1) {
                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS1187: A parameter property may not be declared using a binding pattern.
                              ~~
!!! error TS2339: Property 'x1' does not exist on type 'ObjType1'.
                                  ~~
!!! error TS2339: Property 'x2' does not exist on type 'ObjType1'.
                                      ~~
!!! error TS2339: Property 'x3' does not exist on type 'ObjType1'.
            var foo: any = x1 || x2 || x3 || y || z;
            var bar: any = this.x1 || this.x2 || this.x3 || this.y || this.z;
                                ~~
!!! error TS2339: Property 'x1' does not exist on type 'C1'.
                                           ~~
!!! error TS2339: Property 'x2' does not exist on type 'C1'.
                                                      ~~
!!! error TS2339: Property 'x3' does not exist on type 'C1'.
                                                                 ~
!!! error TS2339: Property 'y' does not exist on type 'C1'.
                                                                           ~
!!! error TS2339: Property 'z' does not exist on type 'C1'.
        }
    }
    
    var a: C1 = new C1([{ x1: 10, x2: "", x3: true }, "", false]);
                          ~~
!!! error TS2353: Object literal may only specify known properties, and 'x1' does not exist in type 'ObjType1'.
                                                      ~~
!!! error TS2322: Type 'string' is not assignable to type 'number'.
                                                          ~~~~~
!!! error TS2322: Type 'boolean' is not assignable to type 'string'.
    const dest: any[] = [a.x1, a.x2, a.x3, a.y, a.z];
                           ~~
!!! error TS2339: Property 'x1' does not exist on type 'C1'.
                                 ~~
!!! error TS2339: Property 'x2' does not exist on type 'C1'.
                                       ~~
!!! error TS2339: Property 'x3' does not exist on type 'C1'.
                                             ~
!!! error TS2339: Property 'y' does not exist on type 'C1'.
                                                  ~
!!! error TS2339: Property 'z' does not exist on type 'C1'.
    const a_x1: any = dest[0];
    const a_x2: any = dest[1];
    const a_x3: any = dest[2];
    const a_y: any = dest[3];
    const a_z: any = dest[4];