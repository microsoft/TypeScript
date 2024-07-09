class C {
  test: string
}

class D extends C {
  test2: string
}

declare function testError<T extends C>(a: (t: T, t1: T) => void): T

// more args
testError((t1: D, t2, t3) => {})
testError((t1, t2: D, t3) => {})
testError((t1, t2, t3: D) => {})
