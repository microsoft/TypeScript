interface Boolean {
    /** Returns the primitive value of the specified object. */
    valueOf(): boolean;
}

interface BooleanConstructor {
    new(value?: any): Boolean;
    <T>(value?: T): boolean;
    readonly prototype: Boolean;
}

declare var Boolean: BooleanConstructor;
