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

declare function f5<T1, T2>(
  arg: {
    [K in keyof T1]: {
      produce1: (n: string) => T1[K];
      consume1: (x: T1[K]) => void;
    };
  } & {
    [K in keyof T2]: {
      produce2: (n: string) => T2[K];
      consume2: (x: T2[K]) => void;
    };
  },
): [T1, T2];

const res9 = f5({
  a: {
    produce1: (n) => n,
    consume1: (x) => x.toLowerCase(),
    produce2: (n) => [n],
    consume2: (x) => x[0].toLowerCase(),
  },
  b: {
    produce1: (n) => ({ v: n }),
    consume1: (x) => x.v.toLowerCase(),
    produce2: (n) => ({ v: [n] }),
    consume2: (x) => x.v[0].toLowerCase(),
  },
});

declare function f6<T>(arg: {
  [K in keyof T]: () => {
    produce: (n: string) => T[K];
    consume: (x: T[K]) => void;
  };
}): T;

const res10 = f6({
  a() {
    return {
      produce: (n) => n,
      consume: (x) => x.toLowerCase(),
    };
  },
  b() {
    return {
      produce: (n) => ({ v: n }),
      consume: (x) => x.v.toLowerCase(),
    };
  },
});

const res11 = f6({
  a: () => {
    return {
      produce: (n) => n,
      consume: (x) => x.toLowerCase(),
    };
  },
  b: () => {
    return {
      produce: (n) => ({ v: n }),
      consume: (x) => x.v.toLowerCase(),
    };
  },
});

declare function f7<T>(arg: {
  [K in keyof T]: (arg: boolean) => {
    produce: (n: string) => T[K];
    consume: (x: T[K]) => void;
  };
}): T;

const res12 = f7({
  a(arg) {
    return {
      produce: (n) => n,
      consume: (x) => x.toLowerCase(),
    };
  },
  b(arg) {
    return {
      produce: (n) => ({ v: n }),
      consume: (x) => x.v.toLowerCase(),
    };
  },
});

const res13 = f7({
  a: (arg) => {
    return {
      produce: (n) => n,
      consume: (x) => x.toLowerCase(),
    };
  },
  b: (arg) => {
    return {
      produce: (n) => ({ v: n }),
      consume: (x) => x.v.toLowerCase(),
    };
  },
});

declare function f8<T>(arg: {
  [K in keyof T]: () => [(n: string) => T[K], (x: T[K]) => void];
}): T;

const res14 = f8({
  a() {
    return [(n) => n, (x) => x.toLowerCase()];
  },
  b() {
    return [(n) => ({ v: n }), (x) => x.v.toLowerCase()];
  },
});

declare function f9<T1, T2>(
  arg: {
    [K in keyof T1]: {
      produce: (n: string) => [T1[K], any];
      consume: (x: T1[K]) => void;
    };
  } & {
    a: {
      produce: (n: string) => [any, T2];
      consume2: (x: T2) => void;
    };
  },
): [T1, T2];

const res15 = f9({
  a: {
    produce: (n) => [n, [n]],
    consume2: (x) => x[0].toLowerCase(),
    consume: (x) => x.toLowerCase(),
  },
  b: {
    produce: (n) => [{ v: n }, null],
    consume: (x) => x.v.toLowerCase(),
  },
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
var res9 = f5({
    a: {
        produce1: function (n) { return n; },
        consume1: function (x) { return x.toLowerCase(); },
        produce2: function (n) { return [n]; },
        consume2: function (x) { return x[0].toLowerCase(); },
    },
    b: {
        produce1: function (n) { return ({ v: n }); },
        consume1: function (x) { return x.v.toLowerCase(); },
        produce2: function (n) { return ({ v: [n] }); },
        consume2: function (x) { return x.v[0].toLowerCase(); },
    },
});
var res10 = f6({
    a: function () {
        return {
            produce: function (n) { return n; },
            consume: function (x) { return x.toLowerCase(); },
        };
    },
    b: function () {
        return {
            produce: function (n) { return ({ v: n }); },
            consume: function (x) { return x.v.toLowerCase(); },
        };
    },
});
var res11 = f6({
    a: function () {
        return {
            produce: function (n) { return n; },
            consume: function (x) { return x.toLowerCase(); },
        };
    },
    b: function () {
        return {
            produce: function (n) { return ({ v: n }); },
            consume: function (x) { return x.v.toLowerCase(); },
        };
    },
});
var res12 = f7({
    a: function (arg) {
        return {
            produce: function (n) { return n; },
            consume: function (x) { return x.toLowerCase(); },
        };
    },
    b: function (arg) {
        return {
            produce: function (n) { return ({ v: n }); },
            consume: function (x) { return x.v.toLowerCase(); },
        };
    },
});
var res13 = f7({
    a: function (arg) {
        return {
            produce: function (n) { return n; },
            consume: function (x) { return x.toLowerCase(); },
        };
    },
    b: function (arg) {
        return {
            produce: function (n) { return ({ v: n }); },
            consume: function (x) { return x.v.toLowerCase(); },
        };
    },
});
var res14 = f8({
    a: function () {
        return [function (n) { return n; }, function (x) { return x.toLowerCase(); }];
    },
    b: function () {
        return [function (n) { return ({ v: n }); }, function (x) { return x.v.toLowerCase(); }];
    },
});
var res15 = f9({
    a: {
        produce: function (n) { return [n, [n]]; },
        consume2: function (x) { return x[0].toLowerCase(); },
        consume: function (x) { return x.toLowerCase(); },
    },
    b: {
        produce: function (n) { return [{ v: n }, null]; },
        consume: function (x) { return x.v.toLowerCase(); },
    },
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
declare function f5<T1, T2>(arg: {
    [K in keyof T1]: {
        produce1: (n: string) => T1[K];
        consume1: (x: T1[K]) => void;
    };
} & {
    [K in keyof T2]: {
        produce2: (n: string) => T2[K];
        consume2: (x: T2[K]) => void;
    };
}): [T1, T2];
declare const res9: [{
    a: string;
    b: {
        v: string;
    };
}, {
    a: string[];
    b: {
        v: string[];
    };
}];
declare function f6<T>(arg: {
    [K in keyof T]: () => {
        produce: (n: string) => T[K];
        consume: (x: T[K]) => void;
    };
}): T;
declare const res10: {
    a: string;
    b: {
        v: string;
    };
};
declare const res11: {
    a: string;
    b: {
        v: string;
    };
};
declare function f7<T>(arg: {
    [K in keyof T]: (arg: boolean) => {
        produce: (n: string) => T[K];
        consume: (x: T[K]) => void;
    };
}): T;
declare const res12: {
    a: string;
    b: {
        v: string;
    };
};
declare const res13: {
    a: string;
    b: {
        v: string;
    };
};
declare function f8<T>(arg: {
    [K in keyof T]: () => [(n: string) => T[K], (x: T[K]) => void];
}): T;
declare const res14: {
    a: string;
    b: {
        v: string;
    };
};
declare function f9<T1, T2>(arg: {
    [K in keyof T1]: {
        produce: (n: string) => [T1[K], any];
        consume: (x: T1[K]) => void;
    };
} & {
    a: {
        produce: (n: string) => [any, T2];
        consume2: (x: T2) => void;
    };
}): [T1, T2];
declare const res15: [{
    a: string;
    b: {
        v: string;
    };
}, string[]];
