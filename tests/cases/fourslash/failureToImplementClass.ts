/// <reference path="fourslash.ts" />

////interface IExec {
////    exec: (filename: string, cmdLine: string) => boolean;
////}
////class /*1*/NodeExec/*2*/ implements IExec { }

verify.errorExistsBetweenMarkers("1", "2");
verify.numberOfErrorsInCurrentFile(1);