//// [genericReturnTypeFromGetter1.js]
define(["require", "exports"], function(require, exports) {
    var DbSet = (function () {
        function DbSet() {
        }
        Object.defineProperty(DbSet.prototype, "entityType", {
            get: function () {
                return this._entityType;
            },
            enumerable: true,
            configurable: true
        });
        return DbSet;
    })();
    exports.DbSet = DbSet;
});
