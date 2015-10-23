// @removeComments: true

// @Filename: file0.ts
/// <reference path="file1.ts" />
declare var OData: any;

// @Filename: file1.ts
/// <reference path="file0.ts" />
interface F { }

