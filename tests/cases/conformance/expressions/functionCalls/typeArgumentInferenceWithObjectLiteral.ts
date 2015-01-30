interface Computed<T> {
    read(): T;
    write(value: T);
}

function foo<T>(x: Computed<T>) { }

var s: string;

// Calls below should infer string for T and then assign that type to the value parameter
foo({
    read: () => s,
    write: value => s = value
});
foo({
    write: value => s = value,
    read: () => s
});
