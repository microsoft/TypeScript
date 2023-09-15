/// <reference path='fourslash.ts'/>

// @strict: true
//// interface Serializer {
////   set value(v: string | number | boolean);
////   get value(): string;
//// }
//// declare let box: Serializer;
//// box['value'/*1*/] = true;

verify.quickInfoAt('1', '(property) Serializer.value: string | number | boolean');
