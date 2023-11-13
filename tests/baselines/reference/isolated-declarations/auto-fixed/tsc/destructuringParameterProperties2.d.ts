//// [tests/cases/conformance/es6/destructuring/destructuringParameterProperties2.ts] ////

//// [destructuringParameterProperties2.ts]
class C1 {
    constructor(private k: number, private [a, b, c]: [number, string, boolean]) {
        if ((b === undefined && c === undefined) || (this.b === undefined && this.c === undefined)) {
            this.a = a || k;
        }
    }

    public getA(): any {
        return this.a
    }

    public getB(): any {
        return this.b
    }

    public getC(): any {
        return this.c;
    }
}

var x: C1 = new C1(undefined, [0, undefined, ""]);
const dest: any[] = [x.getA(), x.getB(), x.getC()];
const x_a: any = dest[0];
const x_b: any = dest[1];
const x_c: any = dest[2];

var y: C1 = new C1(10, [0, "", true]);
const dest_1: any[] = [y.getA(), y.getB(), y.getC()];
const y_a: any = dest_1[0];
const y_b: any = dest_1[1];
const y_c: any = dest_1[2];

var z: C1 = new C1(10, [undefined, "", null]);
const dest: any[] = [z.getA(), z.getB(), z.getC()];
const z_a: any = dest[0];
const z_b: any = dest[1];
const z_c: any = dest[2];


/// [Declarations] ////



//// [destructuringParameterProperties2.d.ts]
declare class C1 {
    private k;
    private a: number;
    private b: string;
    private c: boolean;
    constructor(k: number, [a, b, c]: [number, string, boolean]);
    getA(): any;
    getB(): any;
    getC(): any;
}
declare var x: C1;
declare const dest: any[];
declare const x_a: any;
declare const x_b: any;
declare const x_c: any;
declare var y: C1;
declare const dest_1: any[];
declare const y_a: any;
declare const y_b: any;
declare const y_c: any;
declare var z: C1;
declare const dest: any[];
declare const z_a: any;
declare const z_b: any;
declare const z_c: any;

/// [Errors] ////

destructuringParameterProperties2.ts(2,36): error TS1187: A parameter property may not be declared using a binding pattern.
destructuringParameterProperties2.ts(3,59): error TS2339: Property 'b' does not exist on type 'C1'.
destructuringParameterProperties2.ts(3,83): error TS2339: Property 'c' does not exist on type 'C1'.
destructuringParameterProperties2.ts(4,18): error TS2339: Property 'a' does not exist on type 'C1'.
destructuringParameterProperties2.ts(9,21): error TS2339: Property 'a' does not exist on type 'C1'.
destructuringParameterProperties2.ts(13,21): error TS2339: Property 'b' does not exist on type 'C1'.
destructuringParameterProperties2.ts(17,21): error TS2339: Property 'c' does not exist on type 'C1'.
destructuringParameterProperties2.ts(21,46): error TS2322: Type 'string' is not assignable to type 'boolean'.
destructuringParameterProperties2.ts(22,7): error TS2451: Cannot redeclare block-scoped variable 'dest'.
destructuringParameterProperties2.ts(34,7): error TS2451: Cannot redeclare block-scoped variable 'dest'.


==== destructuringParameterProperties2.ts (10 errors) ====
    class C1 {
        constructor(private k: number, private [a, b, c]: [number, string, boolean]) {
                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS1187: A parameter property may not be declared using a binding pattern.
            if ((b === undefined && c === undefined) || (this.b === undefined && this.c === undefined)) {
                                                              ~
!!! error TS2339: Property 'b' does not exist on type 'C1'.
                                                                                      ~
!!! error TS2339: Property 'c' does not exist on type 'C1'.
                this.a = a || k;
                     ~
!!! error TS2339: Property 'a' does not exist on type 'C1'.
            }
        }
    
        public getA(): any {
            return this.a
                        ~
!!! error TS2339: Property 'a' does not exist on type 'C1'.
        }
    
        public getB(): any {
            return this.b
                        ~
!!! error TS2339: Property 'b' does not exist on type 'C1'.
        }
    
        public getC(): any {
            return this.c;
                        ~
!!! error TS2339: Property 'c' does not exist on type 'C1'.
        }
    }
    
    var x: C1 = new C1(undefined, [0, undefined, ""]);
                                                 ~~
!!! error TS2322: Type 'string' is not assignable to type 'boolean'.
    const dest: any[] = [x.getA(), x.getB(), x.getC()];
          ~~~~
!!! error TS2451: Cannot redeclare block-scoped variable 'dest'.
    const x_a: any = dest[0];
    const x_b: any = dest[1];
    const x_c: any = dest[2];
    
    var y: C1 = new C1(10, [0, "", true]);
    const dest_1: any[] = [y.getA(), y.getB(), y.getC()];
    const y_a: any = dest_1[0];
    const y_b: any = dest_1[1];
    const y_c: any = dest_1[2];
    
    var z: C1 = new C1(10, [undefined, "", null]);
    const dest: any[] = [z.getA(), z.getB(), z.getC()];
          ~~~~
!!! error TS2451: Cannot redeclare block-scoped variable 'dest'.
    const z_a: any = dest[0];
    const z_b: any = dest[1];
    const z_c: any = dest[2];
    