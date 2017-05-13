class Foo3 {
  // Doesn't work, but should
  constructor (public ...args: string[]) { }
}