class C {
  test: string
}

class D extends C {
  test2: string
}

declare function test<T extends C>(a: (t: T, t1: T) => void): T

declare function testRest<T extends C>(a: (t: T, t1: T, ...ts: T[]) => void): T


// exactly
test((t1: D, t2) => { t2.test2 })
test((t1, t2: D) => { t2.test2 })

// zero arg
test(() => {})

// fewer args
test((t1: D) => {})

// rest arg
test((...ts: D[]) => {})

// source function has rest arg
testRest((t1: D) => {})
testRest((t1, t2, t3) => {})
testRest((t1: D, t2, t3) => {})
testRest((t1, t2: D, t3) => {})
testRest((t2: D, ...t3) => {})
testRest((t2, ...t3: D[]) => {})
