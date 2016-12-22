/// <reference path='fourslash.ts' />

// @Filename: memberListOfEnumFromExternalModule_file0.ts
////export enum Topic{ One, Two }
////var topic = Topic.One;

// @Filename: memberListOfEnumFromExternalModule_file1.ts
////import t = require('./memberListOfEnumFromExternalModule_file0');
////var topic = t.Topic./*1*/

goTo.file("memberListOfEnumFromExternalModule_file1.ts");
goTo.marker('1');
verify.completionListContains("One");