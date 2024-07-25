/// <reference path='fourslash.ts'/>

// @strict: true
//// interface Serializer {
////   set value(v: string | number);
////   get value(): string;
//// }
//// declare let box: Serializer;
//// box['value'/*1*/] += 10;

verify.quickInfoAt('1', '(property) Serializer.value: string | number');
