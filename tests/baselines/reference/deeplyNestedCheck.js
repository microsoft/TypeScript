//// [tests/cases/compiler/deeplyNestedCheck.ts] ////

//// [deeplyNestedCheck.ts]
// Repro from #14794

interface DataSnapshot<X = {}> {
  child(path: string): DataSnapshot;
}

interface Snapshot<T> extends DataSnapshot {
  child<U extends Extract<keyof T, string>>(path: U): Snapshot<T[U]>;
}

// Repro from 34619

interface A { b: B[] }
interface B { c: C }
interface C { d: D[] }
interface D { e: E[] }
interface E { f: F[] }
interface F { g: G }
interface G { h: H[] }
interface H { i: string }

const x: A = {
  b: [
    {
      c: {
        d: [
          {
            e: [
              {
                f: [
                  {
                    g: {
                      h: [
                        {
                          // i: '',
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  ],
};

// Repro from 34619

const a1: string[][][][][] = [[[[[42]]]]];
const a2: string[][][][][][][][][][] = [[[[[[[[[[42]]]]]]]]]];


//// [deeplyNestedCheck.js]
// Repro from #14794
var x = {
    b: [
        {
            c: {
                d: [
                    {
                        e: [
                            {
                                f: [
                                    {
                                        g: {
                                            h: [
                                                {
                                                // i: '',
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        },
    ],
};
// Repro from 34619
var a1 = [[[[[42]]]]];
var a2 = [[[[[[[[[[42]]]]]]]]]];
