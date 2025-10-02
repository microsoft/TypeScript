//// [tests/cases/conformance/expressions/nullishCoalescingOperator/nullishCoalescingAssignmentVsPrivateFieldsJsEmit1.ts] ////

//// [nullishCoalescingAssignmentVsPrivateFieldsJsEmit1.ts]
// https://github.com/microsoft/TypeScript/issues/61109

class Cls {
  #privateProp: number | undefined;

  problem() {
    this.#privateProp ??= false ? neverThis() : 20;
  }
}

function neverThis(): never {
  throw new Error("This should really really never happen!");
}


//// [nullishCoalescingAssignmentVsPrivateFieldsJsEmit1.js]
// https://github.com/microsoft/TypeScript/issues/61109
class Cls {
    #privateProp;
    problem() {
        this.#privateProp ??= false ? neverThis() : 20;
    }
}
function neverThis() {
    throw new Error("This should really really never happen!");
}
