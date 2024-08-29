/// <reference path="fourslash.ts" />

// @Filename: file1.ts
////declare let x: `${"prefix1"|"prefix2"}${string}${"middle1"|"middle2"}${string}${"suffix1"|"suffix2"}`;
////x = "/*1a*/
////x = "/*1b*/"
////x = "wrong/*2a*/
////x = "wrong/*2b*/"
////x = "pre/*3a*/
////x = "pre/*3b*/"
////x = "prefix1_/*4a*/
////x = "prefix1_/*4b*/"
////x = "prefix1_middle1_/*5a*/
////x = "prefix1_middle1_/*5b*/"
////x = "prefix1_middle1_suffix1/*6a*/
////x = "prefix1_middle1_suffix1/*6b*/"
////
////declare let y: `"'${string}'"`;
////y = "/*7a*/
////y = "/*7b*/"
////y = '/*8a*/
////y = '/*8b*/'
////y = '"\'\\\"\\/*9*/
////
////declare let z: `${string}suffix`;
////z = "/*10a*/
////z = "/*10b*/"
////z = '/*11a*/
////z = '/*11b*/'

verify.baselineCompletions()
