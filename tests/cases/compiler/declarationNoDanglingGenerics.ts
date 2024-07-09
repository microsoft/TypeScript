// @declaration: true
const kindCache: { [kind: string]: boolean } = {};

function register(kind: string): void | never {
  if (kindCache[kind]) {
    throw new Error(`Class with kind "${kind}" is already registered.`);
  }
  kindCache[kind] = true;
}

function ClassFactory<TKind extends string>(kind: TKind) {
  register(kind);

  return class {
    static readonly THE_KIND: TKind = kind;
    readonly kind: TKind = kind;
  };
}

class Kinds {
  static readonly A = "A";
  static readonly B = "B";
  static readonly C = "C";
}

export class AKind extends ClassFactory(Kinds.A) {
}

export class BKind extends ClassFactory(Kinds.B) {
}

export class CKind extends ClassFactory(Kinds.C) {
}