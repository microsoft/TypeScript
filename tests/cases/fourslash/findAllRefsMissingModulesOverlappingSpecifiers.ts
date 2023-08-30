/// <reference path="fourslash.ts" />

//// // https://github.com/microsoft/TypeScript/issues/5551
//// import { resolve/*0*/ as resolveUrl } from "idontcare";
//// import { resolve/*1*/ } from "whatever";

verify.baselineFindAllReferences("0", "1");
