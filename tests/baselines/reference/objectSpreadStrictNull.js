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

interface Fields {
    foo: number;
    bar: string;
}
interface NearlyPartialFields {
    foo: number | undefined;
    bar: string | undefined;
}
function g(fields: Fields, partialFields: Partial<Fields>, nearlyPartialFields: NearlyPartialFields) {
    // ok, undefined is stripped from optional properties when spread
    fields = { ...fields, ...partialFields };
    // error: not optional, undefined remains
    fields = { ...fields, ...nearlyPartialFields };
}


//// [objectSpreadStrictNull.js]
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function f(definiteBoolean, definiteString, optionalString, optionalNumber, undefinedString, undefinedNumber) {
    // optional
    var optionalUnionStops = __assign(__assign(__assign({}, definiteBoolean), definiteString), optionalNumber);
    var optionalUnionDuplicates = __assign(__assign(__assign(__assign({}, definiteBoolean), definiteString), optionalString), optionalNumber);
    var allOptional = __assign(__assign({}, optionalString), optionalNumber);
    // undefined
    var undefinedUnionStops = __assign(__assign(__assign({}, definiteBoolean), definiteString), undefinedNumber);
    var undefinedUnionDuplicates = __assign(__assign(__assign(__assign({}, definiteBoolean), definiteString), undefinedString), undefinedNumber);
    var allUndefined = __assign(__assign({}, undefinedString), undefinedNumber);
    var undefinedWithOptionalContinues = __assign(__assign(__assign({}, definiteBoolean), undefinedString), optionalNumber);
}
var m = { title: "The Matrix", yearReleased: 1999 };
// should error here because title: undefined is not assignable to string
var x = __assign(__assign({}, m), { title: undefined });
function g(fields, partialFields, nearlyPartialFields) {
    // ok, undefined is stripped from optional properties when spread
    fields = __assign(__assign({}, fields), partialFields);
    // error: not optional, undefined remains
    fields = __assign(__assign({}, fields), nearlyPartialFields);
}
