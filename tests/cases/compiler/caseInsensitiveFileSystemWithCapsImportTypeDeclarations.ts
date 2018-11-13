// @declaration: true
// @useCaseSensitiveFileNames: false
// @filename: Uppercased_Dir/src/index.ts
import { TypeB } from './type-b';

export class Broken {
    method () {
        return { } as TypeB;
    }
}
// @filename: Uppercased_Dir/src/type-b.ts
import { Merge } from './types';
import { TypeA } from './type-a';

export type TypeB = Merge<TypeA, {
    b: string;
}>;
// @filename: Uppercased_Dir/src/type-a.ts
export type TypeA = {
    a: string;
}
// @filename: Uppercased_Dir/src/types.ts
export type Merge<T, U> = T & U;
