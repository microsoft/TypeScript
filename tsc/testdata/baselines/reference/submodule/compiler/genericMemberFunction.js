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
