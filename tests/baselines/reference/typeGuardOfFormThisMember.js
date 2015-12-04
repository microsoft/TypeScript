//// [typeGuardOfFormThisMember.ts]
// There's a 'File' class in the stdlib, wrap with a namespace to avoid collision
namespace Test {
	export class FileSystemObject {
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
	file.isNetworked = false;
	file.isNetworked = file.isDirectory;
	file.isFile = file.isNetworked;
	let x = file.isFile;
	if (file.isFile) {
		file.content;
	}
	else if (file.isDirectory) {
		file.children;
	}
	else if (file.isNetworked) {
		file.host;
	}
}

//// [typeGuardOfFormThisMember.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// There's a 'File' class in the stdlib, wrap with a namespace to avoid collision
var Test;
(function (Test) {
    var FileSystemObject = (function () {
        function FileSystemObject(path) {
            this.path = path;
        }
        Object.defineProperty(FileSystemObject.prototype, "isFile", {
            get: function () {
                return this instanceof File;
            },
            set: function (param) {
                // noop
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileSystemObject.prototype, "isDirectory", {
            get: function () {
                return this instanceof Directory;
            },
            enumerable: true,
            configurable: true
        });
        return FileSystemObject;
    })();
    Test.FileSystemObject = FileSystemObject;
    var File = (function (_super) {
        __extends(File, _super);
        function File(path, content) {
            _super.call(this, path);
            this.content = content;
        }
        return File;
    })(FileSystemObject);
    Test.File = File;
    var Directory = (function (_super) {
        __extends(Directory, _super);
        function Directory() {
            _super.apply(this, arguments);
        }
        return Directory;
    })(FileSystemObject);
    Test.Directory = Directory;
    var file = new File("foo/bar.txt", "foo");
    file.isNetworked = false;
    file.isNetworked = file.isDirectory;
    file.isFile = file.isNetworked;
    var x = file.isFile;
    if (file.isFile) {
        file.content;
    }
    else if (file.isDirectory) {
        file.children;
    }
    else if (file.isNetworked) {
        file.host;
    }
})(Test || (Test = {}));


//// [typeGuardOfFormThisMember.d.ts]
declare namespace Test {
    class FileSystemObject {
        path: string;
        isFile: this is File;
        isDirectory: this is Directory;
        isNetworked: this is (Networked & this);
        constructor(path: string);
    }
    class File extends FileSystemObject {
        content: string;
        constructor(path: string, content: string);
    }
    class Directory extends FileSystemObject {
        children: FileSystemObject[];
    }
    interface Networked {
        host: string;
    }
}
