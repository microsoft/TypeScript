declare const fA: <T>() => { v: T };
const fB = <T>() => {
    return { v: '' as any as T };
};
const fC = <T>() => {
    return {} as any as { v: T };
};

// Hover display is identical on all of these
type TA = typeof fA;
type TB = typeof fB;
type TC = typeof fC;
type TL = <T>() => { v: T }; 

declare function accA(x: TA): void;
declare function accB(x: TB): void;
declare function accC(x: TC): void;
declare function accL(x: TL): void;

// These should all be OK, every type is identical
accA(fA); accA(fB); accA(fC);
//             ~~ previously an error
accB(fA); accB(fB); accB(fC);
//             OK
accC(fA); accC(fB); accC(fC);
//             ~~ previously an error
accL(fA); accL(fB); accL(fC);
//             ~~ previously an error