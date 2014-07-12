//// [genericBaseClassLiteralProperty2.ts]
class CollectionItem2 { }

class BaseCollection2<TItem extends CollectionItem2> {
    _itemsByKey: { [key: string]: TItem; };
    constructor() {
        this._itemsByKey = {};
    }
}

class DataView2 extends BaseCollection2<CollectionItem2> {
    fillItems(item: CollectionItem2) {
        this._itemsByKey['dummy'] = item;
    }
}


//// [genericBaseClassLiteralProperty2.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CollectionItem2 = (function () {
    function CollectionItem2() {
    }
    return CollectionItem2;
})();

var BaseCollection2 = (function () {
    function BaseCollection2() {
        this._itemsByKey = {};
    }
    return BaseCollection2;
})();

var DataView2 = (function (_super) {
    __extends(DataView2, _super);
    function DataView2() {
        _super.apply(this, arguments);
    }
    DataView2.prototype.fillItems = function (item) {
        this._itemsByKey['dummy'] = item;
    };
    return DataView2;
})(BaseCollection2);
