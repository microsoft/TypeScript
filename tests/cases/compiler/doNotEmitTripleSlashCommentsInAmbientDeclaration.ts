// @comments: false

// @Filename: file0.ts
/// <reference path="file1.ts" />
class C {
    /// <reference path="file1.ts" />
    public foo(x: string, y: any)
    public foo(x: string, y: number) { }
}

// @Filename: file1.ts
var x = 10;

/// <reference path="file0.ts" />
declare var OData: any;