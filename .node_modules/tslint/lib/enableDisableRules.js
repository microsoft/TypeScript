"use strict";
/**
 * @license
 * Copyright 2014 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable object-literal-sort-keys
var utils = require("tsutils");
var ts = require("typescript");
/**
 * regex is: start of string followed by any amount of whitespace
 * followed by tslint and colon
 * followed by either "enable" or "disable"
 * followed optionally by -line or -next-line
 * followed by either colon, whitespace or end of string
 */
exports.ENABLE_DISABLE_REGEX = /^\s*tslint:(enable|disable)(?:-(line|next-line))?(:|\s|$)/;
function removeDisabledFailures(sourceFile, failures) {
    if (failures.length === 0) {
        // Usually there won't be failures anyway, so no need to look for "tslint:disable".
        return failures;
    }
    var failingRules = new Set(failures.map(function (f) { return f.getRuleName(); }));
    var map = getDisableMap(sourceFile, failingRules);
    return failures.filter(function (failure) {
        var disabledIntervals = map.get(failure.getRuleName());
        return disabledIntervals === undefined || !disabledIntervals.some(function (_a) {
            var pos = _a.pos, end = _a.end;
            var failPos = failure.getStartPosition().getPosition();
            var failEnd = failure.getEndPosition().getPosition();
            return failEnd >= pos && (end === -1 || failPos < end);
        });
    });
}
exports.removeDisabledFailures = removeDisabledFailures;
/**
 * The map will have an array of TextRange for each disable of a rule in a file.
 * (It will have no entry if the rule is never disabled, meaning all arrays are non-empty.)
 */
function getDisableMap(sourceFile, failingRules) {
    var map = new Map();
    utils.forEachComment(sourceFile, function (fullText, comment) {
        var commentText = comment.kind === ts.SyntaxKind.SingleLineCommentTrivia
            ? fullText.substring(comment.pos + 2, comment.end)
            : fullText.substring(comment.pos + 2, comment.end - 2);
        var parsed = parseComment(commentText);
        if (parsed !== undefined) {
            var rulesList = parsed.rulesList, isEnabled = parsed.isEnabled, modifier = parsed.modifier;
            var switchRange = getSwitchRange(modifier, comment, sourceFile);
            if (switchRange !== undefined) {
                var rulesToSwitch = rulesList === "all" ? Array.from(failingRules) : rulesList.filter(function (r) { return failingRules.has(r); });
                for (var _i = 0, rulesToSwitch_1 = rulesToSwitch; _i < rulesToSwitch_1.length; _i++) {
                    var ruleToSwitch = rulesToSwitch_1[_i];
                    switchRuleState(ruleToSwitch, isEnabled, switchRange.pos, switchRange.end);
                }
            }
        }
    });
    return map;
    function switchRuleState(ruleName, isEnable, start, end) {
        var disableRanges = map.get(ruleName);
        if (isEnable) {
            if (disableRanges !== undefined) {
                var lastDisable = disableRanges[disableRanges.length - 1];
                if (lastDisable.end === -1) {
                    lastDisable.end = start;
                    if (end !== -1) {
                        // Disable it again after the enable range is over.
                        disableRanges.push({ pos: end, end: -1 });
                    }
                }
            }
        }
        else { // disable
            if (disableRanges === undefined) {
                map.set(ruleName, [{ pos: start, end: end }]);
            }
            else if (disableRanges[disableRanges.length - 1].end !== -1) {
                disableRanges.push({ pos: start, end: end });
            }
        }
    }
}
/** End will be -1 to indicate no end. */
function getSwitchRange(modifier, range, sourceFile) {
    var lineStarts = sourceFile.getLineStarts();
    switch (modifier) {
        case "line":
            return {
                // start at the beginning of the line where comment starts
                pos: getStartOfLinePosition(range.pos),
                // end at the beginning of the line following the comment
                end: getStartOfLinePosition(range.end, 1),
            };
        case "next-line":
            // start at the beginning of the line following the comment
            var pos = getStartOfLinePosition(range.end, 1);
            if (pos === -1) {
                // no need to switch anything, there is no next line
                return undefined;
            }
            // end at the beginning of the line following the next line
            return { pos: pos, end: getStartOfLinePosition(range.end, 2) };
        default:
            // switch rule for the rest of the file
            // start at the current position, but skip end position
            return { pos: range.pos, end: -1 };
    }
    /** Returns -1 for last line. */
    function getStartOfLinePosition(position, lineOffset) {
        if (lineOffset === void 0) { lineOffset = 0; }
        var line = ts.getLineAndCharacterOfPosition(sourceFile, position).line + lineOffset;
        return line >= lineStarts.length ? -1 : lineStarts[line];
    }
}
function parseComment(commentText) {
    var match = exports.ENABLE_DISABLE_REGEX.exec(commentText);
    if (match === null) {
        return undefined;
    }
    // remove everything matched by the previous regex to get only the specified rules
    // split at whitespaces
    // filter empty items coming from whitespaces at start, at end or empty list
    var rulesList = splitOnSpaces(commentText.substr(match[0].length));
    if (rulesList.length === 0 && match[3] === ":") {
        // nothing to do here: an explicit separator was specified but no rules to switch
        return undefined;
    }
    if (rulesList.length === 0 ||
        rulesList.indexOf("all") !== -1) {
        // if list is empty we default to all enabled rules
        // if `all` is specified we ignore the other rules and take all enabled rules
        rulesList = "all";
    }
    return { rulesList: rulesList, isEnabled: match[1] === "enable", modifier: match[2] };
}
function splitOnSpaces(str) {
    return str.split(/\s+/).filter(function (s) { return s !== ""; });
}
