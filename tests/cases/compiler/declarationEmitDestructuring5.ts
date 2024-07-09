// @declaration: true
function baz([, z, , ]) { }
function foo([, b, ]: [any, any]): void { }
function bar([z, , , ]) { }
function bar1([z, , , ] = [1, 3, 4, 6, 7]) { }
function bar2([,,z, , , ]) { }