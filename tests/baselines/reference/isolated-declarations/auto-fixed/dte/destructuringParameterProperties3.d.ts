//// [tests/cases/conformance/es6/destructuring/destructuringParameterProperties3.ts] ////

//// [destructuringParameterProperties3.ts]
class C1<T, U, V> {
    constructor(private k: T, private [a, b, c]: [T,U,V]) {
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

var x: C1<number, boolean, string> = new C1(undefined, [0, true, ""]);
const dest: any[] = [x.getA(), x.getB(), x.getC()];
const x_a: any = dest[0];
const x_b: any = dest[1];
const x_c: any = dest[2];

var y: C1<number, boolean, boolean> = new C1(10, [0, true, true]);
const dest_1: any[] = [y.getA(), y.getB(), y.getC()];
const y_a: any = dest_1[0];
const y_b: any = dest_1[1];
const y_c: any = dest_1[2];

var z: C1<10, string, string> = new C1(10, [undefined, "", ""]);
const dest: any[] = [z.getA(), z.getB(), z.getC()];
const z_a: any = dest[0];
const z_b: any = dest[1];
const z_c: any = dest[2];

var w: C1<10, any, any> = new C1(10, [undefined, undefined, undefined]);
const dest_1: any[] = [z.getA(), z.getB(), z.getC()];
const z_a: any = dest_1[0];
const z_b: any = dest_1[1];
const z_c: any = dest_1[2];


/// [Declarations] ////



//// [destructuringParameterProperties3.d.ts]
declare class C1<T, U, V> {
    private k;
    private a: invalid;
    private b: invalid;
    private c: invalid;
    constructor(k: T, [a, b, c]: [T, U, V]);
    getA(): any;
    getB(): any;
    getC(): any;
}
declare var x: C1<number, boolean, string>;
declare const dest: any[];
declare const x_a: any;
declare const x_b: any;
declare const x_c: any;
declare var y: C1<number, boolean, boolean>;
declare const dest_1: any[];
declare const y_a: any;
declare const y_b: any;
declare const y_c: any;
declare var z: C1<10, string, string>;
declare const dest: any[];
declare const z_a: any;
declare const z_b: any;
declare const z_c: any;
declare var w: C1<10, any, any>;
declare const dest_1: any[];
declare const z_a: any;
declare const z_b: any;
declare const z_c: any;
/// [Errors] ////

destructuringParameterProperties3.ts(2,31): error TS1187: A parameter property may not be declared using a binding pattern.
destructuringParameterProperties3.ts(2,40): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
destructuringParameterProperties3.ts(2,43): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
destructuringParameterProperties3.ts(2,46): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
destructuringParameterProperties3.ts(3,59): error TS2339: Property 'b' does not exist on type 'C1<T, U, V>'.
destructuringParameterProperties3.ts(3,83): error TS2339: Property 'c' does not exist on type 'C1<T, U, V>'.
destructuringParameterProperties3.ts(4,18): error TS2339: Property 'a' does not exist on type 'C1<T, U, V>'.
destructuringParameterProperties3.ts(9,21): error TS2339: Property 'a' does not exist on type 'C1<T, U, V>'.
destructuringParameterProperties3.ts(13,21): error TS2339: Property 'b' does not exist on type 'C1<T, U, V>'.
destructuringParameterProperties3.ts(17,21): error TS2339: Property 'c' does not exist on type 'C1<T, U, V>'.
destructuringParameterProperties3.ts(22,7): error TS2451: Cannot redeclare block-scoped variable 'dest'.
destructuringParameterProperties3.ts(28,7): error TS2451: Cannot redeclare block-scoped variable 'dest_1'.
destructuringParameterProperties3.ts(34,7): error TS2451: Cannot redeclare block-scoped variable 'dest'.
destructuringParameterProperties3.ts(35,7): error TS2451: Cannot redeclare block-scoped variable 'z_a'.
destructuringParameterProperties3.ts(36,7): error TS2451: Cannot redeclare block-scoped variable 'z_b'.
destructuringParameterProperties3.ts(37,7): error TS2451: Cannot redeclare block-scoped variable 'z_c'.
destructuringParameterProperties3.ts(40,7): error TS2451: Cannot redeclare block-scoped variable 'dest_1'.
destructuringParameterProperties3.ts(41,7): error TS2451: Cannot redeclare block-scoped variable 'z_a'.
destructuringParameterProperties3.ts(42,7): error TS2451: Cannot redeclare block-scoped variable 'z_b'.
destructuringParameterProperties3.ts(43,7): error TS2451: Cannot redeclare block-scoped variable 'z_c'.


==== destructuringParameterProperties3.ts (20 errors) ====
    class C1<T, U, V> {
        constructor(private k: T, private [a, b, c]: [T,U,V]) {
                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS1187: A parameter property may not be declared using a binding pattern.
                                           ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                                              ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                                                 ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            if ((b === undefined && c === undefined) || (this.b === undefined && this.c === undefined)) {
                                                              ~
!!! error TS2339: Property 'b' does not exist on type 'C1<T, U, V>'.
                                                                                      ~
!!! error TS2339: Property 'c' does not exist on type 'C1<T, U, V>'.
                this.a = a || k;
                     ~
!!! error TS2339: Property 'a' does not exist on type 'C1<T, U, V>'.
            }
        }
    
        public getA(): any {
            return this.a
                        ~
!!! error TS2339: Property 'a' does not exist on type 'C1<T, U, V>'.
        }
    
        public getB(): any {
            return this.b
                        ~
!!! error TS2339: Property 'b' does not exist on type 'C1<T, U, V>'.
        }
    
        public getC(): any {
            return this.c;
                        ~
!!! error TS2339: Property 'c' does not exist on type 'C1<T, U, V>'.
        }
    }
    
    var x: C1<number, boolean, string> = new C1(undefined, [0, true, ""]);
    const dest: any[] = [x.getA(), x.getB(), x.getC()];
          ~~~~
!!! error TS2451: Cannot redeclare block-scoped variable 'dest'.
    const x_a: any = dest[0];
    const x_b: any = dest[1];
    const x_c: any = dest[2];
    
    var y: C1<number, boolean, boolean> = new C1(10, [0, true, true]);
    const dest_1: any[] = [y.getA(), y.getB(), y.getC()];
          ~~~~~~
!!! error TS2451: Cannot redeclare block-scoped variable 'dest_1'.
    const y_a: any = dest_1[0];
    const y_b: any = dest_1[1];
    const y_c: any = dest_1[2];
    
    var z: C1<10, string, string> = new C1(10, [undefined, "", ""]);
    const dest: any[] = [z.getA(), z.getB(), z.getC()];
          ~~~~
!!! error TS2451: Cannot redeclare block-scoped variable 'dest'.
    const z_a: any = dest[0];
          ~~~
!!! error TS2451: Cannot redeclare block-scoped variable 'z_a'.
    const z_b: any = dest[1];
          ~~~
!!! error TS2451: Cannot redeclare block-scoped variable 'z_b'.
    const z_c: any = dest[2];
          ~~~
!!! error TS2451: Cannot redeclare block-scoped variable 'z_c'.
    
    var w: C1<10, any, any> = new C1(10, [undefined, undefined, undefined]);
    const dest_1: any[] = [z.getA(), z.getB(), z.getC()];
          ~~~~~~
!!! error TS2451: Cannot redeclare block-scoped variable 'dest_1'.
    const z_a: any = dest_1[0];
          ~~~
!!! error TS2451: Cannot redeclare block-scoped variable 'z_a'.
    const z_b: any = dest_1[1];
          ~~~
!!! error TS2451: Cannot redeclare block-scoped variable 'z_b'.
    const z_c: any = dest_1[2];
          ~~~
!!! error TS2451: Cannot redeclare block-scoped variable 'z_c'.
    