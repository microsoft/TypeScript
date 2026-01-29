//// [tests/cases/conformance/declarationEmit/typeofImportTypeOnlyExport.ts] ////

//// [button.ts]
import {classMap} from './lit.js';
export const c = classMap();

//// [lit.ts]
class ClassMapDirective {}

export type {ClassMapDirective};

export const directive =
  <C>(class_: C) =>
  () => ({
    directive: class_,
  });

export const classMap = directive(ClassMapDirective);


//// [lit.js]
class ClassMapDirective {
}
export const directive = (class_) => () => ({
    directive: class_,
});
export const classMap = directive(ClassMapDirective);
//// [button.js]
import { classMap } from './lit.js';
export const c = classMap();


//// [lit.d.ts]
declare class ClassMapDirective {
}
export type { ClassMapDirective };
export declare const directive: <C>(class_: C) => () => {
    directive: C;
};
export declare const classMap: () => {
    directive: typeof ClassMapDirective;
};
//// [button.d.ts]
export declare const c: {
    directive: typeof import("./lit.js").ClassMapDirective;
};
