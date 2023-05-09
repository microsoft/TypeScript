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
