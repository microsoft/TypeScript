/// <reference path='fourslash.ts'/>

// @Filename: b.ts
////import {Foo, Bar} from 'e/*1*/';

// @Filename: a.ts
////declare module /*2*/"e" {
////    class Foo { }
////}

verify.goToDefinition("1", "2");
