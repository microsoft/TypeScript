//// [tests/cases/compiler/genericWithIndexerOfTypeParameterType2.ts] ////

//// [genericWithIndexerOfTypeParameterType2.ts]
export class Collection<TItem extends CollectionItem> {
    _itemsByKey: { [key: string]: TItem; };
}

export class List extends Collection<ListItem>{
    Bar() {}
}

export class CollectionItem {}

export class ListItem extends CollectionItem {
    __isNew: boolean;
}


//// [genericWithIndexerOfTypeParameterType2.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListItem = exports.CollectionItem = exports.List = exports.Collection = void 0;
    var Collection = /** @class */ (function () {
        function Collection() {
        }
        return Collection;
    }());
    exports.Collection = Collection;
    var List = /** @class */ (function (_super) {
        __extends(List, _super);
        function List() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        List.prototype.Bar = function () { };
        return List;
    }(Collection));
    exports.List = List;
    var CollectionItem = /** @class */ (function () {
        function CollectionItem() {
        }
        return CollectionItem;
    }());
    exports.CollectionItem = CollectionItem;
    var ListItem = /** @class */ (function (_super) {
        __extends(ListItem, _super);
        function ListItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ListItem;
    }(CollectionItem));
    exports.ListItem = ListItem;
});
