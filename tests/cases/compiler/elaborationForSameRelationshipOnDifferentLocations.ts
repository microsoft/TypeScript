// https://github.com/microsoft/TypeScript/issues/3276

class GenericThingamabob<T> {
    constructor(private entity: T) {}
    add(item: T) { }
}

class CouponInfo {
    private couponTag: {};
}

class Snake {
    private snakeTag: {};
}

var blah = new GenericThingamabob(new CouponInfo());

blah.add(new Snake());
var x: CouponInfo = new Snake();
