//// [tests/cases/compiler/unionExcessPropertyCheckNoApparentPropTypeMismatchErrors.ts] ////

//// [unionExcessPropertyCheckNoApparentPropTypeMismatchErrors.ts]
interface IStringDictionary<V> {
	[name: string]: V;
}
interface INumberDictionary<V> {
	[idx: number]: V;
}

declare function forEach<T>(from: IStringDictionary<T> | INumberDictionary<T>, callback: (entry: { key: any; value: T; }, remove: () => void) => any);

let count = 0;
forEach({ toString: 123 }, () => count++);


//// [unionExcessPropertyCheckNoApparentPropTypeMismatchErrors.js]
var count = 0;
forEach({ toString: 123 }, function () { return count++; });
