// @declaration: true

type ExpandRecursively<T> = {} & {
  [P in keyof T]: T[P]
}

type G<T = string> = {
  get readonlyProperty(): T;
  field: T;
  method(p: T): T;
  fnField: (p: T) => T;
  set writeOnlyProperty(p: T);
  get property(): T;
  set property(p: T);
  get divergentProperty(): string | T;
  set divergentProperty(p: number | T);
};

export const x = (() => null! as ExpandRecursively<G>)();


function makeV() {
  type X<T> = {
    get readonlyProperty(): T;
    field: T;
    method(p: T): T;
    fnField: (p: T) => T;
    set writeOnlyProperty(p: T);
    get property(): T;
    set property(p: T);
    get divergentProperty(): string | T;
    set divergentProperty(p: number | T);
   }
  return null! as X<number>
}

export const v = makeV();
