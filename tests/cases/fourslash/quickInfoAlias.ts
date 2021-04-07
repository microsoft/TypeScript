/// <reference path='fourslash.ts'/>

// @Filename: /a.ts
/////**
//// * Doc
//// * @tag Tag text
//// */
////export const x = 0;

// @Filename: /b.ts
////import { x } from "./a";
////x/*b*/;

// @Filename: /c.ts
/////**
//// * Doc 2
//// * @tag Tag text 2
//// */
////import {
////    /**
////     * Doc 3
////     * @tag Tag text 3
////     */
////    x
////} from "./a";
////x/*c*/;

verify.baselineQuickInfo()
