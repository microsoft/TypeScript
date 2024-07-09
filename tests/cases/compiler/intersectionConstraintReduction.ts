// @strict: true
// @noEmit: true

type Test1<K1 extends keyof any, K2 extends keyof any> =
    MustBeKey<Extract<K1, keyof any> & K1 & K2>;

type Test2<K1 extends keyof any, K2 extends keyof any> =
    MustBeKey<K1 & K2 & Extract<K1, keyof any>>;

type MustBeKey<K extends keyof any> = K;

// https://github.com/microsoft/TypeScript/issues/58370

type AnyKey = number | string | symbol;

type ReturnTypeKeyof<Obj extends object> = Obj extends object
    ? [keyof Obj] extends [never]
        ? never
        : { [Key in keyof Obj as string]-?: () => Key }[string]
    : never;

type KeyIfSignatureOfObject<
    Obj extends object,
    Key extends AnyKey,
    ReturnTypeKeys = ReturnTypeKeyof<Obj>,
> = ReturnTypeKeys extends () => Key ? ((() => Key) extends ReturnTypeKeys ? Key : never) : never;

export type Reduced1<Obj extends object, Key extends AnyKey, Value, ObjKeys extends keyof Obj = keyof Obj> =
    Key extends KeyIfSignatureOfObject<Obj, Key>
        ? Key extends ObjKeys
            ? { [K in Key]: Value }
            : never
        : never;

export type Reduced2<Obj extends object, Key extends AnyKey, Value, ObjKeys extends keyof Obj = keyof Obj> =
    Key extends AnyKey
        ? Key extends KeyIfSignatureOfObject<Obj, Key>
            ? Key extends ObjKeys
               ? { [K in Key]: Value }
               : never
            : never
        : never;
