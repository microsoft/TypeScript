/// <reference path="fourslash.ts" />

// @Filename: a.ts
////import Point from './point';
////import p2 from './f';
////const p: Point = p2;

// @Filename: f.ts
////import Point from './point2';
////export default new Point();

// @Filename: point.ts
////export default class Point {
////    private x: number;
////}

// @Symlink: point2.ts -> point.ts

//goTo.file("a.ts");
//verify.numberOfErrorsInCurrentFile(0);

goTo.file("f.ts");
debug.printErrorList();
verify.numberOfErrorsInCurrentFile(0);
