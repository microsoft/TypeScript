namespace Test1 {
    function foo<T extends { abc: number }>(x: T) {
        let a: T.abc = x.abc;
    }
}