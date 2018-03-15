//// [inferTypeArgumentKeyword.ts]
declare function foo<A, B, C>(x: A, y: B, z: { z: C }): A & B & C;

// good
var a = foo<infer A, {x: string}, A>({y: 12}, {x: "yes"}, {z: {y: 12}});

// error on 3rd arg
var b = foo<infer A, {x: string}, A>({y: 12}, {x: "yes"}, {z: 12});

// error on first arg
var c = foo<A, {x: string}, infer A>({y: 12}, {x: "yes"}, {z: 12});

type Ob<T> = {y: T};
// good
var d = foo<Ob<infer A>, {x: string}, A>({y: 12}, {x: "yes"}, {z: 12});

// error on 3rd arg
var e = foo<Ob<infer A>, {x: string}, A>({y: 12}, {x: "yes"}, {z: "no"});

// good
var e = foo<{y: A}, {x: string}, Ob<infer A>>({y: 12}, {x: "yes"}, {z: { y: 12 }});

// error on 1st arg
var f = foo<{y: A}, {x: string}, Ob<infer A>>({y: "no"}, {x: "yes"}, {z: { y: 12 }});

//// [inferTypeArgumentKeyword.js]
// good
var a = foo({ y: 12 }, { x: "yes" }, { z: { y: 12 } });
// error on 3rd arg
var b = foo({ y: 12 }, { x: "yes" }, { z: 12 });
// error on first arg
var c = foo({ y: 12 }, { x: "yes" }, { z: 12 });
// good
var d = foo({ y: 12 }, { x: "yes" }, { z: 12 });
// error on 3rd arg
var e = foo({ y: 12 }, { x: "yes" }, { z: "no" });
// good
var e = foo({ y: 12 }, { x: "yes" }, { z: { y: 12 } });
// error on 1st arg
var f = foo({ y: "no" }, { x: "yes" }, { z: { y: 12 } });
