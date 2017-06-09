// @allowJs: true
// @checkJs: true
// @noEmit: true
// @filename: index.js
// @target: esnext

/** @type {Array<[string, {x?:number, y?:number}]>} */
const arr = [
    ['a', { x: 1 }],
    ['b', { y: 2 }]
];

/** @return {Array<[string, {x?:number, y?:number}]>} */
function f() {
    return [
        ['a', { x: 1 }],
        ['b', { y: 2 }]
    ];
}

class C {
    /** @param {Array<[string, {x?:number, y?:number}]>} value */
    set x(value) { }
    get x() {
        return [
            ['a', { x: 1 }],
            ['b', { y: 2 }]
        ];
    }
}