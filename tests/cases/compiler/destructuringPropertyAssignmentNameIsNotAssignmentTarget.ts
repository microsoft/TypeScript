// test for #10668
function qux(bar: { value: number }) {
    let foo: number;
    ({ value: foo } = bar);
    let x = () => bar;
}

