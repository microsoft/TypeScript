// @experimentalDecorators: true
// @emitDecoratorMetadata: true
// @target: es5
// @module: commonjs

// @filename: /a.ts
declare var decorator: any;
class C1 {
    @decorator()
    c?: *;
}

// @filename: /b.ts
declare var decorator: any;
class C2 {
    @decorator()
    a?: string?;
    @decorator()
    b?: string!;
}
