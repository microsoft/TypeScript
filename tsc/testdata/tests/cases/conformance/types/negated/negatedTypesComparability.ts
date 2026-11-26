// @strict: true
// @noEmit: true

declare const stringValue: string;
declare const excludedStringValue: string & not "excluded";

stringValue === excludedStringValue;
excludedStringValue === stringValue;

declare const zero: 0;
declare const nonzeroNumber: number & not 0;

zero === nonzeroNumber; // error
nonzeroNumber === zero; // error