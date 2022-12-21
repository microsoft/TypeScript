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
var x = { type: "wat.nup" };
var val1 = x;
var y = [{ type: "a" }, { type: "b" }];
var val2 = y;
