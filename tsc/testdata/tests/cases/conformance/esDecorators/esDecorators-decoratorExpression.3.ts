// @target: esnext
// @experimentalDecorators: *
// @noEmitHelpers: true
// @noTypesAndSymbols: true

declare let g: <T>(...args: any) => any;

// existing errors

{ @g<number> class C {} }

{ @g()<number> class C {} }
