enum MyEnum {
  A,
  B,
  C,
}

enum MyStringEnum {
  A = "a",
  B = "b",
  C = "c",
}

enum MyStringEnumWithEmpty {
  A = "",
  B = "b",
  C = "c",
}

export function fn(optionalEnum: MyEnum | undefined) {
  return optionalEnum ?? MyEnum.A;
}

export function fn2(optionalEnum: MyEnum | undefined) {
  return optionalEnum || MyEnum.B;
}

export function fn3(optionalEnum?: MyEnum) {
  return optionalEnum ?? MyEnum.A;
}

export function fn4(optionalEnum?: MyEnum) {
  return optionalEnum || MyEnum.B;
}

export function fn5(optionalEnum?: MyStringEnum) {
  return optionalEnum || MyStringEnum.B;
}

export function fn6(optionalEnum?: MyStringEnumWithEmpty) {
  return optionalEnum || MyStringEnumWithEmpty.B;
}
