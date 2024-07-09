// In a contextually typed object literal, each property value expression is contextually typed by
//      the type of the property with a matching name in the contextual type, if any, or otherwise
//      for a numerically named property, the numeric index type of the contextual type, if any, or otherwise
//      the string index type of the contextual type, if any.

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
