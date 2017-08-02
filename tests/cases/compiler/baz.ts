var func: {
    (s: string): number;
    (lambda: (s: string) => { a: number; b: number }): string;
};

func(s => ({})); // Error for no applicable overload (object type is missing a and b)
