// @strict: true
// @noImplicitAny: true
// @lib: esnext
// @noEmit: true

const fn1 = () => {
  if (Math.random() > 0.5) {
    return fn1()
  }
  return 0
}
