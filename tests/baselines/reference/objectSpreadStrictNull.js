//// [objectSpreadStrictNull.ts]
function f(
    definiteBoolean: { sn: boolean },
    definiteString: { sn: string },
    optionalString: { sn?: string },
    optionalNumber: { sn?: number },
    undefinedString: { sn: string | undefined },
    undefinedNumber: { sn: number | undefined }) {
    // optional
    let optionalUnionStops: { sn: string | number } = { ...definiteBoolean, ...definiteString, ...optionalNumber };
    let optionalUnionDuplicates: { sn: string | number } = { ...definiteBoolean, ...definiteString, ...optionalString, ...optionalNumber };
    let allOptional: { sn?: string | number } = { ...optionalString, ...optionalNumber };

    // undefined
    let undefinedUnionStops: { sn: string | number } = { ...definiteBoolean, ...definiteString, ...undefinedNumber };
    let undefinedUnionDuplicates: { sn: string | number } = { ...definiteBoolean, ...definiteString, ...undefinedString, ...undefinedNumber };
    let allUndefined: { sn: string | number | undefined } = { ...undefinedString, ...undefinedNumber };

    let undefinedWithOptionalContinues: { sn: string | number | boolean } = { ...definiteBoolean, ...undefinedString, ...optionalNumber };
}

type Movie = {
    title: string;
    yearReleased: number;
}

const m = { title: "The Matrix", yearReleased: 1999 };
// should error here because title: undefined is not assignable to string
const x: Movie = { ...m, title: undefined };


//// [objectSpreadStrictNull.js]
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
function f(definiteBoolean, definiteString, optionalString, optionalNumber, undefinedString, undefinedNumber) {
    // optional
    var optionalUnionStops = __assign({}, definiteBoolean, definiteString, optionalNumber);
    var optionalUnionDuplicates = __assign({}, definiteBoolean, definiteString, optionalString, optionalNumber);
    var allOptional = __assign({}, optionalString, optionalNumber);
    // undefined
    var undefinedUnionStops = __assign({}, definiteBoolean, definiteString, undefinedNumber);
    var undefinedUnionDuplicates = __assign({}, definiteBoolean, definiteString, undefinedString, undefinedNumber);
    var allUndefined = __assign({}, undefinedString, undefinedNumber);
    var undefinedWithOptionalContinues = __assign({}, definiteBoolean, undefinedString, optionalNumber);
}
var m = { title: "The Matrix", yearReleased: 1999 };
// should error here because title: undefined is not assignable to string
var x = __assign({}, m, { title: undefined });
