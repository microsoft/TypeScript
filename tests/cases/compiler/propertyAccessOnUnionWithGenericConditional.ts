type InCommon = { common: string };

type CondWithAny<K extends string | number> =
  K extends number ? any : { two: string };

type UnionWithAny<K extends string | number> =
  InCommon | (CondWithAny<K> & InCommon);

function testWithAny<K extends string | number>(k: K) {
  const val = {} as UnionWithAny<K>;
  val.common;
}