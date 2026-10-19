//// [tests/cases/compiler/unusedCommaOperandInEnumComputedNameNoFlake.ts] ////

//// [unusedCommaOperandInEnumComputedNameNoFlake.ts]
// TS2695: Left side of comma operator is unused and has no side effects.
export enum Values {
    [(1, 2).valueOf] = 1,
}


//// [unusedCommaOperandInEnumComputedNameNoFlake.js]
// TS2695: Left side of comma operator is unused and has no side effects.
export var Values;
(function (Values) {
    Values[Values[(1, 2).valueOf] = 1] = (1, 2).valueOf;
})(Values || (Values = {}));


//// [unusedCommaOperandInEnumComputedNameNoFlake.d.ts]
export declare enum Values {
    [(1, 2).valueOf] = 1
}
