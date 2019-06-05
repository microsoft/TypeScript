//// [negatedInMappedTypeDisablesExcessProperties.ts]
// https://github.com/Microsoft/TypeScript/issues/4196
// needs https://github.com/Microsoft/TypeScript/pull/26797 to work, as even though the mapped type can be
// written, the key type `string & ~("foo" | "bar")` can't be represented as properties or string/number index
// signatures

type Config = {
    foo: number;
    bar: number;
} & {
    [k in (string & not ("foo" | "bar"))]: string;
};

const conf: Config = {
    foo: 12,
    bar: 12,
    other: "string"
}; // OK

const conf2: Config = {
    foo: 12,
    bar: 12,
    other: 0,
}; // Should error



//// [negatedInMappedTypeDisablesExcessProperties.js]
// https://github.com/Microsoft/TypeScript/issues/4196
// needs https://github.com/Microsoft/TypeScript/pull/26797 to work, as even though the mapped type can be
// written, the key type `string & ~("foo" | "bar")` can't be represented as properties or string/number index
// signatures
var conf = {
    foo: 12,
    bar: 12,
    other: "string"
}; // OK
var conf2 = {
    foo: 12,
    bar: 12,
    other: 0
}; // Should error
