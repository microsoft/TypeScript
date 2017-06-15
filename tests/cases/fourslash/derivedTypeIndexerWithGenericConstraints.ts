/// <reference path='fourslash.ts'/>

////class CollectionItem {
////    x: number;
////}

////class Entity extends CollectionItem {
////    y: number;
////}

////class BaseCollection<TItem extends CollectionItem>  {
////    _itemsByKey: { [key: string]: TItem; };
////}

////class DbSet<TEntity extends Entity> extends BaseCollection<TEntity> { // error
////    _itemsByKey: { [key: string]: TEntity; };
////}

////var a: BaseCollection<CollectionItem>;
////var /**/r = a._itemsByKey['x']; // should just say CollectionItem not TItem extends CollectionItem
////var result = r.x;

////a = new DbSet<Entity>();
////var r2 = a._itemsByKey['x'];
////var result2 = r2.x;

verify.quickInfoAt("", "var r: CollectionItem");
verify.noErrors();
