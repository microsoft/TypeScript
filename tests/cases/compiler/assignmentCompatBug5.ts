function foo1(x: { a: number; }) { }
foo1({ b: 5 });

function foo2(x: number[]) { }
foo2(["s", "t"]);

function foo3(x: (n: number) =>number) { };
foo3((s:string) => { });
foo3((n) => { return; });

