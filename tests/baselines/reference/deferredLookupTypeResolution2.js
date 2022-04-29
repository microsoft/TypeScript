//// [deferredLookupTypeResolution2.ts]
// Repro from #17456

type StringContains<S extends string, L extends string> = ({ [K in S]: 'true' } & { [key: string]: 'false'})[L];

type ObjectHasKey<O, L extends string> = StringContains<Extract<keyof O, string>, L>;

type A<T> = ObjectHasKey<T, '0'>;

type B = ObjectHasKey<[string, number], '1'>;  // "true"
type C = ObjectHasKey<[string, number], '2'>;  // "false"
type D = A<[string]>;  // "true"

// Error, "false" not handled
type E<T> = { true: 'true' }[ObjectHasKey<T, '1'>];

type Juxtapose<T> = ({ true: 'otherwise' } & { [k: string]: 'true' })[ObjectHasKey<T, '1'>];

// Error, "otherwise" is missing
type DeepError<T> = { true: 'true' }[Juxtapose<T>];

type DeepOK<T> = { true: 'true', otherwise: 'false' }[Juxtapose<T>];


//// [deferredLookupTypeResolution2.js]
"use strict";
// Repro from #17456


//// [deferredLookupTypeResolution2.d.ts]
declare type StringContains<S extends string, L extends string> = ({
    [K in S]: 'true';
} & {
    [key: string]: 'false';
})[L];
declare type ObjectHasKey<O, L extends string> = StringContains<Extract<keyof O, string>, L>;
declare type A<T> = ObjectHasKey<T, '0'>;
declare type B = ObjectHasKey<[string, number], '1'>;
declare type C = ObjectHasKey<[string, number], '2'>;
declare type D = A<[string]>;
declare type E<T> = {
    true: 'true';
}[ObjectHasKey<T, '1'>];
declare type Juxtapose<T> = ({
    true: 'otherwise';
} & {
    [k: string]: 'true';
})[ObjectHasKey<T, '1'>];
declare type DeepError<T> = {
    true: 'true';
}[Juxtapose<T>];
declare type DeepOK<T> = {
    true: 'true';
    otherwise: 'false';
}[Juxtapose<T>];
