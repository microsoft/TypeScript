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
        var SyntaxCursor = (function () {
            function SyntaxCursor() {
            }
            var proto_1 = SyntaxCursor.prototype;
            proto_1.currentNode = function () {
                return null;
            };
            return SyntaxCursor;
        }());
    })(Parser = TypeScript.Parser || (TypeScript.Parser = {}));
})(TypeScript || (TypeScript = {}));
(function (TypeScript) {
    ;
    ;
    var PositionedElement = (function () {
        function PositionedElement() {
        }
        var proto_2 = PositionedElement.prototype;
        proto_2.childIndex = function (child) {
            return TypeScript.Syntax.childIndex();
        };
        return PositionedElement;
    }());
    TypeScript.PositionedElement = PositionedElement;
    var PositionedToken = (function () {
        function PositionedToken(parent, token, fullStart) {
        }
        return PositionedToken;
    }());
    TypeScript.PositionedToken = PositionedToken;
})(TypeScript || (TypeScript = {}));
(function (TypeScript) {
    var SyntaxNode = (function () {
        function SyntaxNode() {
        }
        var proto_3 = SyntaxNode.prototype;
        proto_3.findToken = function (position, includeSkippedTokens) {
            if (includeSkippedTokens === void 0) { includeSkippedTokens = false; }
            var positionedToken = this.findTokenInternal(null, position, 0);
            return null;
        };
        proto_3.findTokenInternal = function (x, y, z) {
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
        var VariableWidthTokenWithTrailingTrivia = (function () {
            function VariableWidthTokenWithTrailingTrivia() {
            }
            var proto_4 = VariableWidthTokenWithTrailingTrivia.prototype;
            proto_4.findTokenInternal = function (parent, position, fullStart) {
                return new TypeScript.PositionedToken(parent, this, fullStart);
            };
            return VariableWidthTokenWithTrailingTrivia;
        }());
        Syntax.VariableWidthTokenWithTrailingTrivia = VariableWidthTokenWithTrailingTrivia;
    })(Syntax = TypeScript.Syntax || (TypeScript.Syntax = {}));
})(TypeScript || (TypeScript = {}));
