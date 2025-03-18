//// [tests/cases/compiler/commentsAfterSpread.ts] ////

//// [commentsAfterSpread.ts]
const identity = (a) => a;

const a = {
  .../*#__PURE__*/identity({
    b: 1
  })
};

const b = {
  ...
  /*#__PURE__*/identity({
    b: 1
  })
};

const c = {
  ...
  /*#__PURE__*/
  identity({
    b: 1
  })
};

const d = {
  .../*#__PURE__*/
  identity({
    b: 1
  })
};

function e (.../* comment e */args) {
  const [ea, eb] = [.../* comment eab */args];
  return args.length;
}

function f (
  first,
  .../* comment f */rest
) {
  return rest.length;
}

function g (
  first,
  .../* comment g */
  rest
) {
  const [ga, gb] = [.../* comment gab */
    rest
  ]
  return rest.length;
}

const h = (.../* comment h */args) => args.length;

const i = (
  first, .../* comment i */rest
) => rest.length;

const j = (
  first,
  .../* comment j */
  rest
) => rest.length;

function k ({
  first,
  .../* comment k */rest
}) {
  const { ka, kb, .../* comment kr */remaining } = rest;
  const {
    kc,
    kd,
    .../* comment kr2 */
    remaining2
  } = rest;
  return { .../* comment return k */ remaining };
}

//// [commentsAfterSpread.js]
const identity = (a) => a;
const a = {
    ...identity({
        b: 1
    })
};
const b = {
    ...identity({
        b: 1
    })
};
const c = {
    ...identity({
        b: 1
    })
};
const d = {
    ...identity({
        b: 1
    })
};
function e(...args) {
    const [ea, eb] = [...args];
    return args.length;
}
function f(first, ...rest) {
    return rest.length;
}
function g(first, ...rest) {
    const [ga, gb] = [...rest
    ];
    return rest.length;
}
const h = (...args) => args.length;
const i = (first, ...rest) => rest.length;
const j = (first, ...rest) => rest.length;
function k({ first, ...rest }) {
    const { ka, kb, ...remaining } = rest;
    const { kc, kd, ...remaining2 } = rest;
    return { ...remaining };
}
