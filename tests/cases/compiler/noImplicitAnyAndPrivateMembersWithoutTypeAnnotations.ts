// @Filename: test.d.ts
declare class Something
{
    private static someStaticVar;
    private someVar;
}

// @noimplicitany: true
// @Filename:app.ts
/// <reference path="test.d.ts" />
var x = new Something();
