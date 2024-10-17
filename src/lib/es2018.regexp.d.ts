interface StringReplaceCallbackOptions extends StringReplaceCallbackIncludeNamedCapturingGroups {}

interface _RegExpExecArray<
    CapturingGroups extends CapturingGroupsArray = CapturingGroupsArray,
    NamedCapturingGroups extends NamedCapturingGroupsObject = NamedCapturingGroupsObject,
> {
    groups: NamedCapturingGroups;
}

interface RegExpFlags {
    /** A Boolean value indicating the state of the dotAll flag (s) on the regular expression. Read-only. */
    readonly dotAll: boolean;
}
