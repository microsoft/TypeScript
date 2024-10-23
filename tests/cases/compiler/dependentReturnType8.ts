// @strict: true
// @noEmit: true

export {};

declare const record: Record<string, string[]>;
declare const array: string[];

const getObject =
    <T extends string | undefined>(group: T): T extends string ? string[] : T extends undefined ? Record<string, string[]> : never =>
        group === undefined ? record : array;