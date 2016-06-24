/// <reference path="scriptVersionCache.ts"/>

namespace ts.server {

    export class ScriptInfo {
        /**
         * All projects that include this file 
         */
        readonly containingProjects: Project[] = [];
        readonly formatCodeSettings: ts.FormatCodeSettings;
        readonly path: Path;

        private fileWatcher: FileWatcher;
        private svc: ScriptVersionCache;

        constructor(
            private readonly host: ServerHost,
            readonly fileName: NormalizedPath,
            content: string,
            readonly scriptKind: ScriptKind,
            public isOpen = false) {

            this.path = toPath(fileName, host.getCurrentDirectory(), createGetCanonicalFileName(host.useCaseSensitiveFileNames));
            this.svc = ScriptVersionCache.fromString(host, content);
            this.formatCodeSettings = getDefaultFormatCodeSettings(this.host);
            this.scriptKind = scriptKind && scriptKind !== ScriptKind.Unknown
                ? scriptKind
                : getScriptKindFromFileName(fileName);
        }

        attachToProject(project: Project): boolean {
            const isNew = !this.isAttached(project);
            if (isNew) {
                this.containingProjects.push(project);
            }
            return isNew;
        }

        isAttached(project: Project) {
            return contains(this.containingProjects, project);
        }

        detachFromProject(project: Project) {
            removeItemFromSet(this.containingProjects, project);
        }

        detachAllProjects() {
            for (const p of this.containingProjects) {
                // detach is unnecessary since we'll clean the list of containing projects anyways
                p.removeFile(this, /*detachFromProjects*/ false);
            }
            this.containingProjects.length = 0;
        }

        getDefaultProject() {
            Debug.assert(this.containingProjects.length !== 0);
            return this.containingProjects[0];
        }

        setFormatOptions(formatSettings: protocol.FormatOptions): void {
            if (formatSettings) {
                mergeMaps(this.formatCodeSettings, formatSettings);
            }
        }

        setWatcher(watcher: FileWatcher): void {
            this.stopWatcher();
            this.fileWatcher = watcher;
        }

        stopWatcher() {
            if (this.fileWatcher) {
                this.fileWatcher.close();
                this.fileWatcher = undefined;
            }
        }

        getLatestVersion() {
            return this.svc.latestVersion().toString();
        }

        reload(script: string) {
            this.svc.reload(script);
            this.markContainingProjectsAsDirty();
        }

        reloadFromFile() {
            this.svc.reloadFromFile(this.fileName);
            this.markContainingProjectsAsDirty();
        }

        snap() {
            return this.svc.getSnapshot();
        }

        getLineInfo(line: number) {
            const snap = this.snap();
            return snap.index.lineNumberToInfo(line);
        }

        editContent(start: number, end: number, newText: string): void {
            this.svc.edit(start, end - start, newText);
            this.markContainingProjectsAsDirty();
        }

        markContainingProjectsAsDirty() {
            for (const p of this.containingProjects) {
                p.markAsDirty();
            }
        }

        /**
         *  @param line 1 based index
         */
        lineToTextSpan(line: number) {
            const index = this.snap().index;
            const lineInfo = index.lineNumberToInfo(line + 1);
            let len: number;
            if (lineInfo.leaf) {
                len = lineInfo.leaf.text.length;
            }
            else {
                const nextLineInfo = index.lineNumberToInfo(line + 2);
                len = nextLineInfo.offset - lineInfo.offset;
            }
            return ts.createTextSpan(lineInfo.offset, len);
        }

        /**
         * @param line 1 based index
         * @param offset 1 based index
         */
        lineOffsetToPosition(line: number, offset: number): number {
            const index = this.snap().index;

            const lineInfo = index.lineNumberToInfo(line);
            // TODO: assert this offset is actually on the line
            return (lineInfo.offset + offset - 1);
        }

        /**
         * @param line 1-based index
         * @param offset 1-based index
         */
        positionToLineOffset(position: number): ILineInfo {
            const index = this.snap().index;
            const lineOffset = index.charOffsetToLineNumberAndPos(position);
            return { line: lineOffset.line, offset: lineOffset.offset + 1 };
        }
    }
}