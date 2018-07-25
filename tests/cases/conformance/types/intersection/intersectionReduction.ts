// @strict

declare const sym1: unique symbol;
declare const sym2: unique symbol;

type T1 = string & 'a';  // 'a'
type T2 = 'a' & string & 'b';  // 'a' & 'b'
type T3 = number & 10;  // 10
type T4 = 10 & number & 20;  // 10 & 20
type T5 = symbol & typeof sym1;  // typeof sym1
type T6 = typeof sym1 & symbol & typeof sym2;  // typeof sym1 & typeof sym2
type T7 = string & 'a' & number & 10 & symbol & typeof sym1;  // 'a' & 10 & typeof sym1

type T10 = string & ('a' | 'b');  // 'a' | 'b'
type T11 = (string | number) & ('a' | 10);  // 'a' | 10
