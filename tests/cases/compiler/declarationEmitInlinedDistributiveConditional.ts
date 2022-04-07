// @declaration: true
// @filename: test.ts
import {dropPrivateProps1, dropPrivateProps2} from './api';
const a = dropPrivateProps1({foo: 42, _bar: 'secret'}); // type is {foo: number}
//a._bar                                                // error: _bar does not exist           <===== as expected
const b = dropPrivateProps2({foo: 42, _bar: 'secret'}); // type is {foo: number, _bar: string}
//b._bar                                                // no error, type of b._bar is string   <===== NOT expected

// @filename: api.ts
import {excludePrivateKeys1, excludePrivateKeys2} from './internal';
export const dropPrivateProps1 = <Obj>(obj: Obj) => excludePrivateKeys1(obj);
export const dropPrivateProps2 = <Obj>(obj: Obj) => excludePrivateKeys2(obj);

// @filename: internal.ts
export declare function excludePrivateKeys1<Obj>(obj: Obj): {[K in PublicKeys1<keyof Obj>]: Obj[K]};
export declare function excludePrivateKeys2<Obj>(obj: Obj): {[K in PublicKeys2<keyof Obj>]: Obj[K]};
export type PublicKeys1<T> = T extends `_${string}` ? never : T;
type PublicKeys2<T>        = T extends `_${string}` ? never : T;