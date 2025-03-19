//// [tests/cases/compiler/genericReturnTypeFromGetter1.ts] ////

//// [genericReturnTypeFromGetter1.ts]
export interface A<T> {
   new (dbSet: DbSet<T>): T;
}
export class DbSet<T> {
    _entityType: A;
  get entityType() { return this._entityType; }  // used to ICE without return type annotation
}


//// [genericReturnTypeFromGetter1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbSet = void 0;
class DbSet {
    _entityType;
    get entityType() { return this._entityType; } // used to ICE without return type annotation
}
exports.DbSet = DbSet;
