//// [tests/cases/compiler/isolatedDeclarationLazySymbols.ts] ////

//// [isolatedDeclarationLazySymbols.ts]
export function foo(): void {

}

const o = {
    ["prop.inner"]: "a",
    prop: {
        inner: "b",
    }
} as const

foo[o["prop.inner"]] ="A";
foo[o.prop.inner] = "B";

export class Foo {
    [o["prop.inner"]] ="A"
    [o.prop.inner] = "B"
}

export let oo: {
    a: string;
    [o.prop.inner]: string;
} = {
    [o['prop.inner']]:"A",
    [o.prop.inner]: "B",
}

/// [Declarations] ////



//// [isolatedDeclarationLazySymbols.d.ts]
export declare function foo(): void;
export declare namespace foo {
    var b: string;
}
declare const o: {
    readonly "prop.inner": "a";
    readonly prop: {
        readonly inner: "b";
    };
};
export declare class Foo {
}
export declare let oo: {
    a: string;
    [o.prop.inner]: string;
};
export {};
//# sourceMappingURL=isolatedDeclarationLazySymbols.d.ts.map
/// [Errors] ////

isolatedDeclarationLazySymbols.ts(16,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.


==== isolatedDeclarationLazySymbols.ts (1 errors) ====
    export function foo(): void {
    
    }
    
    const o = {
        ["prop.inner"]: "a",
        prop: {
            inner: "b",
        }
    } as const
    
    foo[o["prop.inner"]] ="A";
    foo[o.prop.inner] = "B";
    
    export class Foo {
        [o["prop.inner"]] ="A"
        ~~~~~~~~~~~~~~~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
        [o.prop.inner] = "B"
    }
    
    export let oo: {
        a: string;
        [o.prop.inner]: string;
    } = {
        [o['prop.inner']]:"A",
        [o.prop.inner]: "B",
    }