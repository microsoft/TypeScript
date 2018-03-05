// NOTE: This namespace re-exports all of the exports from the @typescript/vfs private package.

namespace vfs {
    const _vfs = require("@typescript/vfs");
    // tslint:disable:no-unnecessary-qualifier
    vfs.Directory = _vfs.Directory;
    vfs.File = _vfs.File;
    vfs.Link = _vfs.Link;
    vfs.Symlink = _vfs.Symlink;
    vfs.Mount = _vfs.Mount;
    vfs.FileSystem = _vfs.FileSystem;
    vfs.Stats = _vfs.Stats;
    vfs.FSWatcher = _vfs.FSWatcher;
    // tslint:enable:no-unnecessary-qualifier
}

declare module "_vfs" {
    import * as _vfs from "@typescript/vfs";
    global {
        namespace vfs {
            export import FileSystemResolver = _vfs.FileSystemResolver;
            export import FileSystemTimers = _vfs.FileSystemTimers;
            export import FileSet = _vfs.FileSet;
            export import Directory = _vfs.Directory;
            export import DirectoryLike = _vfs.DirectoryLike;
            export import File = _vfs.File;
            export import FileLike = _vfs.FileLike;
            export import Link = _vfs.Link;
            export import Symlink = _vfs.Symlink;
            export import Mount = _vfs.Mount;
            export import FileSystemOptions = _vfs.FileSystemOptions;
            export import FileSystem = _vfs.FileSystem;
            export import Stats = _vfs.Stats;
            export import FSWatcher = _vfs.FSWatcher;
        }
    }
}