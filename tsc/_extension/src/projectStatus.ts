import * as vscode from "vscode";
import { ActiveJsTsEditorTracker } from "./activeJsTsEditorTracker";
import { Client } from "./client";
import {
    isSupportedLanguageMode,
    jsTsLanguageModes,
} from "./util";

namespace ProjectInfoState {
    export const enum Type {
        None,
        Pending,
        Resolved,
    }

    export const None = Object.freeze({ type: Type.None } as const);

    export class Pending {
        public readonly type = Type.Pending;
        public readonly cancellation = new vscode.CancellationTokenSource();

        constructor(
            public readonly resource: vscode.Uri,
        ) {}
    }

    export class Resolved {
        public readonly type = Type.Resolved;

        constructor(
            public readonly resource: vscode.Uri,
            public readonly configFile: string,
        ) {}
    }

    export type State = typeof None | Pending | Resolved;
}

/**
 * Shows which tsconfig/jsconfig the current file belongs to.
 */
export class ProjectStatus implements vscode.Disposable {
    private statusItem?: vscode.LanguageStatusItem;
    private state: ProjectInfoState.State = ProjectInfoState.None;
    private disposables: vscode.Disposable[] = [];
    private ready = false;

    constructor(
        private readonly client: Client,
        private readonly activeEditorTracker: ActiveJsTsEditorTracker,
        onReady: vscode.Event<void>,
    ) {
        this.disposables.push(
            activeEditorTracker.onDidChangeActiveJsTsEditor(() => this.updateStatus()),
        );
        this.disposables.push(
            onReady(() => {
                this.ready = true;
                this.updateStatus();
            }),
        );
    }

    private async updateStatus(): Promise<void> {
        const doc = this.activeEditorTracker.activeJsTsEditor?.document;
        if (!doc || !isSupportedLanguageMode(doc)) {
            this.updateState(ProjectInfoState.None);
            return;
        }

        if (doc.uri.scheme !== "file" && doc.uri.scheme !== "untitled") {
            this.updateState(ProjectInfoState.None);
            return;
        }

        if (!this.ready) {
            return;
        }

        const pendingState = new ProjectInfoState.Pending(doc.uri);
        this.updateState(pendingState);

        try {
            const result = await this.client.getProjectInfo(doc.uri.toString(), pendingState.cancellation.token);
            if (this.state === pendingState) {
                this.updateState(new ProjectInfoState.Resolved(doc.uri, result.configFilePath));
            }
        }
        catch {
            // If we fail to get project info, just go back to no status
            if (this.state === pendingState) {
                this.updateState(ProjectInfoState.None);
            }
        }
    }

    private updateState(newState: ProjectInfoState.State): void {
        if (this.state === newState) {
            return;
        }

        if (this.state.type === ProjectInfoState.Type.Pending) {
            this.state.cancellation.cancel();
            this.state.cancellation.dispose();
        }

        this.state = newState;

        switch (this.state.type) {
            case ProjectInfoState.Type.None: {
                this.statusItem?.dispose();
                this.statusItem = undefined;
                break;
            }
            case ProjectInfoState.Type.Pending: {
                const statusItem = this.ensureStatusItem();
                statusItem.severity = vscode.LanguageStatusSeverity.Information;
                statusItem.text = "Loading project info...";
                statusItem.detail = undefined;
                statusItem.command = undefined;
                statusItem.busy = true;
                break;
            }
            case ProjectInfoState.Type.Resolved: {
                const currentLanguageId = this.activeEditorTracker.activeJsTsEditor?.document.languageId;
                const isTypeScript = currentLanguageId === "typescript"
                    || currentLanguageId === "typescriptreact";
                const noConfigFileText = isTypeScript ? "No tsconfig" : "No jsconfig";

                const rootPath = this.getWorkspaceRootForResource(this.state.resource);
                if (!rootPath) {
                    if (this.statusItem) {
                        this.statusItem.text = noConfigFileText;
                        this.statusItem.detail = !vscode.workspace.workspaceFolders
                            ? "No opened folders"
                            : "File is not part of opened folders";
                        this.statusItem.busy = false;
                    }
                    return;
                }

                const statusItem = this.ensureStatusItem();
                statusItem.busy = false;
                statusItem.detail = undefined;
                statusItem.severity = vscode.LanguageStatusSeverity.Information;

                if (this.state.configFile) {
                    statusItem.text = vscode.workspace.asRelativePath(this.state.configFile);
                    statusItem.command = {
                        command: "vscode.open",
                        title: "Open Config File",
                        arguments: [vscode.Uri.file(this.state.configFile)],
                    };
                }
                else {
                    statusItem.text = noConfigFileText;
                    statusItem.command = undefined;
                }
                break;
            }
        }
    }

    private ensureStatusItem(): vscode.LanguageStatusItem {
        if (!this.statusItem) {
            this.statusItem = vscode.languages.createLanguageStatusItem("typescript.native-preview.projectStatus", jsTsLanguageModes);
            this.statusItem.name = "TypeScript Native Preview Project Status";
        }
        return this.statusItem;
    }

    private getWorkspaceRootForResource(resource: vscode.Uri): vscode.Uri | undefined {
        const folder = vscode.workspace.getWorkspaceFolder(resource);
        return folder?.uri;
    }

    dispose(): void {
        this.statusItem?.dispose();
        if (this.state.type === ProjectInfoState.Type.Pending) {
            this.state.cancellation.cancel();
            this.state.cancellation.dispose();
        }
        this.disposables.forEach(d => d.dispose());
    }
}
