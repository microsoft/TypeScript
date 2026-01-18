// @strict: true
// @target: esnext

// @filename: parseHeritageClauseEmptyObject1_1.ts
class C1 extends {} implements X {}
// @filename: parseHeritageClauseEmptyObject1_2.ts
class C2 extends {} extends X {}
// @filename: parseHeritageClauseEmptyObject1_3.ts
class C3 extends {}, {}
// @filename: parseHeritageClauseEmptyObject1_4.ts
class C4 extends {}! {}
// @filename: parseHeritageClauseEmptyObject1_5.ts
class C5 extends {}.Foo {}
// @filename: parseHeritageClauseEmptyObject1_6.ts
class C6 extends {}.Foo
// @filename: parseHeritageClauseEmptyObject1_7.ts
class C7 extends {}
