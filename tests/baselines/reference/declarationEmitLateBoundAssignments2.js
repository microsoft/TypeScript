//// [tests/cases/compiler/declarationEmitLateBoundAssignments2.ts] ////

//// [declarationEmitLateBoundAssignments2.ts]
// https://github.com/microsoft/TypeScript/issues/54811

const c = "C"
const num = 1
const numStr = "10"
const withWhitespace = "foo bar"
const emoji = "🤷‍♂️"

export function decl() {}
decl["B"] = 'foo'

export function decl2() {}
decl2[c] = 0

export function decl3() {}
decl3[77] = 0

export function decl4() {}
decl4[num] = 0

export function decl5() {}
decl5["101"] = 0

export function decl6() {}
decl6[numStr] = 0

export function decl7() {}
decl7["qwe rty"] = 0

export function decl8() {}
decl8[withWhitespace] = 0

export function decl9() {}
decl9["🤪"] = 0

export function decl10() {}
decl10[emoji] = 0

export const arrow = () => {}
arrow["B"] = 'bar'

export const arrow2 = () => {}
arrow2[c] = 100

export const arrow3 = () => {}
arrow3[77] = 0

export const arrow4 = () => {}
arrow4[num] = 0

export const arrow5 = () => {}
arrow5["101"] = 0

export const arrow6 = () => {}
arrow6[numStr] = 0

export const arrow7 = () => {}
arrow7["qwe rty"] = 0

export const arrow8 = () => {}
arrow8[withWhitespace] = 0

export const arrow9 = () => {}
arrow9["🤪"] = 0

export const arrow10 = () => {}
arrow10[emoji] = 0


//// [declarationEmitLateBoundAssignments2.js]
// https://github.com/microsoft/TypeScript/issues/54811
const c = "C";
const num = 1;
const numStr = "10";
const withWhitespace = "foo bar";
const emoji = "🤷‍♂️";
export function decl() { }
decl["B"] = 'foo';
export function decl2() { }
decl2[c] = 0;
export function decl3() { }
decl3[77] = 0;
export function decl4() { }
decl4[num] = 0;
export function decl5() { }
decl5["101"] = 0;
export function decl6() { }
decl6[numStr] = 0;
export function decl7() { }
decl7["qwe rty"] = 0;
export function decl8() { }
decl8[withWhitespace] = 0;
export function decl9() { }
decl9["🤪"] = 0;
export function decl10() { }
decl10[emoji] = 0;
export const arrow = () => { };
arrow["B"] = 'bar';
export const arrow2 = () => { };
arrow2[c] = 100;
export const arrow3 = () => { };
arrow3[77] = 0;
export const arrow4 = () => { };
arrow4[num] = 0;
export const arrow5 = () => { };
arrow5["101"] = 0;
export const arrow6 = () => { };
arrow6[numStr] = 0;
export const arrow7 = () => { };
arrow7["qwe rty"] = 0;
export const arrow8 = () => { };
arrow8[withWhitespace] = 0;
export const arrow9 = () => { };
arrow9["🤪"] = 0;
export const arrow10 = () => { };
arrow10[emoji] = 0;


//// [declarationEmitLateBoundAssignments2.d.ts]
export declare function decl(): void;
export declare namespace decl {
    var B: string;
}
export declare function decl2(): void;
export declare namespace decl2 {
    var C: number;
}
export declare function decl3(): void;
export declare namespace decl3 { }
export declare function decl4(): void;
export declare namespace decl4 { }
export declare function decl5(): void;
export declare namespace decl5 { }
export declare function decl6(): void;
export declare namespace decl6 { }
export declare function decl7(): void;
export declare namespace decl7 { }
export declare function decl8(): void;
export declare namespace decl8 { }
export declare function decl9(): void;
export declare namespace decl9 { }
export declare function decl10(): void;
export declare namespace decl10 { }
export declare const arrow: {
    (): void;
    B: string;
};
export declare const arrow2: {
    (): void;
    C: number;
};
export declare const arrow3: {
    (): void;
    77: number;
};
export declare const arrow4: {
    (): void;
    1: number;
};
export declare const arrow5: {
    (): void;
    "101": number;
};
export declare const arrow6: {
    (): void;
    "10": number;
};
export declare const arrow7: {
    (): void;
    "qwe rty": number;
};
export declare const arrow8: {
    (): void;
    "foo bar": number;
};
export declare const arrow9: {
    (): void;
    "\uD83E\uDD2A": number;
};
export declare const arrow10: {
    (): void;
    "\uD83E\uDD37\u200D\u2642\uFE0F": number;
};
