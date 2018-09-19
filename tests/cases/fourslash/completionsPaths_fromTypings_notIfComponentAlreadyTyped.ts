/// <reference path="fourslash.ts" />

// @Filename: /node_modules/@types/foo/index.d.ts
////

// @Filename: /a.ts
////import {} from "unrelated//**/";

verify.completions({ marker: "", exact: [], isNewIdentifierLocation: true });
