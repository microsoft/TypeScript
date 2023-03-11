/// <reference path="fourslash.ts" />

////export type A_Type = 'a' | 'b';
////
////const x: A_Typ/*a*/
////
////type B_Type = 'c' | 'd';
////
////const y: B_Typ/*b*/
////
////export interface C_Interface<T> {}
////
////const z: C_Inter/*c*/
////
////interface D_Interface<T> {}
////
////const a: D_Inter/*d*/
////
////export type E_Type<T> = T
////
////const b: E_Typ/*e*/
////
////type F_Type<T> = T
////
////const c: F_Typ/*f*/

verify.completions(
    {
        marker: 'a',
        includes: [
            {
                name: 'A_Type',
                text: 'type A_Type = "a" | "b"'
            }
        ]
    },
    {
        marker: 'b',
        includes: [
            {
                name: 'B_Type',
                text: 'type B_Type = "c" | "d"'
            }
        ]
    },
    {
        marker: 'c',
        includes: [
            {
                name: 'C_Interface',
                text: 'interface C_Interface'
            }
        ]
    },
    {
        marker: 'd',
        includes: [
            {
                name: 'D_Interface',
                text: 'interface D_Interface<T>'
            }
        ]
    },
    {
        marker: 'e',
        includes: [
            {
                name: 'E_Type',
                text: 'type E_Type<T> = T'
            }
        ]
    },
    {
        marker: 'f',
        includes: [
            {
                name: 'F_Type',
                text: 'type F_Type<T> = T'
            }
        ]
    }
)
