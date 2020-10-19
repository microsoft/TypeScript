//// [spreadOfTupleArrayIntersection.ts]
type T1 = [...unknown[] & []];                  // []
type T2 = [...number[] & [1, 2, 3]];            // [1, 2, 3]
type T3 = [...[1, 2] & [2, 1]];                 // never
type T4 = [...number[] & ([1, 2] | [3, 4])];    // [1, 2] | [3, 4]
type T5 = [...number[] & ([1, 2] | [3, 4, 5])]; // [1, 2] | [3, 4, 5]
type T6 = [...number[] & { length: 3 }];        // number[]


//// [spreadOfTupleArrayIntersection.js]
