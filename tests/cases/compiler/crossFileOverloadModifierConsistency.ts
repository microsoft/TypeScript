// @strict: true
// @module: preserve
// @noEmit: true
// @noTypesAndSymbols: true

// @Filename: node_modules/library/index.d.ts
declare function get(): string;

export { get };

// @Filename: node_modules/non-ambient/index.ts
export function real(arg?: string): any {}

// @Filename: augmentations.d.ts
export {};

declare module "library" {
  export function get(): string | null;
}

declare module "non-ambient" {
  export function real(arg: string): string;
}
