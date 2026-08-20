import * as vscode from "vscode";
import {
    disabledSchemes,
    isJsConfigOrTsConfigFileName,
    isSupportedLanguageMode,
} from "./util";

/**
 * Tracks the active JS/TS editor.
 *
 * This tries to handle the case where the user focuses in the output view / debug console.
 * When this happens, we want to treat the last real focused editor as the active editor,
 * instead of using `vscode.window.activeTextEditor`.
 */
export class ActiveJsTsEditorTracker implements vscode.Disposable {
    private _activeJsTsEditor: vscode.TextEditor | undefined;
    private disposables: vscode.Disposable[] = [];

    private readonly _onDidChangeActiveJsTsEditor = new vscode.EventEmitter<vscode.TextEditor | undefined>();
    public readonly onDidChangeActiveJsTsEditor = this._onDidChangeActiveJsTsEditor.event;

    constructor() {
        this.disposables.push(this._onDidChangeActiveJsTsEditor);
        this.disposables.push(vscode.window.onDidChangeActiveTextEditor(() => this.update()));
        this.disposables.push(vscode.window.onDidChangeVisibleTextEditors(() => this.update()));
        this.disposables.push(vscode.window.tabGroups.onDidChangeTabGroups(() => this.update()));
        this.update();
    }

    public get activeJsTsEditor(): vscode.TextEditor | undefined {
        return this._activeJsTsEditor;
    }

    private update(): void {
        const editorCandidates = this.getEditorCandidatesForActiveTab();
        const newActiveJsTsEditor = editorCandidates.find(editor => this.isManagedFile(editor));
        if (newActiveJsTsEditor !== undefined && this._activeJsTsEditor !== newActiveJsTsEditor) {
            this._activeJsTsEditor = newActiveJsTsEditor;
            this._onDidChangeActiveJsTsEditor.fire(this._activeJsTsEditor);
        }
    }

    private getEditorCandidatesForActiveTab(): vscode.TextEditor[] {
        const tab = vscode.window.tabGroups.activeTabGroup.activeTab;
        if (!tab) {
            return [];
        }

        // Basic text editor tab
        if (tab.input instanceof vscode.TabInputText) {
            const inputUriString = tab.input.uri.toString();
            const editor = vscode.window.visibleTextEditors.find(editor => {
                return editor.document.uri.toString() === inputUriString
                    && editor.viewColumn === tab.group.viewColumn;
            });
            return editor ? [editor] : [];
        }

        // Diff editor tab
        if (tab.input instanceof vscode.TabInputTextDiff) {
            const original = tab.input.original;
            const modified = tab.input.modified;
            return [vscode.window.activeTextEditor, ...vscode.window.visibleTextEditors]
                .filter((editor): editor is vscode.TextEditor => editor !== undefined)
                .filter(editor => {
                    return (editor.document.uri.toString() === original.toString() || editor.document.uri.toString() === modified.toString())
                        && editor.viewColumn === undefined;
                });
        }

        return [];
    }

    private isManagedFile(editor: vscode.TextEditor): boolean {
        if (disabledSchemes.has(editor.document.uri.scheme)) {
            return false;
        }
        return isSupportedLanguageMode(editor.document) || isJsConfigOrTsConfigFileName(editor.document.fileName);
    }

    dispose(): void {
        this.disposables.forEach(d => d.dispose());
    }
}
