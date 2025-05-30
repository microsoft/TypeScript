/// <reference path='fourslash.ts' />

// https://github.com/microsoft/TypeScript/issues/61500

//// declare function makeRequest<QueryParam>(
////   getFn: (client: { prop: number }) => QueryParam,
////   params: NoInfer<QueryParam>,
//// ): void;
////
//// makeRequest((client) => client, {/*1*/});
////
//// // for comparison
//// makeRequest((client: { prop: number }) => client, {/*2*/});

verify.completions({
  marker: ["1", "2"],
  exact: ["prop"],
});
