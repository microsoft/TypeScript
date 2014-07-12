/// <reference path="services.ts"/>

module ts {
    export interface LanguageServiceShimHost {
        log(s: string): void;
        getCompilationSettings(): string;
        getScriptFileNames(): string;
        getScriptVersion(fileName: string): string;
        getScriptIsOpen(fileName: string): boolean;
        getScriptByteOrderMark(fileName: string): number;
        getScriptSnapshot(fileName: string): ScriptSnapshotShim;
        getLocalizedDiagnosticMessages(): string;
       // getCancellationToken(): CancellationToken
    }

    export interface ScriptSnapshotShim {
        // Get's a portion of the script snapshot specified by [start, end).  
        getText(start: number, end: number): string;

        // Get's the length of this script snapshot.
        getLength(): number;

        // This call returns the JSON encoded array of the type:
        //  number[]
        getLineStartPositions(): string;

        // Returns a JSON encoded value of the type:
        //  { span: { start: number; length: number }; newLength: number }
        //
        // Or null value if there was no change.
        getChangeRange(oldSnapshot: ScriptSnapshotShim): string;
    }

    class ScriptSnapshotShimAdapter implements IScriptSnapshot {
        private lineStartPositions: number[] = null;

        constructor(private scriptSnapshotShim: ScriptSnapshotShim) {
        }

        public getText(start: number, end: number): string {
            return this.scriptSnapshotShim.getText(start, end);
        }

        public getLength(): number {
            return this.scriptSnapshotShim.getLength();
        }

        public getLineStartPositions(): number[] {
            if (this.lineStartPositions == null) {
                this.lineStartPositions = JSON.parse(this.scriptSnapshotShim.getLineStartPositions());
            }

            return this.lineStartPositions;
        }


        public getChangeRange(scriptSnapshot: IScriptSnapshot): TextChangeRange {
            function createTextRange(start: number, length: number) {
                function createSpan(start: number, length: number) {
                    return {
                        start: () => start,
                        end: () => start + length,
                        lenth: () => length,
                        isEmpty: () => length === 0
                    };
                }

                return {
                    span: () => createSpan(start, length),
                    newLength: () => length,
                    newSpan: () => createSpan(start, length),
                    isUnchanged: () => length === 0
                };
            }

            var encoded = this.scriptSnapshotShim.getChangeRange((<ScriptSnapshotShimAdapter>scriptSnapshot).scriptSnapshotShim);
            if (encoded == null) {
                return null;
            }

            var decoded: { span: { start: number; length: number; }; newLength: number; } = JSON.parse(encoded);

            return createTextRange(decoded.span.start, decoded.span.length);
        }
    }

    export class LanguageServiceShimHostAdapter implements LanguageServiceHost {
        constructor(private shimHost: LanguageServiceShimHost) {
        }

        public log(s: string): void {
            this.shimHost.log(s);
        }

        public getCompilationSettings(): CompilerOptions {
            var settingsJson = this.shimHost.getCompilationSettings();
            if (settingsJson == null || settingsJson == "") {
                return {};
            }
            var settings: CompilerOptions = JSON.parse(<any>settingsJson);
            return settings;
        }

        public getScriptFileNames(): string[] {
            var encoded = this.shimHost.getScriptFileNames();
            return JSON.parse(encoded);
        }

        public getScriptSnapshot(fileName: string): IScriptSnapshot {
            return new ScriptSnapshotShimAdapter(this.shimHost.getScriptSnapshot(fileName));
        }

        public getScriptVersion(fileName: string): string {
            return this.shimHost.getScriptVersion(fileName);
        }

        public getScriptIsOpen(fileName: string): boolean {
            return this.shimHost.getScriptIsOpen(fileName);
        }

        public getScriptByteOrderMark(fileName: string): ByteOrderMark {
            return this.shimHost.getScriptByteOrderMark(fileName);
        }

        public getLocalizedDiagnosticMessages(): any {
            var diagnosticMessagesJson = this.shimHost.getLocalizedDiagnosticMessages();
            if (diagnosticMessagesJson == null || diagnosticMessagesJson == "") {
                return null;
            }
            try {
                return JSON.parse(diagnosticMessagesJson);
            }
            catch (e) {
                this.log(e.description || "diagnosticMessages.generated.json has invalid JSON format");
                return null;
            }
        }

        //public getCancellationToken(): CancellationToken {
        //    return this.shimHost.getCancellationToken();
        //}


    }
}