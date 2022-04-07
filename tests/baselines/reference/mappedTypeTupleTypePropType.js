//// [mappedTypeTupleTypePropType.ts]
type Indices<T extends Array<any>> = {
  [K in keyof T]: K
};

// should contain numbers
type MyIndices = Indices<[string, number]>;
// union of indices should be preserved
type StillMyIndices = MyIndices[number] & number

// simplified repro from https://twitter.com/oleg008/status/1508422774401949704

type Container<V> = {
  value: V;
};

type UnwrapContainers<T extends Container<unknown>[]> = {
  [K in keyof T]: T[K & number]["value"];
};

declare function combine<T extends Container<unknown>[]>(
  containers: [...T],
  callback: (...values: UnwrapContainers<T>) => void
): void;

declare const container1: Container<string>;
declare const container2: Container<number>;

combine([container1, container2], (value1, value2) => {
  const val1: string = value1;
  const val2: number = value2;
});



//// [mappedTypeTupleTypePropType.js]
combine([container1, container2], function (value1, value2) {
    var val1 = value1;
    var val2 = value2;
});
