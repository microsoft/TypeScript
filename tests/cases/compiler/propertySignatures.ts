// Should be error - duplicate identifiers
declare var foo1: { a:string; a: string; };

// Should be OK
declare var foo2: { a; };
foo2.a = 2;
foo2.a = "0";

// Should be error
declare var foo3: { (): string; (): string; };

// Should be OK
declare var foo4: { (): void; };
var test = foo();

// Should be OK
declare var foo5: {();};
var test = foo5();
test.bar = 2;
