/// <reference path='fourslash.ts' />

//@module: commonjs
//@jsx: preserve

//@Filename: exporter.tsx
//// export class Thing { }

//@Filename: file.tsx
//// import {Thing} from './exporter';
//// var x1 = <div></**/

goTo.marker();
verify.completionListContains('Thing');
