//// [arrayConstructors1.ts]
var x: string[];
x = new Array(1);
x = new Array('hi', 'bye'); 
x = new Array<string>('hi', 'bye');

var y: number[];
y = new Array(1);
y = new Array(1,2);
y = new Array<number>(1, 2);

//// [arrayConstructors1.js]
var x;
x = new Array(1);
x = new Array('hi', 'bye');
x = new Array('hi', 'bye');
var y;
y = new Array(1);
y = new Array(1, 2);
y = new Array(1, 2);
