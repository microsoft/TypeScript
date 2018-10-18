/// <reference path='fourslash.ts'/>

// @Filename: externalModuleIntellisense_file0.ts
////export = express;
////function express(): express.ExpressServer;
////module express {
////    export interface ExpressServer {
////        enable(name: string): ExpressServer;
////        post(path: RegExp, handler: (req: Function) => void): void;
////    }
////    export class ExpressServerRequest {
////    }
////}

// @Filename: externalModuleIntellisense_file1.ts
///////<reference path='externalModuleIntellisense_file0.ts'/>
////import express = require('./externalModuleIntellisense_file0');
////var x = express();/*1*/

goTo.marker('1');
verify.numberOfErrorsInCurrentFile(0);
goTo.eof();
edit.insert("x.");
verify.completionListContains('enable');
verify.completionListContains('post');
verify.completionListCount(2);
