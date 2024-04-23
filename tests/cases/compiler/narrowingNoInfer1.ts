// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/58266

type TaggedA = { _tag: "a" };
type TaggedB = { _tag: "b" };

type TaggedUnion = TaggedA | TaggedB;

const m: { result: NoInfer<TaggedUnion> }[] = [];

function map<A, B>(items: readonly A[], f: (a: NoInfer<A>) => B) {
  return items.map(f);
}

const something = map(m, (_) =>
  _.result._tag === "a" ? { ..._, result: _.result } : null,
);
