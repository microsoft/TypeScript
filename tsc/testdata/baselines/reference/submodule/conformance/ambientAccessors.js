//// [tests/cases/conformance/classes/propertyMemberDeclarations/memberAccessorDeclarations/ambientAccessors.ts] ////

//// [ambientAccessors.ts]
// ok to use accessors in ambient class in ES3
declare class C {
    static get a(): string;
    static set a(value: string);

    private static get b(): string;
    private static set b(foo: string);

    get x(): string;
    set x(value: string);

    private get y(): string;
    private set y(foo: string);
}

//// [ambientAccessors.js]


//// [ambientAccessors.d.ts]
declare class C {
    static get a(): string;
    static set a(value: string);
    private static get b();
    private static set b(value);
    get x(): string;
    set x(value: string);
    private get y();
    private set y(value);
}
