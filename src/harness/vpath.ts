// NOTE: The contents of this file are all exported from the namespace 'vpath'. This is to
//       support the eventual conversion of harness into a modular system.

// NOTE: Some of the functions here duplicate functionality from compiler/core.ts. They have been
//       added to reduce the number of direct dependencies on compiler and services to eventually
//       break away from depending directly on the compiler to speed up compilation time.

namespace vpath {
    const module = require("@typescript/vfs-path");
    vpath.sep = module.sep;
    vpath.normalizeSeparators = module.normalizeSeparators;
    (<any>vpath).ValidationFlags = module.ValidationFlags;
    vpath.valid = module.valid;
    vpath.validate = module.validate;
    vpath.isAbsolute = module.isAbsolute;
    vpath.hasTrailingSeparator = module.hasTrailingSeparator;
    vpath.addTrailingSeparator = module.addTrailingSeparator;
    vpath.removeTrailingSeparator = module.removeTrailingSeparator;
    vpath.normalize = module.normalize;
    vpath.combine = module.combine;
    vpath.resolve = module.resolve;
    vpath.relative = module.relative;
    vpath.compareCaseSensitive = module.compareCaseSensitive;
    vpath.compareCaseInsensitive = module.compareCaseInsensitive;
    vpath.compare = module.compare;
    vpath.equals = module.equals;
    vpath.beneath = module.beneath;
    vpath.parse = module.parse;
    vpath.format = module.format;
    vpath.dirname = module.dirname;
    vpath.basename = module.basename;
    vpath.extname = module.extname;
    vpath.changeExtension = module.changeExtension;
}

declare module "vpath_" {
    import * as vpath_ from "@typescript/vfs-path";
    global {
        namespace vpath {
            export import sep = vpath_.sep;
            export import normalizeSeparators = vpath_.normalizeSeparators;
            export import ValidationFlags = vpath_.ValidationFlags;
            export import valid = vpath_.valid;
            export import validate = vpath_.validate;
            export import isAbsolute = vpath_.isAbsolute;
            export import hasTrailingSeparator = vpath_.hasTrailingSeparator;
            export import addTrailingSeparator = vpath_.addTrailingSeparator;
            export import removeTrailingSeparator = vpath_.removeTrailingSeparator;
            export import normalize = vpath_.normalize;
            export import combine = vpath_.combine;
            export import resolve = vpath_.resolve;
            export import relative = vpath_.relative;
            export import compareCaseSensitive = vpath_.compareCaseSensitive;
            export import compareCaseInsensitive = vpath_.compareCaseInsensitive;
            export import compare = vpath_.compare;
            export import equals = vpath_.equals;
            export import beneath = vpath_.beneath;
            export import parse = vpath_.parse;
            export import format = vpath_.format;
            export import dirname = vpath_.dirname;
            export import basename = vpath_.basename;
            export import extname = vpath_.extname;
            export import changeExtension = vpath_.changeExtension;
        }
    }
}
