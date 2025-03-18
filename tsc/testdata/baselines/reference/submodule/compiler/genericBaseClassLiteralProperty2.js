//// [tests/cases/compiler/genericBaseClassLiteralProperty2.ts] ////

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
class CollectionItem2 {
}
class BaseCollection2 {
    _itemsByKey;
    constructor() {
        this._itemsByKey = {};
    }
}
class DataView2 extends BaseCollection2 {
    fillItems(item) {
        this._itemsByKey['dummy'] = item;
    }
}
