interface RegExpMatchArray {
    indices?: RegExpIndicesArray;
}

interface RegExpExecArray {
    indices?: RegExpIndicesArray;
}

interface RegExpIndicesArray extends Array<[number, number]> {
    groups?: {
        [key: string]: [number, number];
    };
}

interface RegExp {
    /**
     * Returns a Boolean value indicating the state of the hasIndices flag (d) used with a regular expression.
     * Default is false. Read-only.
     */
    readonly hasIndices: boolean;
}
