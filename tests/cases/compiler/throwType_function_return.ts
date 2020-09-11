class X<T> {
    constructor(public item: T) { }
    add(a: T): T extends number | string | bigint ? T : throw `Cannot apply + operator on this type` {
        // @ts-ignore
        return a + this.item
    }
}
new X(1).add(2).toExponential()
new X("").add("").toLowerCase()
new X({}).add({})
