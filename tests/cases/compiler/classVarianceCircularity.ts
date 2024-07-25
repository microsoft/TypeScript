// @strict: true

// Issue #52813

function f() {
    const b = new Bar();
    // Uncomment to create error
    console.log(b.Value);
}

class Bar<T> {
    num!: number;
    // Or swap these two lines
    Field: number = (this as Bar<any>).num;
    Value = (this as Bar<any>).num;
}