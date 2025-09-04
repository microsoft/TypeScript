// @filename: module.ts
namespace A {
    export namespace Point {
        export var Origin = { x: 0, y: 0 };
    }
}

// @filename: function.ts
namespace A {
    // duplicate identifier error
    export function Point() {
        return { x: 0, y: 0 };
    }
}

// @filename: simple.ts
namespace B {

    export namespace Point {
        export var Origin = { x: 0, y: 0 };
    }

    // duplicate identifier error
    export function Point() {
        return { x: 0, y: 0 };
    }
}
