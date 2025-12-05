// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/56998

type Type = {
  id: number;
};

type InferenceInfo = {
  typeParameter: Type;
  impliedArity?: number;
};

declare function getInferenceInfoForType(type: Type): InferenceInfo | undefined;

function fn1(t1: Type, t2: Type) {
  let info = getInferenceInfoForType(t1);
  if (info?.impliedArity !== undefined) {
    info.impliedArity;
  } else if ((info = getInferenceInfoForType(t2))?.impliedArity !== undefined) {
    info.impliedArity;
  }
}

function fn2(t1: Type, t2: Type) {
  let info = getInferenceInfoForType(t1);
  if (info?.impliedArity !== undefined) {
    info.impliedArity;
  } else if ((info = getInferenceInfoForType(t2))?.impliedArity) {
    info.impliedArity;
  }
}

// https://github.com/microsoft/TypeScript/issues/60855

type Option = { type: "Some"; value: number } | { type: "None" };

declare function someOptionalOption(): Option | undefined;

function test60855(): number | undefined {
  let option: Option | undefined;

  if ((option = someOptionalOption())?.type === "Some") {
    return option.value;
  }

  return undefined;
}
