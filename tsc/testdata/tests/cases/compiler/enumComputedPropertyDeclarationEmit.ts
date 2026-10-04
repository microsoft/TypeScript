// @declaration: true

export enum StringEnum {
    A = "a",
    B = "not-an-identifier",
    Unused = "unused",
}

export const stringRecord = {
    [StringEnum.A]: StringEnum.A,
    [StringEnum.B]: StringEnum.B,
} as const;

export type StringKey = keyof typeof stringRecord;

export enum NumericEnum {
    Zero = 0,
    Negative = -1,
    Unused = 1,
}

export const numericRecord = {
    [NumericEnum.Zero]: NumericEnum.Zero,
    [NumericEnum.Negative]: NumericEnum.Negative,
} as const;

export type NumericKey = keyof typeof numericRecord;

type Assignability<T extends StringEnum | NumericEnum> = T;
export type StringDemo<T extends StringKey> = Assignability<T>;
export type NumericDemo<T extends NumericKey> = Assignability<T>;

export namespace Namespace {
    enum NamespaceEnum {
        A = "a",
    }

    export const record = {
        [NamespaceEnum.A]: NamespaceEnum.A,
    } as const;

    export type Key = keyof typeof record;

    type NamespaceAssignability<T extends NamespaceEnum> = T;
    export type Demo<T extends Key> = NamespaceAssignability<T>;
}
