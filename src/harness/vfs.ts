/// <reference path="../compiler/commandLineParser.ts"/>
/// <reference path="./harness.ts" />
/// <reference path="./core.ts" />
/// <reference path="./events.ts" />
/// <reference path="./vpath.ts" />
/// <reference path="./documents.ts" />

// NOTE: The contents of this file are all exported from the namespace 'vfs'. This is to
//       support the eventual conversion of harness into a modular system.

namespace vfs {
    const module = require("@typescript/vfs");
    vfs.Directory = module.Directory;
    vfs.File = module.File;
    vfs.Link = module.Link;
    vfs.Symlink = module.Symlink;
    vfs.Mount = module.Mount;
    vfs.FileSystem = module.FileSystem;
    vfs.Stats = module.Stats;
    vfs.FSWatcher = module.FSWatcher;
}

declare module "vfs_" {
    import * as vfs_ from "@typescript/vfs";
    global {
        namespace vfs {
            export import FileSystemResolver = vfs_.FileSystemResolver;
            export import FileSystemTimers = vfs_.FileSystemTimers;
            export import FileSet = vfs_.FileSet;
            export import Directory = vfs_.Directory;
            export import DirectoryLike = vfs_.DirectoryLike;
            export import File = vfs_.File;
            export import FileLike = vfs_.FileLike;
            export import Link = vfs_.Link;
            export import Symlink = vfs_.Symlink;
            export import Mount = vfs_.Mount;
            export import FileSystemOptions = vfs_.FileSystemOptions;
            export import FileSystem = vfs_.FileSystem;
            export import Stats = vfs_.Stats;
            export import FSWatcher = vfs_.FSWatcher;
        }
    }
}