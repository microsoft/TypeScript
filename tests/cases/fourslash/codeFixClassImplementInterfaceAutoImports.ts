/// <reference path='fourslash.ts' />

// @Filename: types1.ts
////type A = {};
////export default A;

// @Filename: types2.ts
////export type B = {};
////export type C = {};
////export type D<T> = {};

// @Filename: interface.ts
////import A from './types1';
////import { B, C, D } from './types2';
////
////export interface Base {
////  a: Readonly<A> & { kind: "a"; };
////  b<T extends B = B>(p1: C): D<C>;
////}

// @Filename: index.ts
////import { Base } from './interface';
////
////export class C implements Base {[| |]}

goTo.file('index.ts');
verify.codeFix({
  description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "Base"],
  index: 1,
  newFileContent:
`import { Base } from './interface';
import A from './types1';
import { B, C, D } from './types2';

export class C implements Base {
    a: Readonly<A> & { kind: 'a'; };
    b<T extends B = B>(p1: C): D<C> {
        throw new Error('Method not implemented.');
    }
}`,
});
