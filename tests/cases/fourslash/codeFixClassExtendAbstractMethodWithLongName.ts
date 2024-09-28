/// <reference path='fourslash.ts' />

////namespace some.really.long.generated.type.goes.here.you.know.this_.should.be.pretty.simple {
////  export interface Yah {}
////}
////namespace another.really.long.generated.type.goes.here.too.because.who.cares.about.space.do_.you.feel.me {
////  export interface Yah {}
////}
////interface this_will_be_collapsed {}
////interface this_is_fine {}
////abstract class AbstractCstVisitor {
////  abstract Node(
////    arg1: [
////      some.really.long.generated.type.goes.here.you.know.this_.should.be.pretty.simple.Yah[],
////      another.really.long.generated.type.goes.here.too.because.who.cares.about.space.do_.you.feel.me.Yah[]
////    ],
////    arg2: [this_will_be_collapsed],
////    arg3: Set<this_will_be_collapsed>,
////    arg4: this_is_fine
////  ): Set<this_will_be_collapsed>;
////}
////class CstVisitorImplementation extends AbstractCstVisitor {}

verify.codeFix({
  description: "Implement inherited abstract class",
  newFileContent: `namespace some.really.long.generated.type.goes.here.you.know.this_.should.be.pretty.simple {
  export interface Yah {}
}
namespace another.really.long.generated.type.goes.here.too.because.who.cares.about.space.do_.you.feel.me {
  export interface Yah {}
}
interface this_will_be_collapsed {}
interface this_is_fine {}
abstract class AbstractCstVisitor {
  abstract Node(
    arg1: [
      some.really.long.generated.type.goes.here.you.know.this_.should.be.pretty.simple.Yah[],
      another.really.long.generated.type.goes.here.too.because.who.cares.about.space.do_.you.feel.me.Yah[]
    ],
    arg2: [this_will_be_collapsed],
    arg3: Set<this_will_be_collapsed>,
    arg4: this_is_fine
  ): Set<this_will_be_collapsed>;
}
class CstVisitorImplementation extends AbstractCstVisitor {
    Node(arg1: [
        some.really.long.generated.type.goes.here.you.know.this_.should.be.pretty.simple.Yah[],
        another.really.long.generated.type.goes.here.too.because.who.cares.about.space.do_.you.feel.me.Yah[]
    ], arg2: [this_will_be_collapsed], arg3: Set<this_will_be_collapsed>, arg4: this_is_fine) {
        throw new Error("Method not implemented.");
    }
}`
});
