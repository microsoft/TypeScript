// @filename: module.ts
module A {
    export module Point {
        export var Origin = { x: 0, y: 0 };
    }
}

// @filename: function.ts
module A {
    // duplicate identifier error
    export function Point() {
        return { x: 0, y: 0 };
    }
}

// @filename: simple.ts
module B {

    export module Point {
        export var Origin = { x: 0, y: 0 };
    }

    // duplicate identifier error
    export function Point() {
        return { x: 0, y: 0 };
    }
}
