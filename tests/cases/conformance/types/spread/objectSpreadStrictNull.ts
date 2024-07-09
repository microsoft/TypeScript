// @strictNullChecks: true

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
