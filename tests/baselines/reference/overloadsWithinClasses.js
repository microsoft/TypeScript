//// [tests/cases/compiler/overloadsWithinClasses.ts] ////

//// [overloadsWithinClasses.ts]
class foo {
 
    static fnOverload( ) {}
 
    static fnOverload(foo: string){ } // error
 
}

class bar {
 
    static fnOverload( );
 
    static fnOverload(foo?: string){ } // no error
 
}

class X {
   public attr(name:string):string;
   public attr(name:string, value:string):X;
   public attr(first:any, second?:any):any {
   }
}


//// [overloadsWithinClasses.js]
class foo {
    static fnOverload() { }
    static fnOverload(foo) { } // error
}
class bar {
    static fnOverload(foo) { } // no error
}
class X {
    attr(first, second) {
    }
}
