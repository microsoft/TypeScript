//// [declarationTypeWithComputedName.ts] ////
import {Foo} from './a';

export type Bar = {
  [Foo.A]: 1;
  [Foo.B]: 2;
}

export const valBar = null as any as {
    [Foo.A]: 1;
    [Foo.B]: 2;
};
//// [declarationTypeWithComputedName.d.ts] ////
import { Foo } from './a';
export type Bar = {
    [Foo.A]: 1;
    [Foo.B]: 2;
};
export declare const valBar: {
    [Foo.A]: 1;
    [Foo.B]: 2;
};
