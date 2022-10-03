//// [assignToPrototype1.ts]
declare class Point {
  add(dx: number, dy: number): void;
}

Point.prototype.add = function(dx, dy) {
};

//// [assignToPrototype1.js]
Point.prototype.add = function (dx, dy) {
};
