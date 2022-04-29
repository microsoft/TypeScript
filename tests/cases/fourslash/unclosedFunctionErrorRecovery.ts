/// <reference path="fourslash.ts" />

////function alpha() {
////
////function beta() { /*1*/alpha()/*2*/; }
////

verify.not.errorExistsBetweenMarkers("1", "2");