// @importHelpers: true
// @target: es5
// @module: commonjs
// @jsx: react
// @experimentalDecorators: true
// @emitDecoratorMetadata: true
// @filename: external.tsx
declare var React: any;
declare var o: any;
export const x = <span {...o} />

// @filename: internal.tsx
declare var React: any;
declare var o: any;
const x = <span {...o} />