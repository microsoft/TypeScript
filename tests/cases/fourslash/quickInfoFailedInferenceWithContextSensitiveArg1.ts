/// <reference path='fourslash.ts' />

// https://github.com/microsoft/TypeScript/issues/61500

//// declare function makeRequest<QueryParam>(
////   getFn: (client: { prop: number }) => QueryParam,
////   params: NoInfer<QueryParam>,
//// ): void;
////
//// makeRequest/*1*/((client) => client, {});
////
//// // for comparison
//// makeRequest/*2*/((client: { prop: number }) => client, {});

verify.quickInfoAt("1", `function makeRequest<{
    prop: number;
}>(getFn: (client: {
    prop: number;
}) => {
    prop: number;
}, params: NoInfer<{
    prop: number;
}>): void`);
verify.quickInfoAt("2", `function makeRequest<{
    prop: number;
}>(getFn: (client: {
    prop: number;
}) => {
    prop: number;
}, params: NoInfer<{
    prop: number;
}>): void`);
