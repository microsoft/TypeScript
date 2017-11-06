/// <reference path="fourslash.ts" />

//@Filename: file.tsx
////
//// var x = <div>
//// /*0*/hello/*1*/
//// /*2*/goodbye/*3*/
//// </div>;

for (const marker in test.markers()) {
    verify.noDocCommentTemplateAt(marker);
}