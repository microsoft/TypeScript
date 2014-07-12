/// <reference path='fourslash.ts' />

////'foo'.replace('o', '3')./*1*/replace/*2*/('f', 5);

verify.errorExistsBetweenMarkers('1', '2');
