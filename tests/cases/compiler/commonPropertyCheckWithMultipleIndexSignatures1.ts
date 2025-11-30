// @strict: true
// @noEmit: true

interface ITopType {
  tKey?: string;
}

interface ISubType extends ITopType {
  sKey?: string;
}

interface ITestInteface {
  [pA: string]: ITopType;
  [pB: number]: ISubType;
}

const testObj1: ITestInteface = {
  a: { tKey: "tVal" },
  1: { tKey: "tVal", sKey: "sVal" },
};

const testObj1_2: ITestInteface = {
  a: { tKey: "tVal" },
  1: { notCommon: "val3" },
};

interface ITopType_2 {
  tKey_2?: string;
}

interface ISubType_2 extends ITopType_2 {
  sKey_2?: string;
}

interface ITestInteface_2 {
  [pA_2: string]: ITopType_2;
  [pB_2: `sub_${string}`]: ISubType_2;
}

const testObj2: ITestInteface_2 = {
  a: { tKey_2: "tVal_2 " },
  sub_b: { tKey_2: "tVal_2 ", sKey_2: "sVal_2" },
};

const testObj2_2: ITestInteface_2 = {
  a: { tKey_2: "tVal_2 " },
  sub_b: { notCommon: "val3" },
};
