//// [tests/cases/compiler/jsFileCompilationAwaitModifier.ts] ////

//// [a.js]
class Foo {
    async a() {
        await Promise.resolve(1);
    }

    b = async () => {
        await Promise.resolve(1);
    }
}


//// [a.js]
class Foo {
    async a() {
        await Promise.resolve(1);
    }
    b = async () => {
        await Promise.resolve(1);
    };
}


//// [a.d.ts]
declare class Foo {
    a(): Promise<void>;
    b: () => Promise<void>;
}
