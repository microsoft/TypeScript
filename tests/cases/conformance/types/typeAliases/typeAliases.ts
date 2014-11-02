// Writing a reference to a type alias has exactly the same effect as writing the aliased type itself.

type Meters = number

enum E { x = 10 }

declare function f(a: string): boolean;
declare function f(a: Meters): string;
f(E.x).toLowerCase();

type StringAndBoolean = [string, boolean]
declare function f1(s: StringAndBoolean): string;
var x: [string, boolean];
f1(x);

var y: StringAndBoolean = ["1", false];
y[0].toLowerCase();