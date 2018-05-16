"use strict";
/*
 * Copyright 2016 Palantir Technologies, Inc.
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
var tslib_1 = require("tslib");
// Use classes here instead of interfaces because we want runtime type data
var Line = /** @class */ (function () {
    function Line() {
    }
    return Line;
}());
exports.Line = Line;
var CodeLine = /** @class */ (function (_super) {
    tslib_1.__extends(CodeLine, _super);
    function CodeLine(contents) {
        var _this = _super.call(this) || this;
        _this.contents = contents;
        return _this;
    }
    return CodeLine;
}(Line));
exports.CodeLine = CodeLine;
var MessageSubstitutionLine = /** @class */ (function (_super) {
    tslib_1.__extends(MessageSubstitutionLine, _super);
    function MessageSubstitutionLine(key, message) {
        var _this = _super.call(this) || this;
        _this.key = key;
        _this.message = message;
        return _this;
    }
    return MessageSubstitutionLine;
}(Line));
exports.MessageSubstitutionLine = MessageSubstitutionLine;
var ErrorLine = /** @class */ (function (_super) {
    tslib_1.__extends(ErrorLine, _super);
    function ErrorLine(startCol) {
        var _this = _super.call(this) || this;
        _this.startCol = startCol;
        return _this;
    }
    return ErrorLine;
}(Line));
exports.ErrorLine = ErrorLine;
var MultilineErrorLine = /** @class */ (function (_super) {
    tslib_1.__extends(MultilineErrorLine, _super);
    function MultilineErrorLine(startCol) {
        return _super.call(this, startCol) || this;
    }
    return MultilineErrorLine;
}(ErrorLine));
exports.MultilineErrorLine = MultilineErrorLine;
var EndErrorLine = /** @class */ (function (_super) {
    tslib_1.__extends(EndErrorLine, _super);
    function EndErrorLine(startCol, endCol, message) {
        var _this = _super.call(this, startCol) || this;
        _this.endCol = endCol;
        _this.message = message;
        return _this;
    }
    return EndErrorLine;
}(ErrorLine));
exports.EndErrorLine = EndErrorLine;
// example matches (between the quotes):
// "    ~~~~~~~~"
var multilineErrorRegex = /^\s*(~+|~nil)$/;
// "    ~~~~~~~~~   [some error message]"
var endErrorRegex = /^\s*(~+|~nil)\s*\[(.+)\]\s*$/;
// "[shortcut]: full messages goes here!!  "
var messageSubstitutionRegex = /^\[([-\w]+?)]: \s*(.+?)\s*$/;
exports.ZERO_LENGTH_ERROR = "~nil";
/**
 * Maps a line of text from a .lint file to an appropriate Line object
 */
function parseLine(text) {
    var multilineErrorMatch = text.match(multilineErrorRegex);
    if (multilineErrorMatch !== null) {
        var startErrorCol = text.indexOf("~");
        return new MultilineErrorLine(startErrorCol);
    }
    var endErrorMatch = text.match(endErrorRegex);
    if (endErrorMatch !== null) {
        var squiggles = endErrorMatch[1], message = endErrorMatch[2];
        var startErrorCol = text.indexOf("~");
        var zeroLengthError = (squiggles === exports.ZERO_LENGTH_ERROR);
        var endErrorCol = zeroLengthError ? startErrorCol : text.lastIndexOf("~") + 1;
        return new EndErrorLine(startErrorCol, endErrorCol, message);
    }
    var messageSubstitutionMatch = text.match(messageSubstitutionRegex);
    if (messageSubstitutionMatch !== null) {
        var key = messageSubstitutionMatch[1], message = messageSubstitutionMatch[2];
        return new MessageSubstitutionLine(key, message);
    }
    // line doesn't match any syntax for error markup, so it's a line of code to be linted
    return new CodeLine(text);
}
exports.parseLine = parseLine;
/**
 * Maps a Line object to a matching line of text that could be in a .lint file.
 * This is almost the inverse of parseLine.
 * If you ran `printLine(parseLine(someText), code)`, the whitespace in the result may be different than in someText
 * @param line - A Line object to convert to text
 * @param code - If line represents error markup, this is the line of code preceding the markup.
 *               Otherwise, this parameter is not required.
 */
function printLine(line, code) {
    if (line instanceof ErrorLine) {
        if (code === undefined) {
            throw new Error("Must supply argument for code parameter when line is an ErrorLine");
        }
        var leadingSpaces = " ".repeat(line.startCol);
        if (line instanceof MultilineErrorLine) {
            // special case for when the line of code is simply a newline.
            // use "~nil" to indicate the error continues on that line
            if (code.length === 0 && line.startCol === 0) {
                return exports.ZERO_LENGTH_ERROR;
            }
            var tildes = "~".repeat(code.length - leadingSpaces.length);
            return "" + leadingSpaces + tildes;
        }
        else if (line instanceof EndErrorLine) {
            var tildes = "~".repeat(line.endCol - line.startCol);
            if (code.length < line.endCol) {
                // Better than crashing in String.repeat
                throw new Error("Bad error marker at " + JSON.stringify(line));
            }
            var endSpaces = " ".repeat(code.length - line.endCol);
            if (tildes.length === 0) {
                tildes = exports.ZERO_LENGTH_ERROR;
                // because we add "~nil" we need four less spaces than normal at the end
                // always make sure we have at least one space though
                endSpaces = endSpaces.substring(0, Math.max(endSpaces.length - 4, 1));
            }
            return "" + leadingSpaces + tildes + endSpaces + " [" + line.message + "]";
        }
    }
    else if (line instanceof MessageSubstitutionLine) {
        return "[" + line.key + "]: " + line.message;
    }
    else if (line instanceof CodeLine) {
        return line.contents;
    }
    return undefined;
}
exports.printLine = printLine;
