/// <reference path="fourslash.ts" />

// @filename: /a.ts
////export interface LocationDefinitions {}
////export interface PersonDefinitions {}

// @filename: /b.ts
////export {
////    /** @deprecated Use LocationDefinitions instead */
////    LocationDefinitions as AddressDefinitions,
////    LocationDefinitions,
////    /** @deprecated Use PersonDefinitions instead */
////    PersonDefinitions as NameDefinitions,
////    PersonDefinitions,
////} from './a';

goTo.file("/b.ts");
verify.organizeImports(
`export {
    /** @deprecated Use LocationDefinitions instead */
    LocationDefinitions as AddressDefinitions,
    LocationDefinitions,
    /** @deprecated Use PersonDefinitions instead */
    PersonDefinitions as NameDefinitions,
    PersonDefinitions
} from './a';
`);
