// @declaration: true
// @target: es2015
// @module: esnext

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

