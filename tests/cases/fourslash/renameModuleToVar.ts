/// <reference path="./fourslash.ts"/>

////interface IMod {
////    y: number;
////}
////declare module/**/ X: IMod;// {
//////    export var y: numb;
////var y: number;
////namespace Y {
////    var z = y + 5;
////}

goTo.marker();
edit.backspace(6);
edit.insert("var");
verify.noErrors();
