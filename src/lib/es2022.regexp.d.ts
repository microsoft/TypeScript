type RegExpGroupsValueToIndices<T> = { [K in keyof T]: T[K] extends string ? [startIndex: number, endIndex: number] : T[K]; };

interface RegExpIndices<
    CapturingGroups extends CapturingGroupsArray = CapturingGroupsArray,
    NamedCapturingGroups extends NamedCapturingGroupsObject = NamedCapturingGroupsObject,
> {
    indices: RegExpGroupsValueToIndices<CapturingGroups> & { groups: RegExpGroupsValueToIndices<NamedCapturingGroups>; };
}

interface RegExpFlags {
    /** A Boolean value indicating the state of the hasIndices flag (d) on the regular expression. Read-only. */
    readonly hasIndices: boolean;
}
