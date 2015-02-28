/// <reference path='fourslash.ts'/>

// @Filename: moduleA.ts
////export var x = 0;

// @Filename: folderA/moduleA.ts
////export var x = 0;

// @Filename: folderA/folderAA/moduleAA.ts
////export var x = 0;

// @Filename: folderA/folderAA/folderAAA/moduleAAA.ts
////export var x = 0;

// @Filename: folderA/folderAA/folderAAB/current.ts
////import * from "/*1*/";

goTo.marker("1");
verify.memberListContains("../folderAAA/moduleAAA");
verify.memberListContains("../moduleAA");
verify.memberListContains("../../moduleA");
verify.memberListContains("../../../moduleA");
verify.memberListCount(4);

