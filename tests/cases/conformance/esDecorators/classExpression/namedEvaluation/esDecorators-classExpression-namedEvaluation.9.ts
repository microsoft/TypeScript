// @target: es2022
// @module: commonjs
// @noEmitHelpers: true
// @noTypesAndSymbols: true

// @filename: a.ts
declare let dec: any;

export = @dec class { };

// @filename: b.ts
declare let dec: any;

export = class { @dec y: any };