// @target: es2017, es2024

// @filename: repro.ts
e?.``(

// @filename: siblings.ts
declare var a: any;
a?.b`c`;
a?.b`c`();
a?.``.x;
