// NOTE: This namespace re-exports all of the exports from the @typescript/vfs-path private package.

namespace vpath {
    const _vpath = require("@typescript/vfs-path") as typeof vpath;
    // tslint:disable:no-unnecessary-qualifier
    vpath.sep = _vpath.sep;
    vpath.normalizeSeparators = _vpath.normalizeSeparators;
    (<any>vpath).ValidationFlags = (<any>_vpath).ValidationFlags;
    vpath.valid = _vpath.valid;
    vpath.validate = _vpath.validate;
    vpath.isAbsolute = _vpath.isAbsolute;
    vpath.hasTrailingSeparator = _vpath.hasTrailingSeparator;
    vpath.addTrailingSeparator = _vpath.addTrailingSeparator;
    vpath.removeTrailingSeparator = _vpath.removeTrailingSeparator;
    vpath.normalize = _vpath.normalize;
    vpath.combine = _vpath.combine;
    vpath.resolve = _vpath.resolve;
    vpath.relative = _vpath.relative;
    vpath.compareCaseSensitive = _vpath.compareCaseSensitive;
    vpath.compareCaseInsensitive = _vpath.compareCaseInsensitive;
    vpath.compare = _vpath.compare;
    vpath.equals = _vpath.equals;
    vpath.beneath = _vpath.beneath;
    vpath.parse = _vpath.parse;
    vpath.format = _vpath.format;
    vpath.dirname = _vpath.dirname;
    vpath.basename = _vpath.basename;
    vpath.extname = _vpath.extname;
    vpath.changeExtension = _vpath.changeExtension;
    // tslint:enable:no-unnecessary-qualifier
}

declare module "_vpath" {
    import * as _vpath from "@typescript/vfs-path";
    global {
        namespace vpath {
            export import sep = _vpath.sep;
            export import normalizeSeparators = _vpath.normalizeSeparators;
            export import ValidationFlags = _vpath.ValidationFlags;
            export import valid = _vpath.valid;
            export import validate = _vpath.validate;
            export import isAbsolute = _vpath.isAbsolute;
            export import hasTrailingSeparator = _vpath.hasTrailingSeparator;
            export import addTrailingSeparator = _vpath.addTrailingSeparator;
            export import removeTrailingSeparator = _vpath.removeTrailingSeparator;
            export import normalize = _vpath.normalize;
            export import combine = _vpath.combine;
            export import resolve = _vpath.resolve;
            export import relative = _vpath.relative;
            export import compareCaseSensitive = _vpath.compareCaseSensitive;
            export import compareCaseInsensitive = _vpath.compareCaseInsensitive;
            export import compare = _vpath.compare;
            export import equals = _vpath.equals;
            export import beneath = _vpath.beneath;
            export import parse = _vpath.parse;
            export import format = _vpath.format;
            export import dirname = _vpath.dirname;
            export import basename = _vpath.basename;
            export import extname = _vpath.extname;
            export import changeExtension = _vpath.changeExtension;
        }
    }
}
