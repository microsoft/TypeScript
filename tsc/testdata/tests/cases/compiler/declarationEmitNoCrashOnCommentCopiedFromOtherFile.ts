// @target: es2017
// @declaration: true
// @declarationMap: true
// @strict: true
// @esModuleInterop: true
// @filename: export.ts
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
//@filename: import.ts
import { foo } from './export';
export const x = foo();