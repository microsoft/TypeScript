// @target: esnext
// @module: esnext
// @noEmit: true
// @noTypesAndSymbols: true

declare module "dependency" {
    export interface Type {}
}

type T1 = typeof import("dependency", { with: { "resolution-mode": "import" } });
type T2 = import("dependency", { with: { "resolution-mode": "require" } }).Type;

type T3 = typeof import("dependency", {
    with: {
        a: (() => "value")(),
    },
});

type T4 = import("dependency", {
    with: {
        "resolution-mode": (() => "import")(),
    },
}).Type;

type T5 = import("dependency", {
    with: {
        "resolution-mode": 0,
    },
}).Type;

type T6 = import("dependency", {
    with: {
        "resolution-mode": `import`,
    },
}).Type;
