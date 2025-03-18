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
    let Parser;
    (function (Parser) {
        class SyntaxCursor {
            currentNode() {
                return null;
            }
        }
    })(Parser = TypeScript.Parser || (TypeScript.Parser = {}));
})(TypeScript || (TypeScript = {}));
(function (TypeScript) {
    ;
    ;
    class PositionedElement {
        childIndex(child) {
            return Syntax.childIndex();
        }
    }
    TypeScript.PositionedElement = PositionedElement;
    class PositionedToken {
        constructor(parent, token, fullStart) {
        }
    }
    TypeScript.PositionedToken = PositionedToken;
})(TypeScript || (TypeScript = {}));
(function (TypeScript) {
    class SyntaxNode {
        findToken(position, includeSkippedTokens = false) {
            var positionedToken = this.findTokenInternal(null, position, 0);
            return null;
        }
        findTokenInternal(x, y, z) {
            return null;
        }
    }
    TypeScript.SyntaxNode = SyntaxNode;
})(TypeScript || (TypeScript = {}));
(function (TypeScript) {
    let Syntax;
    (function (Syntax) {
        function childIndex() { }
        Syntax.childIndex = childIndex;
        class VariableWidthTokenWithTrailingTrivia {
            findTokenInternal(parent, position, fullStart) {
                return new PositionedToken(parent, this, fullStart);
            }
        }
        Syntax.VariableWidthTokenWithTrailingTrivia = VariableWidthTokenWithTrailingTrivia;
    })(Syntax = TypeScript.Syntax || (TypeScript.Syntax = {}));
})(TypeScript || (TypeScript = {}));
