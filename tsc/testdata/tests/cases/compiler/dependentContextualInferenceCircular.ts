// GH #49618
declare const f:
  <T extends (v: ReturnType<T>) => unknown>(t: T) => ReturnType<T>

const x = f(x => ({ foo: 0 }))

const lol = f(lol => ({ get lol() { return lol } }))
lol.lol.lol.lol.lol.lol.lol.lol.lol.lol
