//// [tests/cases/compiler/genericMemberFunction.ts] ////

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
<<<<<<< HEAD
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BuildResult = exports.FileWithErrors = exports.BuildError = void 0;
    class BuildError {
        parent() {
            return undefined;
        }
    }
    exports.BuildError = BuildError;
    class FileWithErrors {
        errors() {
            return undefined;
        }
        parent() {
            return undefined;
        }
    }
    exports.FileWithErrors = FileWithErrors;
    class BuildResult {
        merge(other) {
            a.b.c.d.e.f.g = 0;
            removedFiles.forEach((each) => {
                this.removeFile(each);
            });
        }
    }
    exports.BuildResult = BuildResult;
});
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BuildResult = exports.FileWithErrors = exports.BuildError = void 0;
    var BuildError = /** @class */ (function () {
        function BuildError() {
        }
        BuildError.prototype.parent = function () {
            return undefined;
        };
        return BuildError;
    }());
    exports.BuildError = BuildError;
    var FileWithErrors = /** @class */ (function () {
        function FileWithErrors() {
        }
        FileWithErrors.prototype.errors = function () {
            return undefined;
        };
        FileWithErrors.prototype.parent = function () {
            return undefined;
        };
        return FileWithErrors;
    }());
    exports.FileWithErrors = FileWithErrors;
    var BuildResult = /** @class */ (function () {
        function BuildResult() {
        }
        BuildResult.prototype.merge = function (other) {
            var _this = this;
            a.b.c.d.e.f.g = 0;
            removedFiles.forEach(function (each) {
                _this.removeFile(each);
            });
        };
        return BuildResult;
    }());
    exports.BuildResult = BuildResult;
});
=======
var BuildError = /** @class */ (function () {
    function BuildError() {
    }
    BuildError.prototype.parent = function () {
        return undefined;
    };
    return BuildError;
}());
export { BuildError };
var FileWithErrors = /** @class */ (function () {
    function FileWithErrors() {
    }
    FileWithErrors.prototype.errors = function () {
        return undefined;
    };
    FileWithErrors.prototype.parent = function () {
        return undefined;
    };
    return FileWithErrors;
}());
export { FileWithErrors };
var BuildResult = /** @class */ (function () {
    function BuildResult() {
    }
    BuildResult.prototype.merge = function (other) {
        var _this = this;
        a.b.c.d.e.f.g = 0;
        removedFiles.forEach(function (each) {
            _this.removeFile(each);
        });
    };
    return BuildResult;
}());
export { BuildResult };
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
