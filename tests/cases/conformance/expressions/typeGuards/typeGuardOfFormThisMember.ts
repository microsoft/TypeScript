// @target: es5
// @declaration: true
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