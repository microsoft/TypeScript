declare function foo<A, B, C>(x: A, y: B, z: { z: C }): A & B & C;

// good
foo<infer A, {x: string}, A>({y: 12}, {x: "yes"}, {z: {y: 12}});

// error on 3rd arg
foo<infer A, {x: string}, A>({y: 12}, {x: "yes"}, {z: 12});

// error on first arg
foo<A, {x: string}, infer A>({y: 12}, {x: "yes"}, {z: 12});
