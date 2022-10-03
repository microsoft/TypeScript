interface Constructable {
    new (): any;
}

class C<T extends Constructable> {
    constructor(public data: T, public data2: Constructable) { }
    create() {
        var x = new this.data(); // should not error
        var x2 = new this.data2(); // should not error
    }
}
