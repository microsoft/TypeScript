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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var CollectionItem2 = (function () {
    function CollectionItem2() {
    }
    return CollectionItem2;
}());
var BaseCollection2 = (function () {
    function BaseCollection2() {
        this._itemsByKey = {};
    }
    return BaseCollection2;
}());
var DataView2 = (function (_super) {
    __extends(DataView2, _super);
    function DataView2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataView2.prototype.fillItems = function (item) {
        this._itemsByKey['dummy'] = item;
    };
    __names(DataView2.prototype, ["fillItems"]);
    return DataView2;
}(BaseCollection2));
