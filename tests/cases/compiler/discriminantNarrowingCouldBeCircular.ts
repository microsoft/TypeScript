// @strict: true
// @lib: es2022

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
