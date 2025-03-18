//// [tests/cases/compiler/classVarianceCircularity.ts] ////

//// [classVarianceCircularity.ts]
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

//// [classVarianceCircularity.js]
function f() {
    const b = new Bar();
    console.log(b.Value);
}
class Bar {
    num;
    Field = this.num;
    Value = this.num;
}
