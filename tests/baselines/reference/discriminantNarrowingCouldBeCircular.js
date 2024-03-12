//// [tests/cases/compiler/discriminantNarrowingCouldBeCircular.ts] ////

//// [discriminantNarrowingCouldBeCircular.ts]
// #57705, 57690
declare function is<T>(v: T): v is T;
const o: Record<string, string> | undefined = {};
if (o) {
  for (const key in o) {
    const value = o[key];
    if (is<string>(value)) {
    }
  }
}

declare const kPresentationInheritanceParents: { [tagName: string]: string[] };
declare function parentElementOrShadowHost(element: Element): Element | undefined;

function getImplicitAriaRole(element: Element) {
  let ancestor: Element | null = element;
  while (ancestor) {
    const parent = parentElementOrShadowHost(ancestor);
    const parents = kPresentationInheritanceParents[ancestor.tagName];
    if (!parents || !parent || !parents.includes(parent.tagName))
      break;
    ancestor = parent;
  }
}

declare function isPlainObject2<T>(
    data: unknown,
  ): data is Record<PropertyKey, unknown>;
  
  declare const myObj2: unknown;
  if (isPlainObject2(myObj2)) {
      for (const key of ["a", "b", "c"]) {
        const deeper = myObj2[key];
        const deeperKeys = isPlainObject2(deeper) ? Object.keys(deeper) : [];
      }
  }


//// [discriminantNarrowingCouldBeCircular.js]
"use strict";
var o = {};
if (o) {
    for (var key in o) {
        var value = o[key];
        if (is(value)) {
        }
    }
}
function getImplicitAriaRole(element) {
    var ancestor = element;
    while (ancestor) {
        var parent = parentElementOrShadowHost(ancestor);
        var parents = kPresentationInheritanceParents[ancestor.tagName];
        if (!parents || !parent || !parents.includes(parent.tagName))
            break;
        ancestor = parent;
    }
}
if (isPlainObject2(myObj2)) {
    for (var _i = 0, _a = ["a", "b", "c"]; _i < _a.length; _i++) {
        var key = _a[_i];
        var deeper = myObj2[key];
        var deeperKeys = isPlainObject2(deeper) ? Object.keys(deeper) : [];
    }
}
