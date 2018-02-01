"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Extended options for a directory in a `FileMap` */
class Directory {
    constructor(files, { uid, gid, mode, meta } = {}) {
        this.files = files;
        this.uid = uid;
        this.gid = gid;
        this.mode = mode;
        this.meta = meta;
    }
}
exports.Directory = Directory;
/** Extended options for a file in a `FileMap` */
class File {
    constructor(data, { uid, gid, mode, meta, encoding } = {}) {
        this.data = data;
        this.encoding = encoding;
        this.uid = uid;
        this.gid = gid;
        this.mode = mode;
        this.meta = meta;
    }
}
exports.File = File;
/** Extended options for a hard link in a `FileMap` */
class Link {
    constructor(path) {
        this.path = path;
    }
}
exports.Link = Link;
/** Extended options for a symbolic link in a `FileMap` */
class Symlink {
    constructor(symlink, { uid, gid, mode, meta } = {}) {
        this.symlink = symlink;
        this.uid = uid;
        this.gid = gid;
        this.mode = mode;
        this.meta = meta;
    }
}
exports.Symlink = Symlink;
/** Extended options for mounting a virtual copy of an external file system via a `FileMap` */
class Mount {
    constructor(source, resolver, { uid, gid, mode, meta } = {}) {
        this.source = source;
        this.resolver = resolver;
        this.uid = uid;
        this.gid = gid;
        this.mode = mode;
        this.meta = meta;
    }
}
exports.Mount = Mount;

//# sourceMappingURL=fileSet.js.map
