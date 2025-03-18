//// [tests/cases/compiler/staticInitializersAndLegacyClassDecorators.ts] ////

//// [staticInitializersAndLegacyClassDecorators.ts]
// https://github.com/microsoft/TypeScript/issues/52004
declare var dec: any;

@dec
class C1
{
    static instance = new C1();
}

@dec
class C2
{
    static {
        new C2();
    }
}


//// [staticInitializersAndLegacyClassDecorators.js]
@dec
class C1 {
    static instance = new C1();
}
@dec
class C2 {
    static {
        new C2();
    }
}
