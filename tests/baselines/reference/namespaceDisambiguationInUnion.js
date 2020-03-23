//// [namespaceDisambiguationInUnion.ts]
namespace Foo {
  export type Yep = { type: "foo.yep" };
}

namespace Bar {
  export type Yep = { type: "bar.yep" };
}

const x = { type: "wat.nup" };
const val: Foo.Yep | Bar.Yep = x;


//// [namespaceDisambiguationInUnion.js]
var x = { type: "wat.nup" };
var val = x;
