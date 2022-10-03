/// <reference path='fourslash.ts' />

////export class myController {
////    private _processId;
////    constructor (processId: number) {/*1*/
////        this._processId = processId;
////    }/*2*/

goTo.marker('2');
edit.insert('}');
goTo.marker('1');
verify.currentLineContentIs('    constructor(processId: number) {');