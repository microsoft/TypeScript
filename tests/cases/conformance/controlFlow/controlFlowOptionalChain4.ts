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
