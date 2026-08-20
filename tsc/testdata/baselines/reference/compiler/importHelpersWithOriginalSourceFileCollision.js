//// [tests/cases/compiler/importHelpersWithOriginalSourceFileCollision.ts] ////

//// [index.ts]
declare const dec: ClassDecorator;
declare const value: string;

const template = `${value}`;
declare const __decorate: unknown;

@dec
export class C {}

//// [index.d.ts]
export declare function __decorate(decorators: Function[], target: Function): void;


//// [index.js]
import { __decorate as __decorate_1 } from "tslib";
const template = `${value}`;
let C = class C {
};
C = __decorate_1([
    dec
], C);
export { C };
