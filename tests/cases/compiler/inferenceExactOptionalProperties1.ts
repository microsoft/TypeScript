// @strict: true
// @exactOptionalPropertyTypes: true
// @noEmit: true

type Test1 = { prop?: never } extends { prop?: infer T } ? T : false; // never
