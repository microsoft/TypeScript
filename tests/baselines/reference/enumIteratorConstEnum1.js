//// [enumIteratorConstEnum1.ts]
const enum ConstTest {
  Foo,
  Bar,
  Baz,
}

// Should be an error.
for (const member of ConstTest) {
}


//// [enumIteratorConstEnum1.js]
// Should be an error.
for (const member of ConstTest) {
}
