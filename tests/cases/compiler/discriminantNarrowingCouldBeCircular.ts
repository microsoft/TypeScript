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

type SomeRecord = { a: string };
declare const kPresentationInheritanceParents: { [tagName: string]: string[] };
declare function parentElementOrShadowHost(element: SomeRecord): SomeRecord | undefined;

function getImplicitAriaRole(element: SomeRecord) {
  let ancestor: SomeRecord | null = element;
  while (ancestor) {
    const parent = parentElementOrShadowHost(ancestor);
    const parents = kPresentationInheritanceParents[ancestor.a];
    if (!parents || !parent || !parents.includes(parent.a))
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
