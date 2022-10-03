//// [parserIndexSignature4.ts]
interface I {
  [a = 0] // Used to be indexer, now it is a computed property
}

//// [parserIndexSignature4.js]
