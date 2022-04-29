//// [unionTypeCallSignatures4.ts]
type F1 = (a: string, b?: string) => void;
type F2 = (a: string, b?: string, c?: string) => void;
type F3 = (a: string, ...rest: string[]) => void;
type F4 = (a: string, b?: string, ...rest: string[]) => void;
type F5 = (a: string, b: string) => void;

var f12: F1 | F2;
f12("a");
f12("a", "b");
f12("a", "b", "c");  // ok

var f34: F3 | F4;
f34("a");
f34("a", "b");
f34("a", "b", "c");

var f1234: F1 | F2 | F3 | F4;
f1234("a");
f1234("a", "b");
f1234("a", "b", "c");  // ok

var f12345: F1 | F2 | F3 | F4 | F5;
f12345("a");  // error
f12345("a", "b");
f12345("a", "b", "c");  // error


//// [unionTypeCallSignatures4.js]
var f12;
f12("a");
f12("a", "b");
f12("a", "b", "c"); // ok
var f34;
f34("a");
f34("a", "b");
f34("a", "b", "c");
var f1234;
f1234("a");
f1234("a", "b");
f1234("a", "b", "c"); // ok
var f12345;
f12345("a"); // error
f12345("a", "b");
f12345("a", "b", "c"); // error
