//// [genericReturnTypeFromGetter1.ts]
export interface A<T> {
   new (dbSet: DbSet<T>): T;
}
export class DbSet<T> {
    _entityType: A;
  get entityType() { return this._entityType; }  // used to ICE without return type annotation
}


//// [genericReturnTypeFromGetter1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var DbSet = (function () {
        function DbSet() {
        }
        Object.defineProperty(DbSet.prototype, "entityType", {
            get: function () { return this._entityType; } // used to ICE without return type annotation
            ,
            enumerable: true,
            configurable: true
        });
        return DbSet;
    }());
    exports.DbSet = DbSet;
});
