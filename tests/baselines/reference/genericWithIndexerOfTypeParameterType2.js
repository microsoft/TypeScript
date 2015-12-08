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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    var Collection = (function () {
        function Collection() {
        }
        return Collection;
    })();
    exports.Collection = Collection;
    var List = (function (_super) {
        __extends(List, _super);
        function List() {
            _super.apply(this, arguments);
        }
        List.prototype.Bar = function () { };
        return List;
    })(Collection);
    exports.List = List;
    var CollectionItem = (function () {
        function CollectionItem() {
        }
        return CollectionItem;
    })();
    exports.CollectionItem = CollectionItem;
    var ListItem = (function (_super) {
        __extends(ListItem, _super);
        function ListItem() {
            _super.apply(this, arguments);
        }
        return ListItem;
    })(CollectionItem);
    exports.ListItem = ListItem;
});
