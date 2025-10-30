// @strict: true
// @declaration: true
// @emitDeclarationOnly: true

// https://github.com/microsoft/TypeScript/issues/59107

declare function create<T extends {}>(): T;

export const c = create<{
  data: {
    ["a_b_c"]: string;
    ["sss"]: string;
    s_d: string;
    queryData?: string;
    ["foo bar"]: string;
  };
  ["a_b_c"]: string;
}>();

export interface IData {
  ["a_b_c"]: string;
  nested: {
    ["d_e_f"]: string;
    value: string;
    ["qwe rty"]: string;
  };
}
