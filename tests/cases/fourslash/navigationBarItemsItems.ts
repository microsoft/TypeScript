/// <reference path="fourslash.ts"/>

////// Interface
////{| "itemName": "IPoint", "kind": "interface", "parentName": "" |}interface IPoint {
////    {| "itemName": "getDist", "kind": "method", "parentName": "IPoint" |}getDist(): number;
////    {| "itemName": "new()", "kind": "construct", "parentName": "IPoint" |}new(): IPoint;
////    {| "itemName": "()", "kind": "call", "parentName": "IPoint" |}(): any;
////    {| "itemName": "[]", "kind": "index", "parentName": "IPoint" |}[x:string]: number;
////    {| "itemName": "prop", "kind": "property", "parentName": "IPoint" |}prop: string;
////}
////
/////// Module
////{| "itemName": "Shapes", "kind": "module", "parentName": "" |}module Shapes {
////
////    // Class
////    {| "itemName": "Point", "kind": "class", "parentName": "Shapes" |}export class Point implements IPoint {
////        {| "itemName": "constructor", "kind": "constructor", "parentName": "Shapes.Point" |}constructor (public x: number, public y: number) { }
////
////        // Instance member
////        {| "itemName": "getDist", "kind": "method", "parentName": "Shapes.Point" |}getDist() { return Math.sqrt(this.x * this.x + this.y * this.y); }
////
////        // Getter
////        {| "itemName": "value", "kind": "getter", "parentName": "Shapes.Point" |}get value(): number { return 0; }
////
////        // Setter
////        {| "itemName": "value", "kind": "setter", "parentName": "Shapes.Point" |}set value(newValue: number) { return; }
////
////        // Static member
////        {| "itemName": "origin", "kind": "property", "parentName": "Shapes.Point" |}static origin = new Point(0, 0);
////
////        // Static method
////        {| "itemName": "getOrigin", "kind": "method", "parentName": "Shapes.Point" |}private static getOrigin() { return Point.origin;}
////    }
////
////    {| "itemName": "Values", "kind": "enum", "parentName": "Shapes" |}enum Values {
////        value1,
////        {| "itemName": "value2", "kind": "property", "parentName": "Shapes.Values" |}value2,
////        value3,
////    }
////}
////
////// Local variables
////{| "itemName": "p", "kind": "var", "parentName": "" |}var p: IPoint = new Shapes.Point(3, 4);
////{| "itemName": "dist", "kind": "var", "parentName": "" |}var dist = p.getDist();

test.markers().forEach((marker) => {
    if (marker.data) {
        verify.getScriptLexicalStructureListContains(marker.data.itemName, marker.data.kind, marker.fileName, marker.data.parentName);
    }
});

verify.getScriptLexicalStructureListCount(23);
