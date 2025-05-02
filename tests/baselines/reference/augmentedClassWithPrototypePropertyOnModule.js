//// [tests/cases/compiler/augmentedClassWithPrototypePropertyOnModule.ts] ////

//// [augmentedClassWithPrototypePropertyOnModule.ts]
declare module m {
    var f;
    var prototype; // This should be error since prototype would be static property on class m
}
declare class m {
}

//// [augmentedClassWithPrototypePropertyOnModule.js]
