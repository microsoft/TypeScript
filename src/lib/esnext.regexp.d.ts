interface RegExpMatchArray {
    indices?: RegExpMatchIndicesArray;
}

interface RegExpMatchIndicesArray extends Array<number[]> {
    groups?: {
        [key: string]: string
    }
}

interface RegExpExecArray {
    indices?: RegExpExecIndicesArray;
}

interface RegExpExecIndicesArray extends Array<number[]> {
    groups?: {
        [key: string]: string
    }
}

interface RegExp {
    /**
     * Returns a Boolean value indicating the state of the hasIndices flag (d) used with with a regular expression.
     * Default is false. Read-only.
     */
    readonly hasIndices: boolean
}