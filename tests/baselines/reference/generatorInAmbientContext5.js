//// [generatorInAmbientContext5.ts]
class C {
    *generator(): any { }
}

//// [generatorInAmbientContext5.js]
class C {
    *generator() { }
}


//// [generatorInAmbientContext5.d.ts]
declare class C {
    generator(): any;
}
