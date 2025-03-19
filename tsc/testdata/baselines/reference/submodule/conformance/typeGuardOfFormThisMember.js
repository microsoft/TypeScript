//// [tests/cases/conformance/expressions/typeGuards/typeGuardOfFormThisMember.ts] ////

//// [typeGuardOfFormThisMember.ts]
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
	file.isNetworked = false;
	file.isFSO = file.isFile;
	file.isFile = true;
	let x = file.isFile;
	if (file.isFile) {
		file.content;
		if (file.isNetworked) {
			file.host;
			file.content;
		}
	}
	else if (file.isDirectory) {
		file.children;
	}
	else if (file.isNetworked) {
		file.host;
	}
	
	interface GenericLeadGuard<T> extends GenericGuard<T> {
		lead(): void;
	}
	
	interface GenericFollowerGuard<T> extends GenericGuard<T> {
		follow(): void;
	}
	
	interface GenericGuard<T> {
		target: T;
		isLeader: this is (GenericLeadGuard<T>);
		isFollower: this is GenericFollowerGuard<T>;
	}

	let guard: GenericGuard<File>;
	if (guard.isLeader) {
		guard.lead();
	}
	else if (guard.isFollower) {
		guard.follow();
	}

	interface SpecificGuard {
		isMoreSpecific: this is MoreSpecificGuard;
	}

	interface MoreSpecificGuard extends SpecificGuard {
		do(): void;
	}

	let general: SpecificGuard;
	if (general.isMoreSpecific) {
		general.do();
	}
}


//// [typeGuardOfFormThisMember.js]
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
    file.isNetworked = false;
    file.isFSO = file.isFile;
    file.isFile = true;
    let x = file.isFile;
    if (file.isFile) {
        file.content;
        if (file.isNetworked) {
            file.host;
            file.content;
        }
    }
    else if (file.isDirectory) {
        file.children;
    }
    else if (file.isNetworked) {
        file.host;
    }
    let guard;
    if (guard.isLeader) {
        guard.lead();
    }
    else if (guard.isFollower) {
        guard.follow();
    }
    let general;
    if (general.isMoreSpecific) {
        general.do();
    }
})(Test || (Test = {}));
