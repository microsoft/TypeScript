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
<<<<<<< HEAD
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DbSet = void 0;
    class DbSet {
        get entityType() { return this._entityType; } // used to ICE without return type annotation
    }
    exports.DbSet = DbSet;
});
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DbSet = void 0;
    var DbSet = /** @class */ (function () {
        function DbSet() {
        }
        Object.defineProperty(DbSet.prototype, "entityType", {
            get: function () { return this._entityType; } // used to ICE without return type annotation
            ,
            enumerable: false,
            configurable: true
        });
        return DbSet;
    }());
    exports.DbSet = DbSet;
});
=======
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbSet = void 0;
var DbSet = /** @class */ (function () {
    function DbSet() {
    }
    Object.defineProperty(DbSet.prototype, "entityType", {
        get: function () { return this._entityType; } // used to ICE without return type annotation
        ,
        enumerable: false,
        configurable: true
    });
    return DbSet;
}());
exports.DbSet = DbSet;
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
