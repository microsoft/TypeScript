//// [interface0.ts]
interface Generic<T> {
    x: T;
}

var y: Generic<number> = { x: 3 };


//// [interface0.js]
var y = { x: 3 };
