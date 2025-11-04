//// [tests/cases/conformance/classes/propertyMemberDeclarations/autoAccessorAllowedModifiers.ts] ////

//// [autoAccessorAllowedModifiers.ts]
abstract class C1 {
    accessor a: any;
    public accessor b: any;
    private accessor c: any;
    protected accessor d: any;
    abstract accessor e: any;
    static accessor f: any;
    public static accessor g: any;
    private static accessor h: any;
    protected static accessor i: any;
    accessor #j: any;
    accessor "k": any;
    accessor 108: any;
    accessor ["m"]: any;
    accessor n!: number;
}

class C2 extends C1 {
    override accessor e: any;
    static override accessor i: any;
}

declare class C3 {
    accessor a: any;
}



//// [autoAccessorAllowedModifiers.js]
class C1 {
    accessor a;
    accessor b;
    accessor c;
    accessor d;
    static accessor f;
    static accessor g;
    static accessor h;
    static accessor i;
    accessor #j;
    accessor "k";
    accessor 108;
    accessor ["m"];
    accessor n;
}
class C2 extends C1 {
    accessor e;
    static accessor i;
}
