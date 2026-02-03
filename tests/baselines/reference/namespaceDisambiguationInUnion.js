//// [tests/cases/compiler/namespaceDisambiguationInUnion.ts] ////

//// [namespaceDisambiguationInUnion.ts]
namespace Foo {
  export type Yep = { type: "foo.yep" };
}

namespace Bar {
  export type Yep = { type: "bar.yep" };
}

const x = { type: "wat.nup" };
const val1: Foo.Yep | Bar.Yep = x;

const y = [{ type: "a" }, { type: "b" }];
const val2: [Foo.Yep, Bar.Yep] = y;


//// [namespaceDisambiguationInUnion.js]
const x = { type: "wat.nup" };
const val1 = x;
const y = [{ type: "a" }, { type: "b" }];
const val2 = y;
