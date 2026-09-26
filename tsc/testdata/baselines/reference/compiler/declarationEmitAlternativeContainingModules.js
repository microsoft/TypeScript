//// [tests/cases/compiler/declarationEmitAlternativeContainingModules.ts] ////

//// [model.ts]
export interface Model { value: string; }
export function make(): Model { return { value: "" }; }

//// [factory.ts]
export { make } from "./model";

//// [aliases.ts]
export { Model as First, Model as Second } from "./model";

//// [preferred.ts]
export { Model, Model as Renamed } from "./model";

//// [star.ts]
export * from "./aliases";

//// [direct.ts]
import { make } from "./factory";
export const direct = make();
export const repeated = make();

//// [renamed.ts]
import { make } from "./factory";
import * as aliases from "./aliases";
export const renamed = make();

//// [sameName.ts]
import { make } from "./factory";
import * as preferred from "./preferred";
export const sameName = make();

//// [starred.ts]
import { make } from "./factory";
import * as star from "./star";
export const starred = make();

//// [exported.ts]
import { Model } from "./model";
export = Model;

//// [exportEquals.ts]
import { make } from "./factory";
import Model = require("./exported");
export const exportEquals = make();

//// [index.ts]
export { direct, repeated } from "./direct";
export { renamed } from "./renamed";
export { sameName } from "./sameName";
export { starred } from "./starred";
export { exportEquals } from "./exportEquals";




//// [model.d.ts]
export interface Model {
    value: string;
}
export declare function make(): Model;
//// [factory.d.ts]
export { make } from "./model";
//// [aliases.d.ts]
export { Model as First, Model as Second } from "./model";
//// [preferred.d.ts]
export { Model, Model as Renamed } from "./model";
//// [star.d.ts]
export * from "./aliases";
//// [direct.d.ts]
export declare const direct: import("./model").Model;
export declare const repeated: import("./model").Model;
//// [renamed.d.ts]
import * as aliases from "./aliases";
export declare const renamed: aliases.First;
//// [sameName.d.ts]
import * as preferred from "./preferred";
export declare const sameName: preferred.Model;
//// [starred.d.ts]
import * as star from "./star";
export declare const starred: star.First;
//// [exported.d.ts]
import { Model } from "./model";
export = Model;
//// [exportEquals.d.ts]
import Model = require("./exported");
export declare const exportEquals: Model;
//// [index.d.ts]
export { direct, repeated } from "./direct";
export { renamed } from "./renamed";
export { sameName } from "./sameName";
export { starred } from "./starred";
export { exportEquals } from "./exportEquals";
