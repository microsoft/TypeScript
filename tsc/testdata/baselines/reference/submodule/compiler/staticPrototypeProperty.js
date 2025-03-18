//// [tests/cases/compiler/staticPrototypeProperty.ts] ////

//// [staticPrototypeProperty.ts]
class C {
   static prototype() { }
}
 
class C2 {
   static prototype;
}

//// [staticPrototypeProperty.js]
class C {
    static prototype() { }
}
class C2 {
    static prototype;
}
