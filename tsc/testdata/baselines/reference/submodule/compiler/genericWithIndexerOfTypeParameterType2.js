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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListItem = exports.CollectionItem = exports.List = exports.Collection = void 0;
class Collection {
    _itemsByKey;
}
exports.Collection = Collection;
class List extends Collection {
    Bar() { }
}
exports.List = List;
class CollectionItem {
}
exports.CollectionItem = CollectionItem;
class ListItem extends CollectionItem {
    __isNew;
}
exports.ListItem = ListItem;
