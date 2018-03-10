declare function foo<A, B, C>(x: A, y: B, z: { z: C }): A & B & C;

// good
var a = foo<infer A, {x: string}, A>({y: 12}, {x: "yes"}, {z: {y: 12}});

// error on 3rd arg
var b = foo<infer A, {x: string}, A>({y: 12}, {x: "yes"}, {z: 12});

// error on first arg
var c = foo<A, {x: string}, infer A>({y: 12}, {x: "yes"}, {z: 12});

// good
var d = foo<{y: infer A}, {x: string}, A>({y: 12}, {x: "yes"}, {z: 12});