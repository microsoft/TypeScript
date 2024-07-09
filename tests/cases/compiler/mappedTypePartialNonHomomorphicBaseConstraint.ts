export type Errors<D> = { readonly [K in keyof D | "base"]?: string[] };

class Model<D> {
  getErrors(): Errors<D> {
    return { base: ["some base error"] };
  }
}
