// @strict: true

declare function fn(a: { x: string }): void;
declare function fn(a: { y: string }): void;
fn({ z: 3, a: 3 });
