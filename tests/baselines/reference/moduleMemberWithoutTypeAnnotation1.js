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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var TypeScript;
(function (TypeScript) {
    var Parser;
    (function (Parser) {
        var SyntaxCursor = (function () {
            function SyntaxCursor() {
            }
            SyntaxCursor.prototype.currentNode = function () {
                return null;
            };
            __names(SyntaxCursor.prototype, ["currentNode"]);
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
        PositionedElement.prototype.childIndex = function (child) {
            return TypeScript.Syntax.childIndex();
        };
        __names(PositionedElement.prototype, ["childIndex"]);
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
        SyntaxNode.prototype.findToken = function (position, includeSkippedTokens) {
            if (includeSkippedTokens === void 0) { includeSkippedTokens = false; }
            var positionedToken = this.findTokenInternal(null, position, 0);
            return null;
        };
        SyntaxNode.prototype.findTokenInternal = function (x, y, z) {
            return null;
        };
        __names(SyntaxNode.prototype, ["findToken", "findTokenInternal"]);
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
            VariableWidthTokenWithTrailingTrivia.prototype.findTokenInternal = function (parent, position, fullStart) {
                return new TypeScript.PositionedToken(parent, this, fullStart);
            };
            __names(VariableWidthTokenWithTrailingTrivia.prototype, ["findTokenInternal"]);
            return VariableWidthTokenWithTrailingTrivia;
        }());
        Syntax.VariableWidthTokenWithTrailingTrivia = VariableWidthTokenWithTrailingTrivia;
    })(Syntax = TypeScript.Syntax || (TypeScript.Syntax = {}));
})(TypeScript || (TypeScript = {}));
