// @target: ES5
// @declaration: true
// @removeComments: false
// @module: commonjs

// @Filename: declFileMethods_0.ts
export class c1 {
    /** This comment should appear for foo*/
    public foo() {
    }
    /** This is comment for function signature*/
    public fooWithParameters(/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number) {
        var d = a;
    }
    public fooWithRestParameters(a: string, ...rests: string[]) {
        return a + rests.join("");
    }

    public fooWithOverloads(a: string): string;
    public fooWithOverloads(a: number): number;
    public fooWithOverloads(a: any): any {
        return a;
    }


    /** This comment should appear for privateFoo*/
    private privateFoo() {
    }
    /** This is comment for function signature*/
    private privateFooWithParameters(/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number) {
        var d = a;
    }
    private privateFooWithRestParameters(a: string, ...rests: string[]) {
        return a + rests.join("");
    }
    private privateFooWithOverloads(a: string): string;
    private privateFooWithOverloads(a: number): number;
    private privateFooWithOverloads(a: any): any {
        return a;
    }


    /** This comment should appear for static foo*/
    static staticFoo() {
    }
    /** This is comment for function signature*/
    static staticFooWithParameters(/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number) {
        var d = a;
    }
    static staticFooWithRestParameters(a: string, ...rests: string[]) {
        return a + rests.join("");
    }
    static staticFooWithOverloads(a: string): string;
    static staticFooWithOverloads(a: number): number;
    static staticFooWithOverloads(a: any): any {
        return a;
    }


    /** This comment should appear for privateStaticFoo*/
    private static privateStaticFoo() {
    }
    /** This is comment for function signature*/
    private static privateStaticFooWithParameters(/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number) {
        var d = a;
    }
    private static privateStaticFooWithRestParameters(a: string, ...rests: string[]) {
        return a + rests.join("");
    }
    private static privateStaticFooWithOverloads(a: string): string;
    private static privateStaticFooWithOverloads(a: number): number;
    private static privateStaticFooWithOverloads(a: any): any {
        return a;
    }
}

export interface I1 {
    /** This comment should appear for foo*/
    foo(): string;

    /** This is comment for function signature*/
    fooWithParameters(/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number): void;

    fooWithRestParameters(a: string, ...rests: string[]): string;

    fooWithOverloads(a: string): string;
    fooWithOverloads(a: number): number;
}

// @Filename: declFileMethods_1.ts
class c2 {
    /** This comment should appear for foo*/
    public foo() {
    }
    /** This is comment for function signature*/
    public fooWithParameters(/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number) {
        var d = a;
    }
    public fooWithRestParameters(a: string, ...rests: string[]) {
        return a + rests.join("");
    }

    public fooWithOverloads(a: string): string;
    public fooWithOverloads(a: number): number;
    public fooWithOverloads(a: any): any {
        return a;
    }


    /** This comment should appear for privateFoo*/
    private privateFoo() {
    }
    /** This is comment for function signature*/
    private privateFooWithParameters(/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number) {
        var d = a;
    }
    private privateFooWithRestParameters(a: string, ...rests: string[]) {
        return a + rests.join("");
    }
    private privateFooWithOverloads(a: string): string;
    private privateFooWithOverloads(a: number): number;
    private privateFooWithOverloads(a: any): any {
        return a;
    }


    /** This comment should appear for static foo*/
    static staticFoo() {
    }
    /** This is comment for function signature*/
    static staticFooWithParameters(/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number) {
        var d = a;
    }
    static staticFooWithRestParameters(a: string, ...rests: string[]) {
        return a + rests.join("");
    }
    static staticFooWithOverloads(a: string): string;
    static staticFooWithOverloads(a: number): number;
    static staticFooWithOverloads(a: any): any {
        return a;
    }


    /** This comment should appear for privateStaticFoo*/
    private static privateStaticFoo() {
    }
    /** This is comment for function signature*/
    private static privateStaticFooWithParameters(/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number) {
        var d = a;
    }
    private static privateStaticFooWithRestParameters(a: string, ...rests: string[]) {
        return a + rests.join("");
    }
    private static privateStaticFooWithOverloads(a: string): string;
    private static privateStaticFooWithOverloads(a: number): number;
    private static privateStaticFooWithOverloads(a: any): any {
        return a;
    }
}

interface I2 {
    /** This comment should appear for foo*/
    foo(): string;

    /** This is comment for function signature*/
    fooWithParameters(/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number): void;

    fooWithRestParameters(a: string, ...rests: string[]): string;

    fooWithOverloads(a: string): string;
    fooWithOverloads(a: number): number;
}
