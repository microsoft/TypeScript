//// [tests/cases/compiler/declarationEmitLateBoundAssignments2.ts] ////

//// [declarationEmitLateBoundAssignments2.ts]
// repro from https://github.com/microsoft/TypeScript/issues/54811

const c = "C"

export function decl () {}
decl["B"] = 'foo'

export function decl2 () {}
decl2[c] = 0

export const arrow = () => {}
arrow["B"] = 'bar'

export const arrow2 = () => {}
arrow2[c] = 100


//// [declarationEmitLateBoundAssignments2.js]
// repro from https://github.com/microsoft/TypeScript/issues/54811
const c = "C";
export function decl() { }
decl["B"] = 'foo';
export function decl2() { }
decl2[c] = 0;
export const arrow = () => { };
arrow["B"] = 'bar';
export const arrow2 = () => { };
arrow2[c] = 100;


//// [declarationEmitLateBoundAssignments2.d.ts]
export declare function decl(): void;
export declare namespace decl {
    var B: string;
}
export declare function decl2(): void;
export declare namespace decl2 {
    var C: number;
}
export declare const arrow: {
    (): void;
    B: string;
};
export declare const arrow2: {
    (): void;
    C: number;
};
