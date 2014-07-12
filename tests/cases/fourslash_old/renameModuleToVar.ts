/// <reference path="./fourslash.ts"/>

////interface IMod {
////    y: number;
////}
////declare module/**/ X: IMod;// {
//////    export var y: numb;
////var y: number;
////module Y {
////    var z = y + 5;
////}

fs.goTo.marker();
fs.edit.backspace(6);
fs.edit.insert("var");
fs.verify.numberOfErrorsInCurrentFile(0);