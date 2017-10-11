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
