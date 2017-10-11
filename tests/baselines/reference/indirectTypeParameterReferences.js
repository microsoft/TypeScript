//// [indirectTypeParameterReferences.ts]
// Repro from #19043

type B = {b: string}

const flowtypes = <A>(b: B) => {
  type Combined = A & B

  const combined = (fn: (combined: Combined) => void) => null
  const literal = (fn: (aPlusB: A & B) => void) => null

  return {combined, literal}
}

const {combined, literal} = flowtypes<{a: string}>({b: 'b-value'})

literal(aPlusB => {
  aPlusB.b
  aPlusB.a
})

combined(comb => {
  comb.b
  comb.a
})


//// [indirectTypeParameterReferences.js]
// Repro from #19043
var flowtypes = function (b) {
    var combined = function (fn) { return null; };
    var literal = function (fn) { return null; };
    return { combined: combined, literal: literal };
};
var _a = flowtypes({ b: 'b-value' }), combined = _a.combined, literal = _a.literal;
literal(function (aPlusB) {
    aPlusB.b;
    aPlusB.a;
});
combined(function (comb) {
    comb.b;
    comb.a;
});
