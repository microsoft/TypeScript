//// [tests/cases/compiler/gettersAndSettersErrors.ts] ////

//// [gettersAndSettersErrors.ts]
class C {
    public get Foo() { return "foo";} // ok
    public set Foo(foo:string) {} // ok

    public Foo = 0; // error - duplicate identifier Foo - confirmed
    public get Goo(v:string):string {return null;} // error - getters must not have a parameter
    public set Goo(v:string):string {} // error - setters must not specify a return type
}

class E {
    private get Baz():number { return 0; }
    public set Baz(n:number) {} // error - accessors do not agree in visibility
}




/// [Declarations] ////



//// [gettersAndSettersErrors.d.ts]
declare class C {
    get Foo(): invalid;
    set Foo(foo: string);
    Foo: number;
    get Goo(): string;
    set Goo(v: string): string;
}
declare class E {
    private get Baz();
    set Baz(n: number);
}

/// [Errors] ////

gettersAndSettersErrors.ts(2,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
gettersAndSettersErrors.ts(5,12): error TS2300: Duplicate identifier 'Foo'.
gettersAndSettersErrors.ts(5,12): error TS2717: Subsequent property declarations must have the same type.  Property 'Foo' must be of type 'string', but here has type 'number'.
gettersAndSettersErrors.ts(6,16): error TS1054: A 'get' accessor cannot have parameters.
gettersAndSettersErrors.ts(7,16): error TS1095: A 'set' accessor cannot have a return type annotation.
gettersAndSettersErrors.ts(11,17): error TS2808: A get accessor must be at least as accessible as the setter
gettersAndSettersErrors.ts(12,16): error TS2808: A get accessor must be at least as accessible as the setter


==== gettersAndSettersErrors.ts (7 errors) ====
    class C {
        public get Foo() { return "foo";} // ok
                   ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        public set Foo(foo:string) {} // ok
    
        public Foo = 0; // error - duplicate identifier Foo - confirmed
               ~~~
!!! error TS2300: Duplicate identifier 'Foo'.
               ~~~
!!! error TS2717: Subsequent property declarations must have the same type.  Property 'Foo' must be of type 'string', but here has type 'number'.
!!! related TS6203 gettersAndSettersErrors.ts:2:16: 'Foo' was also declared here.
        public get Goo(v:string):string {return null;} // error - getters must not have a parameter
                   ~~~
!!! error TS1054: A 'get' accessor cannot have parameters.
        public set Goo(v:string):string {} // error - setters must not specify a return type
                   ~~~
!!! error TS1095: A 'set' accessor cannot have a return type annotation.
    }
    
    class E {
        private get Baz():number { return 0; }
                    ~~~
!!! error TS2808: A get accessor must be at least as accessible as the setter
        public set Baz(n:number) {} // error - accessors do not agree in visibility
                   ~~~
!!! error TS2808: A get accessor must be at least as accessible as the setter
    }
    
    
    