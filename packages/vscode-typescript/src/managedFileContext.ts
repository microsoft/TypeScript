import * as vscode from "vscode";
import { ActiveJsTsEditorTracker } from "./activeJsTsEditorTracker";
import {
    disabledSchemes,
    isJsConfigOrTsConfigFileName,
    isSupportedLanguageMode,
} from "./util";

/**
 * When-clause context set when the current file is managed by tsgo.
 */
export class ManagedFileContextManager implements vscode.Disposable {
    private static readonly contextName = "typescript.isManagedFile";

    private isInManagedFileContext = false;
    private disposables: vscode.Disposable[] = [];

    constructor(activeJsTsEditorTracker: ActiveJsTsEditorTracker) {
        this.disposables.push(
            activeJsTsEditorTracker.onDidChangeActiveJsTsEditor(
                editor => this.onDidChangeActiveTextEditor(editor),
            ),
        );
        this.onDidChangeActiveTextEditor(activeJsTsEditorTracker.activeJsTsEditor);
    }

    private onDidChangeActiveTextEditor(editor?: vscode.TextEditor): void {
        if (editor) {
            this.updateContext(this.isManagedFile(editor));
        }
        else {
            this.updateContext(false);
        }
    }

    private isManagedFile(editor: vscode.TextEditor): boolean {
        if (disabledSchemes.has(editor.document.uri.scheme)) {
            return false;
        }
        return isSupportedLanguageMode(editor.document)
            || isJsConfigOrTsConfigFileName(editor.document.fileName);
    }

    private updateContext(newValue: boolean): void {
        if (newValue === this.isInManagedFileContext) {
            return;
        }
        vscode.commands.executeCommand("setContext", ManagedFileContextManager.contextName, newValue);
        this.isInManagedFileContext = newValue;
    }

    dispose(): void {
        this.updateContext(false);
        this.disposables.forEach(d => d.dispose());
    }
}
