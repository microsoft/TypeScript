// @target: ES6
// @experimentalDecorators: true
// @module: system
// @filename: a.ts
var decorator: ClassDecorator;

@decorator
export default class Foo {}

// @filename: b.ts
var decorator: ClassDecorator;

@decorator
export default class {}