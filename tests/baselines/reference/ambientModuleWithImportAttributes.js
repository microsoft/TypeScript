//// [tests/cases/conformance/ambient/ambientModuleWithImportAttributes.ts] ////

//// [ambientModuleWithImportAttributes.ts]
// Ambient module declaration with import attributes
declare module "*.css" with { type: "css" } {
    const stylesheet: CSSStyleSheet;
    export default stylesheet;
}

declare module "*.json" with { type: "json" } {
    const data: any;
    export default data;
}

// Ambient module with specific name and import attributes
declare module "my-module" with { type: "custom" } {
    export function foo(): void;
    export const bar: string;
}

// Ambient module with multiple attributes
declare module "multi-attr" with { type: "json", integrity: "sha384-..." } {
    export const value: number;
}

// Ambient module without import attributes (should still work)
declare module "regular-module" {
    export function baz(): void;
}

export {};



//// [ambientModuleWithImportAttributes.js]
export {};


//// [ambientModuleWithImportAttributes.d.ts]
declare module "*.css" with { type: "css" } {
    const stylesheet: CSSStyleSheet;
    export default stylesheet;
}
declare module "*.json" with { type: "json" } {
    const data: any;
    export default data;
}
declare module "my-module" with { type: "custom" } {
    function foo(): void;
    const bar: string;
}
declare module "multi-attr" with { type: "json", integrity: "sha384-..." } {
    const value: number;
}
declare module "regular-module" {
    function baz(): void;
}
export {};
