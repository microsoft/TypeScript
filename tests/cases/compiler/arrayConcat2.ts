var a: string[] = [];
a.concat("hello", 'world');

a.concat('Hello');

var b = new Array<string>();
b.concat('hello');

// #19535

const [x] = (undefined as unknown as string[][]).concat([""]);
x == "";
