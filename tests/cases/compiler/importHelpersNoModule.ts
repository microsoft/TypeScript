// @importHelpers: true
// @target: es5
// @module: commonjs
// @moduleResolution: classic
// @experimentalDecorators: true
// @emitDecoratorMetadata: true
// @filename: external.ts
export class A { }
export class B extends A { }

declare var dec: any;

@dec
class C {
    method(@dec x: number) {
    }
}

// @filename: script.ts
class A { }
class B extends A { }

declare var dec: any;

@dec
class C {
    method(@dec x: number) {
    }
}
