//// [tests/cases/compiler/undefinedPropertyDeclarationOrder.ts] ////

//// [undefinedPropertyDeclarationOrder.ts]
export const a = Math.random() > 0.5 ? { user: 1 } : { status: "a" };
export const b = Math.random() > 0.5 ? { status: "no" } : { status: "ok", user: 2 };




//// [undefinedPropertyDeclarationOrder.d.ts]
export declare const a: {
    user: number;
    status?: undefined;
} | {
    user?: undefined;
    status: string;
};
export declare const b: {
    status: string;
    user?: undefined;
} | {
    status: string;
    user: number;
};
