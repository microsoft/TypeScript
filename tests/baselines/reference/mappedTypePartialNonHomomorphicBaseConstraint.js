//// [tests/cases/compiler/mappedTypePartialNonHomomorphicBaseConstraint.ts] ////

//// [mappedTypePartialNonHomomorphicBaseConstraint.ts]
export type Errors<D> = { readonly [K in keyof D | "base"]?: string[] };

class Model<D> {
  getErrors(): Errors<D> {
    return { base: ["some base error"] };
  }
}


//// [mappedTypePartialNonHomomorphicBaseConstraint.js]
class Model {
    getErrors() {
        return { base: ["some base error"] };
    }
}
export {};
