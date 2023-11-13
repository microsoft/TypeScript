//// [tests/cases/conformance/es6/destructuring/destructuringParameterProperties4.ts] ////

//// [destructuringParameterProperties4.ts]
class C1<T, U, V> {
    constructor(private k: T, protected [a, b, c]: [T,U,V]) {
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

class C2 extends C1<number, string, boolean> {
    public doSomethingWithSuperProperties(): string {
        return `${this.a} ${this.b} ${this.c}`;
    }
}


/// [Declarations] ////



//// [destructuringParameterProperties4.d.ts]
declare class C1<T, U, V> {
    private k;
    protected a: invalid;
    protected b: invalid;
    protected c: invalid;
    constructor(k: T, [a, b, c]: [T, U, V]);
    getA(): any;
    getB(): any;
    getC(): any;
}
declare class C2 extends C1<number, string, boolean> {
    doSomethingWithSuperProperties(): string;
}
/// [Errors] ////

destructuringParameterProperties4.ts(2,31): error TS1187: A parameter property may not be declared using a binding pattern.
destructuringParameterProperties4.ts(2,42): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
destructuringParameterProperties4.ts(2,45): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
destructuringParameterProperties4.ts(2,48): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
destructuringParameterProperties4.ts(3,59): error TS2339: Property 'b' does not exist on type 'C1<T, U, V>'.
destructuringParameterProperties4.ts(3,83): error TS2339: Property 'c' does not exist on type 'C1<T, U, V>'.
destructuringParameterProperties4.ts(4,18): error TS2339: Property 'a' does not exist on type 'C1<T, U, V>'.
destructuringParameterProperties4.ts(9,21): error TS2339: Property 'a' does not exist on type 'C1<T, U, V>'.
destructuringParameterProperties4.ts(13,21): error TS2339: Property 'b' does not exist on type 'C1<T, U, V>'.
destructuringParameterProperties4.ts(17,21): error TS2339: Property 'c' does not exist on type 'C1<T, U, V>'.
destructuringParameterProperties4.ts(23,24): error TS2339: Property 'a' does not exist on type 'C2'.
destructuringParameterProperties4.ts(23,34): error TS2339: Property 'b' does not exist on type 'C2'.
destructuringParameterProperties4.ts(23,44): error TS2339: Property 'c' does not exist on type 'C2'.


==== destructuringParameterProperties4.ts (13 errors) ====
    class C1<T, U, V> {
        constructor(private k: T, protected [a, b, c]: [T,U,V]) {
                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
    
    class C2 extends C1<number, string, boolean> {
        public doSomethingWithSuperProperties(): string {
            return `${this.a} ${this.b} ${this.c}`;
                           ~
!!! error TS2339: Property 'a' does not exist on type 'C2'.
                                     ~
!!! error TS2339: Property 'b' does not exist on type 'C2'.
                                               ~
!!! error TS2339: Property 'c' does not exist on type 'C2'.
        }
    }
    