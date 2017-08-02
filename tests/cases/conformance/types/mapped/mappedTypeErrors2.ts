// @strictNullChecks: true
// @declaration: true

type AB = {
    a: 'a'
    b: 'a'
}

type T1<K extends keyof AB> = { [key in AB[K]]: true }
type T2<K extends 'a'|'b'> = T1<K>[K] // BUG 1: should be error for K = 'b'

type R = AB[keyof AB]; // "a"
type T3 = { [key in R]: true }
type T4<K extends 'a'|'b'> = T3[K] // error as expected

// BUG 2: 'extra' not checked in AB[S]
type T5<S extends 'a'|'b'|'extra'> = {[key in AB[S]]: true}[S]

// Should still error, for L = 'b'
type T6<S extends 'a'|'b', L extends 'a'|'b'> = {[key in AB[S]]: true}[L]

// Should be OK
type T7<S extends 'a'|'b', L extends 'a'> = {[key in AB[S]]: true}[L]
