// @strict: true

// Repro from #33823

interface TestGeneric<TG> {
  f: string
  g: TG
}

const removeF = <TX>({ f, ...rest }: TestGeneric<TX>) => {
  return rest
}

const result: number = removeF<number>({ f: '', g: 3 }).g
