// @declaration: true
function f({x = 10, y: [a, b, c, d] = [1, 2, 3, 4]} = { x: 10, y: [2, 4, 6, 8] }) { }
function g([a, b, c, d] = [1, 2, 3, 4]) { }
function h([a, [b], [[c]], {x = 10, y: [a, b, c], z: {a1, b1}}]){ }
function h1([a, [b], [[c]], {x = 10, y = [1, 2, 3], z: {a1, b1}}]){ }