a;
let {a, b = a} = {a: '', b: 1};
b;

function test({c, d = c}: Record<string, number>) {}
