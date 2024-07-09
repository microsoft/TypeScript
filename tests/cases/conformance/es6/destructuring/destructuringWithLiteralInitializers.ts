// (arg: { x: any, y: any }) => void
function f1({ x, y }) { }
f1({ x: 1, y: 1 });

// (arg: { x: any, y?: number }) => void
function f2({ x, y = 0 }) { }
f2({ x: 1 });
f2({ x: 1, y: 1 });

// (arg: { x?: number, y?: number }) => void
function f3({ x = 0, y = 0 }) { }
f3({});
f3({ x: 1 });
f3({ y: 1 });
f3({ x: 1, y: 1 });

// (arg?: { x: number, y: number }) => void
function f4({ x, y } = { x: 0, y: 0 }) { }
f4();
f4({ x: 1, y: 1 });

// (arg?: { x: number, y?: number }) => void
function f5({ x, y = 0 } = { x: 0 }) { }
f5();
f5({ x: 1 });
f5({ x: 1, y: 1 });

// (arg?: { x?: number, y?: number }) => void
function f6({ x = 0, y = 0 } = {}) { }
f6();
f6({});
f6({ x: 1 });
f6({ y: 1 });
f6({ x: 1, y: 1 });

// (arg?: { a: { x?: number, y?: number } }) => void
function f7({ a: { x = 0, y = 0 } } = { a: {} }) { }
f7();
f7({ a: {} });
f7({ a: { x: 1 } });
f7({ a: { y: 1 } });
f7({ a: { x: 1, y: 1 } });

// (arg: [any, any]) => void
function g1([x, y]) { }
g1([1, 1]);

// (arg: [number, number]) => void
function g2([x = 0, y = 0]) { }
g2([1, 1]);

// (arg?: [number, number]) => void
function g3([x, y] = [0, 0]) { }
g3();
g3([1, 1]);

// (arg?: [number, number]) => void
function g4([x, y = 0] = [0]) { }
g4();
g4([1, 1]);

// (arg?: [number, number]) => void
function g5([x = 0, y = 0] = []) { }
g5();
g5([1, 1]);
