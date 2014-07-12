/// <reference path='./fourslash.ts'/>

////interface IPoint {
////    getDist(): number;
////}
////module Shapes {
////    export class Point implements /*1*/IPoint/*2*/ {
////        constructor (public x: number, public y: number) { }
////        getDist() { return Math.sqrt(this.x * this.x + this.y * this.y); }
////        static origin = new Point(0, 0);
////    }
////}
////var p: IPoint = new Shapes.Point(3, 4);
////var dist = p.getDist();

verify.numberOfErrorsInCurrentFile(0);
goTo.eof();
edit.insertLine("export = Shapes");
verify.numberOfErrorsInCurrentFile(1);
verify.errorExistsBetweenMarkers("1", "2");
