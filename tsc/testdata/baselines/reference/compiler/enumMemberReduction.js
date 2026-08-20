//// [tests/cases/compiler/enumMemberReduction.ts] ////

//// [enumMemberReduction.ts]
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


//// [enumMemberReduction.js]
var MyEnum;
(function (MyEnum) {
    MyEnum[MyEnum["A"] = 0] = "A";
    MyEnum[MyEnum["B"] = 1] = "B";
    MyEnum[MyEnum["C"] = 2] = "C";
})(MyEnum || (MyEnum = {}));
var MyStringEnum;
(function (MyStringEnum) {
    MyStringEnum["A"] = "a";
    MyStringEnum["B"] = "b";
    MyStringEnum["C"] = "c";
})(MyStringEnum || (MyStringEnum = {}));
var MyStringEnumWithEmpty;
(function (MyStringEnumWithEmpty) {
    MyStringEnumWithEmpty["A"] = "";
    MyStringEnumWithEmpty["B"] = "b";
    MyStringEnumWithEmpty["C"] = "c";
})(MyStringEnumWithEmpty || (MyStringEnumWithEmpty = {}));
export function fn(optionalEnum) {
    return optionalEnum !== null && optionalEnum !== void 0 ? optionalEnum : MyEnum.A;
}
export function fn2(optionalEnum) {
    return optionalEnum || MyEnum.B;
}
export function fn3(optionalEnum) {
    return optionalEnum !== null && optionalEnum !== void 0 ? optionalEnum : MyEnum.A;
}
export function fn4(optionalEnum) {
    return optionalEnum || MyEnum.B;
}
export function fn5(optionalEnum) {
    return optionalEnum || MyStringEnum.B;
}
export function fn6(optionalEnum) {
    return optionalEnum || MyStringEnumWithEmpty.B;
}
