/// <reference path="fourslash.ts" />

////dummy text

verify.generateTypes(
{
    value: class {},
    output:
`export = example;
declare class example {
}`,
},

{
    value: class {
        constructor(x) {
            (this as any).x = x;
            // Code inside this function should be ignored
            function f(this: any) {
                this.y = 0;
            }
            // Same for this class
            class Other { constructor() { (this as any).z = 0; } }
        }
    },
    output:
`export = example;
declare class example {
    constructor(x: any);
    x: any;
}`,
},
{
    value: { x: 0, export: 0 },
    output: `export const x: number;`,
},
{
    value: (() => {
        class Super {
            superField = 0; // TODO: climb to prototype.constructor and get instance fields?
            superMethod() {}
            static superStaticMethod() {}
        }
        class C extends Super {
            constructor() {
                super();
                (this as any)._privateField = 0;
                (this as any).field = 0;
            }

            _privateMethod() {}
            method(_p) {
                (this as any).otherField = 0; // TODO: include this in output?
            }

            static _privateStatic() {}
            static staticMethod(_s: any) {}
            static staticMethodWithNoNamespaceMembers(_p: any) {}

            static _privateStaticField = 0;
            static staticField = 0;
            static innerClass = class {};
        }
        (C.prototype as any).prototypeNonFunction = 0; // ignored
        (C.staticMethod as any).staticMethodProperty = 0;
        (C.staticMethod as any)._staticFieldPrivateMember = 0;
        (C.prototype.method as any).methodMember = 0; // ignored
        // Non-identifier names should be ignored.
        (C as any)["&"] = function() {};
        (C.prototype as any)["&"] = function() {};
        return C;
    })(),
    output:
`export = example;
declare class example {
    static staticField: number;
    static staticMethodWithNoNamespaceMembers(_p: any): void;
    static superStaticMethod(): void;
    field: any;
    method(_p: any): void;
    superMethod(): void;
}
declare namespace example {
    class innerClass {
    }
    function staticMethod(_s: any): void;
    namespace staticMethod {
        const staticMethodProperty: number;
    }
}`,
},

{
    value: (() => {
        function F() { this.x = 0; }
        (F as any).staticMethod = function() {}
        F.prototype.method = function() { }
        return F;
    })(),
    output:
`export = example;
declare class example {
    static staticMethod(): void;
    x: any;
    method(): void;
}`,
},

);
