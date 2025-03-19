//// [tests/cases/conformance/expressions/typeGuards/typeGuardOfFormThisMemberErrors.ts] ////

//// [typeGuardOfFormThisMemberErrors.ts]
// There's a 'File' class in the stdlib, wrap with a namespace to avoid collision
namespace Test {
	export class FileSystemObject {
		isFSO: this is FileSystemObject;
		get isFile(): this is File {
			return this instanceof File;
		}
		set isFile(param) {
			// noop
		}
		get isDirectory(): this is Directory {
			return this instanceof Directory;
		}
		isNetworked: this is (Networked & this);
		constructor(public path: string) {}
	}

	export class File extends FileSystemObject {
		constructor(path: string, public content: string) { super(path); }
	}
	export class Directory extends FileSystemObject {
		children: FileSystemObject[];
	}
	export interface Networked {
		host: string;
	}

	let file: FileSystemObject = new File("foo/bar.txt", "foo");
	file.isNetworked = file.isFile;
	file.isFSO = file.isNetworked;
	file.isFile = file.isFSO;
}

//// [typeGuardOfFormThisMemberErrors.js]
// There's a 'File' class in the stdlib, wrap with a namespace to avoid collision
var Test;
(function (Test) {
    class FileSystemObject {
        path;
        isFSO;
        get isFile() {
            return this instanceof File;
        }
        set isFile(param) {
            // noop
        }
        get isDirectory() {
            return this instanceof Directory;
        }
        isNetworked;
        constructor(path) {
            this.path = path;
        }
    }
    Test.FileSystemObject = FileSystemObject;
    class File extends FileSystemObject {
        content;
        constructor(path, content) {
            this.content = content;
            super(path);
        }
    }
    Test.File = File;
    class Directory extends FileSystemObject {
        children;
    }
    Test.Directory = Directory;
    let file = new File("foo/bar.txt", "foo");
    file.isNetworked = file.isFile;
    file.isFSO = file.isNetworked;
    file.isFile = file.isFSO;
})(Test || (Test = {}));
