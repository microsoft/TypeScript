/// <reference path="scriptVersionCache.ts"/>

namespace ts.server {

    export class ScriptInfo {
        /**
         * All projects that include this file
         */
        readonly containingProjects: Project[] = [];
        private formatCodeSettings: ts.FormatCodeSettings;
        readonly path: Path;

        private fileWatcher: FileWatcher;
        private svc: ScriptVersionCache;

        // TODO: allow to update hasMixedContent from the outside
        constructor(
            private readonly host: ServerHost,
            readonly fileName: NormalizedPath,
            content: string,
            readonly scriptKind: ScriptKind,
            public isOpen = false,
            public hasMixedContent = false) {

            this.path = toPath(fileName, host.getCurrentDirectory(), createGetCanonicalFileName(host.useCaseSensitiveFileNames));
            this.svc = ScriptVersionCache.fromString(host, content);
            this.scriptKind = scriptKind
                ? scriptKind
                : getScriptKindFromFileName(fileName);
        }

        getFormatCodeSettings() {
            return this.formatCodeSettings;
        }

        attachToProject(project: Project): boolean {
            const isNew = !this.isAttached(project);
            if (isNew) {
                this.containingProjects.push(project);
            }
            return isNew;
        }

        isAttached(project: Project) {
            // unrolled for common cases
            switch (this.containingProjects.length) {
                case 0: return false;
                case 1: return this.containingProjects[0] === project;
                case 2: return this.containingProjects[0] === project || this.containingProjects[1] === project;
                default: return contains(this.containingProjects, project);
            }
        }

        detachFromProject(project: Project) {
            // unrolled for common cases
            switch (this.containingProjects.length) {
                case 0:
                    return;
                case 1:
                    if (this.containingProjects[0] === project) {
                        this.containingProjects.pop();
                    }
                    break;
                case 2:
                    if (this.containingProjects[0] === project) {
                        this.containingProjects[0] = this.containingProjects.pop();
                    }
                    else if (this.containingProjects[1] === project) {
                        this.containingProjects.pop();
                    }
                    break;
                default:
                    removeItemFromSet(this.containingProjects, project);
                    break;
            }
        }

        detachAllProjects() {
            for (const p of this.containingProjects) {
                // detach is unnecessary since we'll clean the list of containing projects anyways
                p.removeFile(this, /*detachFromProjects*/ false);
            }
            this.containingProjects.length = 0;
        }

        getDefaultProject() {
            if (this.containingProjects.length === 0) {
                return Errors.ThrowNoProject();
            }
            Debug.assert(this.containingProjects.length !== 0);
            return this.containingProjects[0];
        }

        setFormatOptions(formatSettings: protocol.FormatOptions): void {
            if (formatSettings) {
                if (!this.formatCodeSettings) {
                    this.formatCodeSettings = getDefaultFormatCodeSettings(this.host);
                }
                mergeMapLikes(this.formatCodeSettings, formatSettings);
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

        saveTo(fileName: string) {
            const snap = this.snap();
            this.host.writeFile(fileName, snap.getText(0, snap.getLength()));
        }

        reloadFromFile() {
            if (this.hasMixedContent) {
                this.reload("");
            }
            else {
                this.svc.reloadFromFile(this.fileName);
                this.markContainingProjectsAsDirty();
            }
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