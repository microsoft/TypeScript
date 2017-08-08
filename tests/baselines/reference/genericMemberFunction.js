//// [genericMemberFunction.ts]
export class BuildError<A, B, C>{
  public parent<A, B extends A, C>(): FileWithErrors<A, B, C> {
    return undefined;
  }
}
export class FileWithErrors<A, B, C>{
  public errors<A, B extends A, C>(): BuildError<A, B, C>[] {
    return undefined;
  }
  public parent<A, B extends A, C>(): BuildResult<A, B, C> {
    return undefined;
  }
}
export class BuildResult<A, B, C>{
  public merge<A, B extends A, C>(other: BuildResult<A, B, C>): void {
    a.b.c.d.e.f.g = 0;
    removedFiles.forEach(<A, B extends A, C>(each: FileWithErrors<A, B, C>) => {
      this.removeFile(each);
    });
  }
}


//// [genericMemberFunction.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
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
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var BuildError = (function () {
        function BuildError() {
        }
        BuildError.prototype.parent = function () {
            return undefined;
        };
        __names(BuildError.prototype, ["parent"]);
        return BuildError;
    }());
    exports.BuildError = BuildError;
    var FileWithErrors = (function () {
        function FileWithErrors() {
        }
        FileWithErrors.prototype.errors = function () {
            return undefined;
        };
        FileWithErrors.prototype.parent = function () {
            return undefined;
        };
        __names(FileWithErrors.prototype, ["errors", "parent"]);
        return FileWithErrors;
    }());
    exports.FileWithErrors = FileWithErrors;
    var BuildResult = (function () {
        function BuildResult() {
        }
        BuildResult.prototype.merge = function (other) {
            var _this = this;
            a.b.c.d.e.f.g = 0;
            removedFiles.forEach(function (each) {
                _this.removeFile(each);
            });
        };
        __names(BuildResult.prototype, ["merge"]);
        return BuildResult;
    }());
    exports.BuildResult = BuildResult;
});
