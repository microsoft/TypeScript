// NOTE: This namespace re-exports all of the exports from the @typescript/harness-core private package.

namespace core {
    const _core = require("@typescript/harness-core");
    // tslint:disable:no-unnecessary-qualifier
    core.identity = _core.identity;
    core.compareNumbers = _core.compareNumbers;
    core.compareStrings = _core.compareStrings;
    core.compareStringsCaseSensitive = _core.compareStringsCaseSensitive;
    core.compareStringsCaseInsensitive = _core.compareStringsCaseInsensitive;
    core.equateStringsCaseSensitive = _core.equateStringsCaseSensitive;
    core.equateStringsCaseInsensitive = _core.equateStringsCaseInsensitive;
    core.SortedMap = _core.SortedMap;
    core.SortedSet = _core.SortedSet;
    core.binarySearch = _core.binarySearch;
    core.removeAt = _core.removeAt;
    core.insertAt = _core.insertAt;
    core.Metadata = _core.Metadata;
    core.padLeft = _core.padLeft;
    core.padRight = _core.padRight;
    core.getByteOrderMark = _core.getByteOrderMark;
    core.getByteOrderMarkLength = _core.getByteOrderMarkLength;
    core.removeByteOrderMark = _core.removeByteOrderMark;
    core.addUTF8ByteOrderMark = _core.addUTF8ByteOrderMark;
    core.getLinesAndLineStarts = _core.getLinesAndLineStarts;
    core.splitLines = _core.splitLines;
    core.computeLineStarts = _core.computeLineStarts;
    core.sha1 = _core.sha1;
    // tslint:enable:no-unnecessary-qualifier
}

declare module "_core" {
    import * as _core from "@typescript/harness-core";
    global {
        namespace core {
            export import identity = _core.identity;
            export import compareNumbers = _core.compareNumbers;
            export import compareStrings = _core.compareStrings;
            export import compareStringsCaseSensitive = _core.compareStringsCaseSensitive;
            export import compareStringsCaseInsensitive = _core.compareStringsCaseInsensitive;
            export import equateStringsCaseSensitive = _core.equateStringsCaseSensitive;
            export import equateStringsCaseInsensitive = _core.equateStringsCaseInsensitive;
            export import SortOptions = _core.SortOptions;
            export import SortedMap = _core.SortedMap;
            export import SortedSet = _core.SortedSet;
            export import binarySearch = _core.binarySearch;
            export import removeAt = _core.removeAt;
            export import insertAt = _core.insertAt;
            export import Metadata = _core.Metadata;
            export import padLeft = _core.padLeft;
            export import padRight = _core.padRight;
            export import getByteOrderMark = _core.getByteOrderMark;
            export import getByteOrderMarkLength = _core.getByteOrderMarkLength;
            export import removeByteOrderMark = _core.removeByteOrderMark;
            export import addUTF8ByteOrderMark = _core.addUTF8ByteOrderMark;
            export import LineStarts = _core.LineStarts;
            export import LinesAndLineStarts = _core.LinesAndLineStarts;
            export import getLinesAndLineStarts = _core.getLinesAndLineStarts;
            export import splitLines = _core.splitLines;
            export import computeLineStarts = _core.computeLineStarts;
            export import sha1 = _core.sha1;
        }
    }
}