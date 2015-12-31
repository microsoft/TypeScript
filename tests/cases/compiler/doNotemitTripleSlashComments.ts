// @removeComments: true

// @Filename: file0.ts
/// <reference path="file1.ts" />
/// <reference path="file2.ts" />
/// <amd-dependency path="/js/libs/hgn.js!app/templates/home" name="compiler"/>
var x = 10;

/// <reference path="file1.ts" />
var y = "hello";


/// <reference path="file2.ts" />

// @Filename: file1.ts
/// <reference path="file0.ts" />

function foo() { }


/// <reference path="file0.ts" />


var z = "world";

// @Filename: file2.ts
/// <reference path="file1.ts" />


/// ====================================


function bar() { }


