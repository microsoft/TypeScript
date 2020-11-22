// @target: es6
type X = { x: 'x' };
type Y = { y: 'y' };

declare const arr: X[] & Y[];

for (const item of arr) {
    item.x;
    item.y;
}
