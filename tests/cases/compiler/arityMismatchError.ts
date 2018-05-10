declare function f(x: number);
declare function f(x: number, y: number, z: number);
f();
f('mismatch');
f(1, 2);
f(1, 2, 3, 4);
f(1, 2, 3, 4, 5, 6);
