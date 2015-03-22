// Tests related to #1774

interface Item {
    name: string;
    description?: string;
}

declare function foo(item: Item): string;
declare function foo(item: any): number;

var x = foo({ name: "Sprocket" });
var x: string;

var y = foo({ name: "Sprocket", description: "Bumpy wheel" });
var y: string;

var z = foo({ name: "Sprocket", description: false });
var z: number;

var w = foo({ a: 10 });
var w: number;

declare function bar<T>(param: { x?: T }): T;

var b = bar({});
var b: {};
