// @isolatedModules: true

// @Filename: script-namespaces.ts
namespace Instantiated {
    export const x = 1;
}
namespace Uninstantiated {
    export type T = number;
}
declare namespace Ambient {
    export const x: number;
}

// @Filename: module-namespaces.ts
export namespace Instantiated {
    export const x = 1;
}

// @Filename: enum1.ts
enum Enum { A, B, C }
declare enum Enum { X = 1_000_000 }
const d = 'd';

// @Filename: enum2.ts
enum Enum {
    D = d,
    E = A, // error
    Y = X, // error
    Z = Enum.A
}

declare enum Enum {
    F = A
}