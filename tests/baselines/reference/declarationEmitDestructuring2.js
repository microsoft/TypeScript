//// [tests/cases/compiler/declarationEmitDestructuring2.ts] ////

//// [declarationEmitDestructuring2.ts]
function f({x = 10, y: [a, b, c, d] = [1, 2, 3, 4]} = { x: 10, y: [2, 4, 6, 8] }) { }
function g([a, b, c, d] = [1, 2, 3, 4]) { }
function h([a, [b], [[c]], {x = 10, y: [a, b, c], z: {a1, b1}}]){ }
function h1([a, [b], [[c]], {x = 10, y = [1, 2, 3], z: {a1, b1}}]){ }

//// [declarationEmitDestructuring2.js]
function f({ x = 10, y: [a, b, c, d] = [1, 2, 3, 4] } = { x: 10, y: [2, 4, 6, 8] }) { }
function g([a, b, c, d] = [1, 2, 3, 4]) { }
function h([a, [b], [[c]], { x = 10, y: [a, b, c], z: { a1, b1 } }]) { }
function h1([a, [b], [[c]], { x = 10, y = [1, 2, 3], z: { a1, b1 } }]) { }


//// [declarationEmitDestructuring2.d.ts]
declare function f({ x, y: [a, b, c, d] }?: {
    x?: number;
    y?: [number, number, number, number];
}): void;
declare function g([a, b, c, d]?: [number, number, number, number]): void;
declare function h([a, [b], [[c]], { x, y: [a, b, c], z: { a1, b1 } }]: [any, [any], [[any]], {
    x?: number;
    y: [any, any, any];
    z: {
        a1: any;
        b1: any;
    };
}]): void;
declare function h1([a, [b], [[c]], { x, y, z: { a1, b1 } }]: [any, [any], [[any]], {
    x?: number;
    y?: number[];
    z: {
        a1: any;
        b1: any;
    };
}]): void;
