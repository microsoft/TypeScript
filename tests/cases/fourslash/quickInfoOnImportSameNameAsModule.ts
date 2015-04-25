/// <reference path='fourslash.ts' />

////module bar { }
/////*1*/import b/*2*/ar = bar/*3*/;

goTo.marker("2");
verify.quickInfoIs('module bar\nimport bar = bar');
verify.errorExistsAfterMarker("1");
