// @module: amd
// @preserveConstEnums: true
// @baseUrl: /proj
// @ignoreDeprecations: 6.0
// @filename: /proj/defs/cc.ts
export const enum CharCode {
    A,
    B
}
// @filename: /proj/component/file.ts

import { CharCode } from 'defs/cc';
export class User {
    method(input: number) {
        if (CharCode.A === input) {}
    }
}
