// @declaration: true
// @emitDeclarationOnly: true
// @strict: true
// @module: commonjs
// @target: esnext

// @filename: model.ts
export interface Model { value: string; }
export function make(): Model { return { value: "" }; }

// @filename: factory.ts
export { make } from "./model";

// @filename: aliases.ts
export { Model as First, Model as Second } from "./model";

// @filename: preferred.ts
export { Model, Model as Renamed } from "./model";

// @filename: star.ts
export * from "./aliases";

// @filename: direct.ts
import { make } from "./factory";
export const direct = make();
export const repeated = make();

// @filename: renamed.ts
import { make } from "./factory";
import * as aliases from "./aliases";
export const renamed = make();

// @filename: sameName.ts
import { make } from "./factory";
import * as preferred from "./preferred";
export const sameName = make();

// @filename: starred.ts
import { make } from "./factory";
import * as star from "./star";
export const starred = make();

// @filename: exported.ts
import { Model } from "./model";
export = Model;

// @filename: exportEquals.ts
import { make } from "./factory";
import Model = require("./exported");
export const exportEquals = make();

// @filename: index.ts
export { direct, repeated } from "./direct";
export { renamed } from "./renamed";
export { sameName } from "./sameName";
export { starred } from "./starred";
export { exportEquals } from "./exportEquals";
