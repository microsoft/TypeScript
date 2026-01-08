// @strictNullChecks: false
// @declaration: true
// @emitDeclarationOnly: true

type InputType = { enable_member_receipts?: boolean };
type AsEmptyObject<T> = { [K in keyof T]?: undefined };

export const test = {
  ...({} as AsEmptyObject<InputType>),
};
