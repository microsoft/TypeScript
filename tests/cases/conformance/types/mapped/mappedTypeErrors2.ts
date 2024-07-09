// @strictNullChecks: true
// @declaration: true

// Repros from #17238

type AB = {
    a: 'a'
    b: 'a'
};

type T1<K extends keyof AB> = { [key in AB[K]]: true };
type T2<K extends 'a'|'b'> = T1<K>[K]; // Error

type R = AB[keyof AB]; // "a"
type T3 = { [key in R]: true };
type T4<K extends 'a'|'b'> = T3[K] // Error

type T5<S extends 'a'|'b'|'extra'> = {[key in AB[S]]: true}[S]; // Error

type T6<S extends 'a'|'b', L extends 'a'|'b'> = {[key in AB[S]]: true}[L]; // Error

type T7<S extends 'a'|'b', L extends 'a'> = {[key in AB[S]]: true}[L];
