//// [tests/cases/compiler/functionOverloads6.ts] ////

//// [functionOverloads6.ts]
class foo { 
   static fnOverload();
   static fnOverload(foo:string);
   static fnOverload(foo?: any){ }
}


//// [functionOverloads6.js]
class foo {
    static fnOverload(foo) { }
}
