//// [tests/cases/compiler/stringIncrementInEnumComputedNameNoFlake.ts] ////

//// [stringIncrementInEnumComputedNameNoFlake.ts]
// TS2356: An arithmetic operand must be of type 'any', 'number', 'bigint' or an enum type.
declare let text: string;
export enum Values {
    [(text++).valueOf] = 1,
}


//// [stringIncrementInEnumComputedNameNoFlake.js]
export var Values;
(function (Values) {
    Values[Values[(text++).valueOf] = 1] = (text++).valueOf;
})(Values || (Values = {}));


//// [stringIncrementInEnumComputedNameNoFlake.d.ts]
export declare enum Values {
    [(text++).valueOf] = 1
}
