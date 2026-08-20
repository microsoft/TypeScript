//// [tests/cases/compiler/declarationEmitNoCrashOnCommentCopiedFromOtherFile.ts] ////

//// [export.ts]
/**
 * blah blah blah blah
 * blah blah blah blah
 * blah blah blah blah
 * blah blah blah blah
 * blah blah blah blah
 */

export function foo() {
  return (_item: unknown): _item is boolean => {
    return true;
  };
}
//// [import.ts]
import { foo } from './export';
export const x = foo();

//// [export.js]
/**
 * blah blah blah blah
 * blah blah blah blah
 * blah blah blah blah
 * blah blah blah blah
 * blah blah blah blah
 */
export function foo() {
    return (_item) => {
        return true;
    };
}
//// [import.js]
import { foo } from './export';
export const x = foo();


//// [export.d.ts]
/**
 * blah blah blah blah
 * blah blah blah blah
 * blah blah blah blah
 * blah blah blah blah
 * blah blah blah blah
 */
export declare function foo(): (_item: unknown) => _item is boolean;
//# sourceMappingURL=export.d.ts.map//// [import.d.ts]
export declare const x: (_item: unknown) => _item is boolean;
//# sourceMappingURL=import.d.ts.map