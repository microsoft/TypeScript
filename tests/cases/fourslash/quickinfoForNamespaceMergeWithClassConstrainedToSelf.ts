/// <reference path="fourslash.ts" />


//// declare namespace AMap {
////     namespace MassMarks {
////         interface Data {
////             style?: number;
////         }
////     }
////     class MassMarks<D extends MassMarks.Data = MassMarks.Data> {
////         constructor(data: D[] | string);
////         clear(): void;
////     }
//// }
////
//// interface MassMarksCustomData extends AMap.MassMarks./*1*/Data {
////     name: string;
////     id: string;
//// }

verify.quickInfoAt("1", "interface AMap.MassMarks<D extends AMap.MassMarks.Data = AMap.MassMarks.Data>.Data");
