interface RegExpMatchArray {
    groups?: {
        [key: string]: string | undefined
    }
}

interface RegExpExecArray {
    groups?: {
        [key: string]: string | undefined
    }
}

interface RegExp {
    /**
     * Returns a Boolean value indicating the state of the dotAll flag (s) used with a regular expression.
     * Default is false. Read-only.
     */
    readonly dotAll: boolean;
}
