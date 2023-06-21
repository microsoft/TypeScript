let value: string = "0";
export let o = {
    n: 1,
    s: "s",
    nested: {
        nn: 2
    },
    method(value: number): number {
        return value;
    }
}

export let oRo = {
    n: 1,
    s: "s",
    nested: {
        nn: 2
    },
    fn:(value: number, defaultValue = 1): string =>{
        return ""
    },
    method(value: number): number {
        return value;
    }
} as const


// With comments
export const State = {
    /**
     * Session orders or tickets have been processed in total and created without error
     */
    Committed: 'Committed',

    /**
     * Attempting to commit orders or tickets
     */
    Committing: 'Committing',
} as const;


export let a0 = {
    get x() {
        return 1;
    }
}

export let a1 = {
    get x(): number {
        return 1;
    }
}

export let a2 = {
    get x() {
        return 1;
    },
    set x(v) {
    }
}

export let a3 = {
    get x() {
        return 1;
    },
    set x(v: number) {
    }
}

export let a4 = {
    get x(): number {
        return 1;
    },
    set x(v: string) {
    }
}
