/// <reference path='fourslash.ts'/>

////export type /*1*/Segment = [/*2*/length: number, /*3*/count: number];

verify.quickInfoAt("1", "type Segment = [length: number, count: number]");
verify.quickInfoAt("2", "(index: 0) number");
verify.quickInfoAt("3", "(index: 1) number");