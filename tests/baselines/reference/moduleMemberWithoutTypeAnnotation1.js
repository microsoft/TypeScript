//// [tests/cases/compiler/moduleMemberWithoutTypeAnnotation1.ts] ////

//// [moduleMemberWithoutTypeAnnotation1.ts]
module TypeScript.Parser {
    class SyntaxCursor {
        public currentNode(): SyntaxNode {
            return null;
        }
    }
}

module TypeScript {
    export interface ISyntaxElement { };
    export interface ISyntaxToken { };

    export class PositionedElement {
        public childIndex(child: ISyntaxElement) {
            return Syntax.childIndex();
        }
    }

    export class PositionedToken {
        constructor(parent: PositionedElement, token: ISyntaxToken, fullStart: number) {
        }
    }
}

module TypeScript {
    export class SyntaxNode {
        public findToken(position: number, includeSkippedTokens: boolean = false): PositionedToken {
            var positionedToken = this.findTokenInternal(null, position, 0);
            return null;
        }
        findTokenInternal(x, y, z) {
            return null;
        }
    }
}

module TypeScript.Syntax {
    export function childIndex() { }

    export class VariableWidthTokenWithTrailingTrivia implements ISyntaxToken {
        private findTokenInternal(parent: PositionedElement, position: number, fullStart: number) {
            return new PositionedToken(parent, this, fullStart);
        }
    }
}


//// [moduleMemberWithoutTypeAnnotation1.js]
var TypeScript;
(function (TypeScript) {
    var Parser;
    (function (Parser) {
        var SyntaxCursor = /** @class */ (function () {
            function SyntaxCursor() {
            }
            SyntaxCursor.prototype.currentNode = function () {
                return null;
            };
            return SyntaxCursor;
        }());
    })(Parser = TypeScript.Parser || (TypeScript.Parser = {}));
})(TypeScript || (TypeScript = {}));
(function (TypeScript) {
    ;
    ;
    var PositionedElement = /** @class */ (function () {
        function PositionedElement() {
        }
        PositionedElement.prototype.childIndex = function (child) {
            return TypeScript.Syntax.childIndex();
        };
        return PositionedElement;
    }());
    TypeScript.PositionedElement = PositionedElement;
    var PositionedToken = /** @class */ (function () {
        function PositionedToken(parent, token, fullStart) {
        }
        return PositionedToken;
    }());
    TypeScript.PositionedToken = PositionedToken;
})(TypeScript || (TypeScript = {}));
(function (TypeScript) {
    var SyntaxNode = /** @class */ (function () {
        function SyntaxNode() {
        }
        SyntaxNode.prototype.findToken = function (position, includeSkippedTokens) {
            if (includeSkippedTokens === void 0) { includeSkippedTokens = false; }
            var positionedToken = this.findTokenInternal(null, position, 0);
            return null;
        };
        SyntaxNode.prototype.findTokenInternal = function (x, y, z) {
            return null;
        };
        return SyntaxNode;
    }());
    TypeScript.SyntaxNode = SyntaxNode;
})(TypeScript || (TypeScript = {}));
(function (TypeScript) {
    var Syntax;
    (function (Syntax) {
        function childIndex() { }
        Syntax.childIndex = childIndex;
        var VariableWidthTokenWithTrailingTrivia = /** @class */ (function () {
            function VariableWidthTokenWithTrailingTrivia() {
            }
            VariableWidthTokenWithTrailingTrivia.prototype.findTokenInternal = function (parent, position, fullStart) {
                return new TypeScript.PositionedToken(parent, this, fullStart);
            };
            return VariableWidthTokenWithTrailingTrivia;
        }());
        Syntax.VariableWidthTokenWithTrailingTrivia = VariableWidthTokenWithTrailingTrivia;
    })(Syntax = TypeScript.Syntax || (TypeScript.Syntax = {}));
})(TypeScript || (TypeScript = {}));
