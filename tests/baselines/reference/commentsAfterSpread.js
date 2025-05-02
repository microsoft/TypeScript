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
    ... /*#__PURE__*/identity({
        b: 1
    })
};
const b = {
    ...
    /*#__PURE__*/ identity({
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
    ... /*#__PURE__*/identity({
        b: 1
    })
};
function e(... /* comment e */args) {
    const [ea, eb] = [... /* comment eab */args];
    return args.length;
}
function f(first, ... /* comment f */rest) {
    return rest.length;
}
function g(first, ... /* comment g */rest) {
    const [ga, gb] = [... /* comment gab */rest
    ];
    return rest.length;
}
const h = (... /* comment h */args) => args.length;
const i = (first, ... /* comment i */rest) => rest.length;
const j = (first, ... /* comment j */rest) => rest.length;
function k({ first, ... /* comment k */rest }) {
    const { ka, kb, ... /* comment kr */remaining } = rest;
    const { kc, kd, ... /* comment kr2 */remaining2 } = rest;
    return { ... /* comment return k */remaining };
}
