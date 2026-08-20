// @target: es2015
// @Filename: index.ts
class Test extends Array1 {
  [key: symbol]: string
}

// @Filename: other.ts
interface Array1<T> {
  length: number;
  [n: number]: T;
}

interface ArrayConstructor1 {
  new(arrayLength?: number): Array1<any>;
}

declare var Array1: ArrayConstructor1;

// iterable.d.ts
interface Array1<T> {
  [Symbol.iterator](): IterableIterator<T>;
}

// symbol.wellknown.d.ts
interface Array1<T> {
  /**
   * Returns an object whose properties have the value 'true'
   * when they will be absent when used in a 'with' statement.
   */
  [Symbol.unscopables](): {
      copyWithin: boolean;
      entries: boolean;
      fill: boolean;
      find: boolean;
      findIndex: boolean;
      keys: boolean;
      values: boolean;
  };
}
