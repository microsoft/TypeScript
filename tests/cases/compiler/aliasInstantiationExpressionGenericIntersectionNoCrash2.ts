// @strict: true

declare class Class<T> {
  x: T;
}

declare function fn<T>(): T;


type ClassAlias<T> = typeof Class<T>;
type FnAlias<T> = typeof fn<T>;

type Wat<T> = ClassAlias<T> & FnAlias<T>;


declare const wat: Wat<number>;
wat as Wat<string>;
