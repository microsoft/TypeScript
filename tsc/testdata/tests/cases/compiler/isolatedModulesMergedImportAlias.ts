// @module: commonjs
// @target: es2015
// @isolatedModules: false, true
// @verbatimModuleSyntax: false, true
// @noEmit: true
// @noTypesAndSymbols: true

// @filename: a.ts
namespace a {
    export import A = x.A;
    export type A = number;
}
namespace b {
    import A = a.A;
}

declare namespace c {
    export const enum A { B }
}
namespace d {
    export import A = c.A;
    export type A = number;
}
namespace e {
    import A = d.A;
}
