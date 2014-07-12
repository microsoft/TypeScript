///<reference path='references.ts' />

module TypeScript {
    export class DepthLimitedWalker extends PositionTrackingWalker {
        private _depth: number = 0;
        private _maximumDepth: number = 0;

        constructor(maximumDepth: number) {
            super();
            this._maximumDepth = maximumDepth;
        }

        public visitNode(node: SyntaxNode): void {
            if (this._depth < this._maximumDepth) {
                this._depth++;
                super.visitNode(node);
                this._depth--;
            }
            else {
                // update the position
                this.skip(node);
            }
        }
    }
}