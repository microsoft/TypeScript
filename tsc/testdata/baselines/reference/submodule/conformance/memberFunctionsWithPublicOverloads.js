//// [tests/cases/conformance/classes/propertyMemberDeclarations/memberFunctionDeclarations/memberFunctionsWithPublicOverloads.ts] ////

//// [memberFunctionsWithPublicOverloads.ts]
class C {
    public foo(x: number);
    public foo(x: number, y: string);
    public foo(x: any, y?: any) { }

    public bar(x: 'hi');
    public bar(x: string);
    public bar(x: number, y: string);
    public bar(x: any, y?: any) { }

    public static foo(x: number);
    public static foo(x: number, y: string);
    public static foo(x: any, y?: any) { }

    public static bar(x: 'hi');
    public static bar(x: string);
    public static bar(x: number, y: string);
    public static bar(x: any, y?: any) { }
}

class D<T> {
    public foo(x: number);
    public foo(x: T, y: T);
    public foo(x: any, y?: any) { }

    public bar(x: 'hi');
    public bar(x: string);
    public bar(x: T, y: T);
    public bar(x: any, y?: any) { }

    public static foo(x: number);
    public static foo(x: number, y: string);
    public static foo(x: any, y?: any) { }

    public static bar(x: 'hi');
    public static bar(x: string);
    public static bar(x: number, y: string);
    public static bar(x: any, y?: any) { }

}

//// [memberFunctionsWithPublicOverloads.js]
class C {
    foo(x, y) { }
    bar(x, y) { }
    static foo(x, y) { }
    static bar(x, y) { }
}
class D {
    foo(x, y) { }
    bar(x, y) { }
    static foo(x, y) { }
    static bar(x, y) { }
}
