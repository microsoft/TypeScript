///<reference path='references.ts' />

module TypeScript {
    export class SyntaxTokenReplacer extends SyntaxRewriter {
        constructor(private token1: ISyntaxToken,
                    private token2: ISyntaxToken) {
            super();
        }

        public visitToken(token: ISyntaxToken): ISyntaxToken {
            if (token === this.token1) {
                // Found the token to replace.  Return the new token and null out our state.  This will 
                // let the later visit methods bail out earlier.
                var result = this.token2;
                this.token1 = null;
                this.token2 = null;

                return result;
            }

            return token;
        }

        public visitNode(node: SyntaxNode): SyntaxNode {
            if (this.token1 === null) {
                return node;
            }

            return super.visitNode(node);
        }

        public visitList(list: ISyntaxList): ISyntaxList {
            if (this.token1 === null) {
                return list;
            }

            return super.visitList(list);
        }

        public visitSeparatedList(list: ISeparatedSyntaxList): ISeparatedSyntaxList {
            if (this.token1 === null) {
                return list;
            }

            return super.visitSeparatedList(list);
        }
    }
}