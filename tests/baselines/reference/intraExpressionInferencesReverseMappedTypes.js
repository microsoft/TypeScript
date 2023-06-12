//// [tests/cases/conformance/types/typeRelationships/typeInference/intraExpressionInferencesReverseMappedTypes.ts] ////

//// [intraExpressionInferencesReverseMappedTypes.ts]
// repro cases based on https://github.com/microsoft/TypeScript/issues/53018

declare function f<T>(
  arg: {
    [K in keyof T]: {
      produce: (n: string) => T[K];
      consume: (x: T[K]) => void;
    };
  }
): T;

const res1 = f({
  a: {
    produce: (n) => n,
    consume: (x) => x.toLowerCase(),
  },
  b: {
    produce: (n) => ({ v: n }),
    consume: (x) => x.v.toLowerCase(),
  },
});

const res2 = f({
  a: {
    produce: function () {
      return "hello";
    },
    consume: (x) => x.toLowerCase(),
  },
  b: {
    produce: function () {
      return { v: "hello" };
    },
    consume: (x) => x.v.toLowerCase(),
  },
});

const res3 = f({
  a: {
    produce() {
      return "hello";
    },
    consume: (x) => x.toLowerCase(),
  },
  b: {
    produce() {
      return { v: "hello" };
    },
    consume: (x) => x.v.toLowerCase(),
  },
});

declare function f2<T extends unknown[]>(
  arg: [
    ...{
      [K in keyof T]: {
        produce: (n: string) => T[K];
        consume: (x: T[K]) => void;
      };
    }
  ]
): T;

const res4 = f2([
  {
    produce: (n) => n,
    consume: (x) => x.toLowerCase(),
  },
  {
    produce: (n) => ({ v: n }),
    consume: (x) => x.v.toLowerCase(),
  },
]);

const res5 = f2([
  {
    produce: function () {
      return "hello";
    },
    consume: (x) => x.toLowerCase(),
  },
  {
    produce: function () {
      return { v: "hello" };
    },
    consume: (x) => x.v.toLowerCase(),
  },
]);

const res6 = f2([
  {
    produce() {
      return "hello";
    },
    consume: (x) => x.toLowerCase(),
  },
  {
    produce() {
      return { v: "hello" };
    },
    consume: (x) => x.v.toLowerCase(),
  },
]);

declare function f3<T>(
  arg: {
    [K in keyof T]: {
      other: number,
      produce: (n: string) => T[K];
      consume: (x: T[K]) => void;
    };
  }
): T;

const res7 = f3({
  a: {
    other: 42,
    produce: (n) => n,
    consume: (x) => x.toLowerCase(),
  },
  b: {
    other: 100,
    produce: (n) => ({ v: n }),
    consume: (x) => x.v.toLowerCase(),
  },
});

declare function f4<T>(
  arg: {
    [K in keyof T]: [
      (n: string) => T[K],
      (x: T[K]) => void
    ];
  }
): T;

const res8 = f4({
  a: [
    (n) => n,
    (x) => x.toLowerCase(),
  ],
  b: [
    (n) => ({ v: n }),
    (x) => x.v.toLowerCase(),
  ],
});


//// [intraExpressionInferencesReverseMappedTypes.js]
"use strict";
// repro cases based on https://github.com/microsoft/TypeScript/issues/53018
var res1 = f({
    a: {
        produce: function (n) { return n; },
        consume: function (x) { return x.toLowerCase(); },
    },
    b: {
        produce: function (n) { return ({ v: n }); },
        consume: function (x) { return x.v.toLowerCase(); },
    },
});
var res2 = f({
    a: {
        produce: function () {
            return "hello";
        },
        consume: function (x) { return x.toLowerCase(); },
    },
    b: {
        produce: function () {
            return { v: "hello" };
        },
        consume: function (x) { return x.v.toLowerCase(); },
    },
});
var res3 = f({
    a: {
        produce: function () {
            return "hello";
        },
        consume: function (x) { return x.toLowerCase(); },
    },
    b: {
        produce: function () {
            return { v: "hello" };
        },
        consume: function (x) { return x.v.toLowerCase(); },
    },
});
var res4 = f2([
    {
        produce: function (n) { return n; },
        consume: function (x) { return x.toLowerCase(); },
    },
    {
        produce: function (n) { return ({ v: n }); },
        consume: function (x) { return x.v.toLowerCase(); },
    },
]);
var res5 = f2([
    {
        produce: function () {
            return "hello";
        },
        consume: function (x) { return x.toLowerCase(); },
    },
    {
        produce: function () {
            return { v: "hello" };
        },
        consume: function (x) { return x.v.toLowerCase(); },
    },
]);
var res6 = f2([
    {
        produce: function () {
            return "hello";
        },
        consume: function (x) { return x.toLowerCase(); },
    },
    {
        produce: function () {
            return { v: "hello" };
        },
        consume: function (x) { return x.v.toLowerCase(); },
    },
]);
var res7 = f3({
    a: {
        other: 42,
        produce: function (n) { return n; },
        consume: function (x) { return x.toLowerCase(); },
    },
    b: {
        other: 100,
        produce: function (n) { return ({ v: n }); },
        consume: function (x) { return x.v.toLowerCase(); },
    },
});
var res8 = f4({
    a: [
        function (n) { return n; },
        function (x) { return x.toLowerCase(); },
    ],
    b: [
        function (n) { return ({ v: n }); },
        function (x) { return x.v.toLowerCase(); },
    ],
});


//// [intraExpressionInferencesReverseMappedTypes.d.ts]
declare function f<T>(arg: {
    [K in keyof T]: {
        produce: (n: string) => T[K];
        consume: (x: T[K]) => void;
    };
}): T;
declare const res1: {
    a: string;
    b: {
        v: string;
    };
};
declare const res2: {
    a: string;
    b: {
        v: string;
    };
};
declare const res3: {
    a: string;
    b: {
        v: string;
    };
};
declare function f2<T extends unknown[]>(arg: [
    ...{
        [K in keyof T]: {
            produce: (n: string) => T[K];
            consume: (x: T[K]) => void;
        };
    }
]): T;
declare const res4: [string, {
    v: string;
}];
declare const res5: [string, {
    v: string;
}];
declare const res6: [string, {
    v: string;
}];
declare function f3<T>(arg: {
    [K in keyof T]: {
        other: number;
        produce: (n: string) => T[K];
        consume: (x: T[K]) => void;
    };
}): T;
declare const res7: {
    a: string;
    b: {
        v: string;
    };
};
declare function f4<T>(arg: {
    [K in keyof T]: [
        (n: string) => T[K],
        (x: T[K]) => void
    ];
}): T;
declare const res8: {
    a: string;
    b: {
        v: string;
    };
};
