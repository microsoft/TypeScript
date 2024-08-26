/// <reference path='fourslash.ts' />

// @strict: true

// @filename: global.d.ts
//// interface ImportAttributes { 
////   type: "json";
//// }

// @filename: index.ts
//// import * as ns from () with { type: "/**/" };

verify.completions({
  marker: "",
  exact: ["json"],
  isNewIdentifierLocation: false,
});
