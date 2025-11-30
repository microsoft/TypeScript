// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/60476

export type FlattenType<Source extends object, Target> = {
  [Key in keyof Source as Key extends string
    ? Source[Key] extends object
      ? `${Key}.${keyof FlattenType<Source[Key], Target> & string}`
      : Key
    : never]-?: Target;
};

type FieldSelect = {
  table: string;
  field: string;
};

type Address = {
  postCode: string;
  description: string;
  address: string;
};

type User = {
  id: number;
  name: string;
  address: Address;
};

type FlattenedUser = FlattenType<User, FieldSelect>;
type FlattenedUserKeys = keyof FlattenType<User, FieldSelect>;

export type FlattenTypeKeys<Source extends object, Target> = keyof {
  [Key in keyof Source as Key extends string
    ? Source[Key] extends object
      ? `${Key}.${keyof FlattenType<Source[Key], Target> & string}`
      : Key
    : never]-?: Target;
};

type FlattenedUserKeys2 = FlattenTypeKeys<User, FieldSelect>;
