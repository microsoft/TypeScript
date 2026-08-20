//// [tests/cases/conformance/importAttributes/ambientModuleImportAttributesDeclarationEmit.ts] ////

//// [global.ts]
declare const marker: number;
declare module "*" with { type: "text" } {
    const data: string;
    export default data;
}




//// [global.d.ts]
declare const marker: number;
declare module "*" with { type: "text" } {
    const data: string;
    export default data;
}
