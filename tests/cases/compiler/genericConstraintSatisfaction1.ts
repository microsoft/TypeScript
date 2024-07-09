interface I<S> {
   f: <T extends S>(x: T) => void
}
 
var x: I<{s: string}>
x.f({s: 1})
