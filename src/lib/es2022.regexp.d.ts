// Needs to be in two lines such as to properly distribute `string | undefined`
type RegExpGroupValuesToIndices<T> = { [K in keyof T]: RegExpGroupValueToIndices<T[K]>; };
type RegExpGroupValueToIndices<T> = T extends string ? [startIndex: number, endIndex: number] : T;

interface RegExpIndices<
    CapturingGroups extends CapturingGroupsArray = CapturingGroupsArray,
    NamedCapturingGroups extends NamedCapturingGroupsObject = NamedCapturingGroupsObject,
> {
    indices: RegExpGroupValuesToIndices<CapturingGroups> & { groups: RegExpGroupValuesToIndices<NamedCapturingGroups>; };
}

interface RegExpFlags {
    /** A Boolean value indicating the state of the hasIndices flag (d) on the regular expression. Read-only. */
    readonly hasIndices: boolean;
}
