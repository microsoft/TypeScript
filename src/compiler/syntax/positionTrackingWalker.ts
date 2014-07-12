///<reference path='references.ts' />

module TypeScript {
    export class PositionTrackingWalker extends SyntaxWalker {
        private _position: number = 0;

        public visitToken(token: ISyntaxToken): void {
            this._position += token.fullWidth();
        }

        public position(): number {
            return this._position;
        }

        public skip(element: ISyntaxElement): void {
            this._position += element.fullWidth();
        }
    }
}