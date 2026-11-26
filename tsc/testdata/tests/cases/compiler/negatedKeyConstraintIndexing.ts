// @strict: true
// @noEmit: true

type StringNumberKeys<T> = keyof T & not symbol;
type MyExclude<T, U> = T & not U;

function readAlias<T>(key: MyExclude<keyof T, symbol>, values: { [key: string]: boolean }, stringKey: string, numberKey: number) {
    const stringResult = values[stringKey];
    const numberResult = values[numberKey];
    const result = values[key];
    return result;
}

function readAliasConstrained<T, Key extends MyExclude<keyof T, symbol>>(key: Key, values: { [key: string]: boolean }) {
    const result: boolean = values[key];
    return result;
}

function read<T>(key: StringNumberKeys<T>, values: { [key: string]: boolean }) {
    const result: boolean = values[key];
    return result;
}

function readConstrained<T, Key extends StringNumberKeys<T>>(key: Key, values: { [key: string]: boolean }) {
    const result: boolean = values[key];
    return result;
}

function readStringOnly<T>(key: keyof T & not number & not symbol, values: { [key: string]: boolean }) {
    const result: boolean = values[key];
    return result;
}

declare const symbolKey: unique symbol;
// Error: Symbol keys are excluded.
read<{ [symbolKey]: boolean }>(symbolKey, {});