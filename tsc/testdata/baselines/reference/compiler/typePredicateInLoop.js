//// [tests/cases/compiler/typePredicateInLoop.ts] ////

//// [typePredicateInLoop.ts]
// Repro from #12101

interface Type {
  type: number;
}

interface TypeExt extends Type {
  arr: Type[];
}

const guard = (arg: Type): arg is TypeExt => arg.type === 1;
const otherFunc = (arg1: Type, arg2: TypeExt): void => {};

export function y(arg: Type): void {
  if (guard(arg)) {
    for (const ITEM of arg.arr) {
      if (otherFunc(ITEM, arg)) {
      }
    }
  }
}

//// [typePredicateInLoop.js]
// Repro from #12101
const guard = (arg) => arg.type === 1;
const otherFunc = (arg1, arg2) => { };
export function y(arg) {
    if (guard(arg)) {
        for (const ITEM of arg.arr) {
            if (otherFunc(ITEM, arg)) {
            }
        }
    }
}
