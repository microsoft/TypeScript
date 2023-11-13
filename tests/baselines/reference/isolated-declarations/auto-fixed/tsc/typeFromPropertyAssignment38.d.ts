//// [tests/cases/conformance/salsa/typeFromPropertyAssignment38.ts] ////

//// [typeFromPropertyAssignment38.ts]
function F(): void {}
F["prop"] = 3;

const f: {
    (): void;
    prop: number;
} = function () {};
f["prop"] = 3;


/// [Declarations] ////



//// [typeFromPropertyAssignment38.d.ts]
declare function F(): void;
declare namespace F {
    var prop: number;
}
declare const f: {
    (): void;
    prop: number;
};
