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

/** @return {function(): Array<[string, {x?:number, y?:number}]>} */
function f() {
    return [
        ['a', { x: 1 }],
        ['b', { y: 2 }]
    ];
}

class C {
    /** @param {function(): Array<[string, {x?:number, y?:number}]>} value */
    set x(value) { }
    get () {
        return [
            ['a', { x: 1 }],
            ['b', { y: 2 }]
        ];
    }
}