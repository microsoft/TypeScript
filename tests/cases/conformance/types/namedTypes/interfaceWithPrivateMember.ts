// @allowUnusedLabels: true

// interfaces do not permit private members, these are errors

interface I {
    private x: string;
}

interface I2<T> {
    private y: T;
}

var x: {
    private y: string;
}