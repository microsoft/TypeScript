//// [tests/cases/compiler/declarationEmitExpandoReservedWordMembers.ts] ////

//// [declarationEmitExpandoReservedWordMembers.ts]
export function decl() {}
decl.default = 1;
decl.class = 2;
decl.function = "s";

export const arrow = () => {};
arrow.default = 1;
arrow.class = 2;
arrow.new = "s";

export function mixed() {}
mixed.a = 1;
mixed.default = 2;
mixed.b = 3;
mixed.class = 4;
mixed.c = 5;

const alias = 0;
export function withAlias() {}
withAlias.x = alias;
withAlias.default = 1;
withAlias.y = 2;
withAlias.class = 3;




//// [declarationEmitExpandoReservedWordMembers.d.ts]
export declare function decl(): void;
export declare namespace decl {
    var _a: number;
    export { _a as default };
    var _b: number;
    export { _b as class };
    var _c: string;
    export { _c as function };
}
export declare function arrow(): void;
export declare namespace arrow {
    var _d: number;
    export { _d as default };
    var _e: number;
    export { _e as class };
    var _f: string;
    export { _f as new };
}
export declare function mixed(): void;
export declare namespace mixed {
    export var a: number;
    var _g: number;
    export { _g as default };
    export var b: number;
    var _h: number;
    export { _h as class };
    export var c: number;
}
declare const alias = 0;
export declare function withAlias(): void;
export declare namespace withAlias {
    export { alias as x };
    var _j: number;
    export { _j as default };
    export var y: number;
    var _k: number;
    export { _k as class };
}
export {};
