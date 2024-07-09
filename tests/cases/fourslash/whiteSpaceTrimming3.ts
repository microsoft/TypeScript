/// <reference path="fourslash.ts" />

////let t = "foo \
////bar     \   
////"/*1*/

goTo.marker('1');
edit.insert(";");

verify.currentFileContentIs("let t = \"foo \\\nbar     \\   \n\";");
