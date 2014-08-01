///<reference path='references.ts' />

module TypeScript.SimpleText {
    class SimpleStringText implements ISimpleText {
        private _lineMap: LineMap = null;

        constructor(private value: string) {
        }

        public length(): number {
            return this.value.length;
        }

        public substr(start: number, length: number): string {
            return this.value.substr(start, length);
        }

        public charCodeAt(index: number): number {
            return this.value.charCodeAt(index);
        }

        public lineMap(): LineMap {
            if (!this._lineMap) {
                this._lineMap = LineMap1.fromString(this.value);
            }

            return this._lineMap;
        }
    }

    // Class which wraps a host IScriptSnapshot and exposes an ISimpleText for newer compiler code. 
    class SimpleScriptSnapshotText implements ISimpleText {
        private _lineMap: LineMap = null;

        constructor(public scriptSnapshot: IScriptSnapshot) {
        }

        public charCodeAt(index: number): number {
            return this.scriptSnapshot.getText(index, index + 1).charCodeAt(0);
        }

        public length(): number {
            return this.scriptSnapshot.getLength();
        }

        public substr(start: number, length: number): string {
            return this.scriptSnapshot.getText(start, start + length);
        }

        public lineMap(): LineMap {
            if (this._lineMap === null) {
                this._lineMap = new LineMap(() => this.scriptSnapshot.getLineStartPositions(), this.length());
            }

            return this._lineMap;
        }
    }

    export function fromString(value: string): ISimpleText {
        return new SimpleStringText(value);
    }

    export function fromScriptSnapshot(scriptSnapshot: IScriptSnapshot): ISimpleText {
        return new SimpleScriptSnapshotText(scriptSnapshot);
    }
}