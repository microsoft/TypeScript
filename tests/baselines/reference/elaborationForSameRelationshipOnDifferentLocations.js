//// [tests/cases/compiler/elaborationForSameRelationshipOnDifferentLocations.ts] ////

//// [elaborationForSameRelationshipOnDifferentLocations.ts]
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


//// [elaborationForSameRelationshipOnDifferentLocations.js]
// https://github.com/microsoft/TypeScript/issues/3276
var GenericThingamabob = /** @class */ (function () {
    function GenericThingamabob(entity) {
        this.entity = entity;
    }
    GenericThingamabob.prototype.add = function (item) { };
    return GenericThingamabob;
}());
var CouponInfo = /** @class */ (function () {
    function CouponInfo() {
    }
    return CouponInfo;
}());
var Snake = /** @class */ (function () {
    function Snake() {
    }
    return Snake;
}());
var blah = new GenericThingamabob(new CouponInfo());
blah.add(new Snake());
var x = new Snake();
