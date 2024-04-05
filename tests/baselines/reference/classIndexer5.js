//// [tests/cases/compiler/classIndexer5.ts] ////

//// [classIndexer5.ts]
class Foo {
    [key: string]: number;

    #a: boolean;
    #b = false;
}


//// [classIndexer5.js]
class Foo {
    #a;
    #b = false;
}
