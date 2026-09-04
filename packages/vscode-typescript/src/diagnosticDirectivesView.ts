import * as path from "node:path";
import * as vscode from "vscode";

import type {
    ContentMapperDiagnosticDirective,
    ContentMapperTextRange,
    MappedOutput,
} from "./contentMapperVirtualFiles";

const revealDiagnosticDirectiveCommand = "typescript.native-preview.revealContentMapperDiagnosticDirective";
const diagnosticDirectivesViewId = "typescript.native-preview.contentMapperDiagnosticDirectives";

interface OutputNode {
    readonly kind: "output";
    readonly output: MappedOutput;
}

export interface DiagnosticDirectiveNode {
    readonly kind: "directive";
    readonly output: MappedOutput;
    readonly directive: ContentMapperDiagnosticDirective;
}

type DirectiveTreeNode = OutputNode | DiagnosticDirectiveNode;

export class DiagnosticDirectivesView implements vscode.TreeDataProvider<DirectiveTreeNode>, vscode.Disposable {
    private readonly changeEmitter = new vscode.EventEmitter<DirectiveTreeNode | undefined>();
    private readonly treeView: vscode.TreeView<DirectiveTreeNode>;
    private readonly disposables: vscode.Disposable[] = [];
    private sourceUri: vscode.Uri | undefined;
    private outputs: readonly MappedOutput[] = [];

    readonly onDidChangeTreeData = this.changeEmitter.event;

    constructor(reveal: (node: DiagnosticDirectiveNode) => void | Promise<void>) {
        this.treeView = vscode.window.createTreeView(diagnosticDirectivesViewId, {
            treeDataProvider: this,
            showCollapseAll: true,
        });
        this.treeView.message = vscode.l10n.t("Open virtual documents to inspect diagnostic directives.");
        const revealCommand = vscode.commands.registerCommand(revealDiagnosticDirectiveCommand, reveal);
        this.treeView.onDidChangeVisibility(event => {
            if (event.visible && this.sourceUri) {
                this.changeEmitter.fire(undefined);
            }
        });
        this.disposables.push(this.changeEmitter, this.treeView, revealCommand);
    }

    show(sourceUri: vscode.Uri, outputs: readonly MappedOutput[]): void {
        this.sourceUri = sourceUri;
        this.outputs = outputs;
        this.updateMessage();
        this.changeEmitter.fire(undefined);
    }

    refresh(sourceUri: vscode.Uri, outputs: readonly MappedOutput[] | undefined): void {
        if (sourceUri.toString() !== this.sourceUri?.toString()) {
            return;
        }
        this.outputs = outputs ?? [];
        this.updateMessage();
        this.changeEmitter.fire(undefined);
    }

    getTreeItem(node: DirectiveTreeNode): vscode.TreeItem {
        if (node.kind === "output") {
            const count = node.output.diagnosticDirectives.length;
            const item = new vscode.TreeItem(
                path.basename(node.output.fileName),
                vscode.TreeItemCollapsibleState.Expanded,
            );
            item.description = vscode.l10n.t("{0} {1}", count, count === 1 ? "directive" : "directives");
            item.iconPath = new vscode.ThemeIcon("file-code");
            return item;
        }

        const { directive, output } = node;
        const policy = diagnosticDirectivePolicyName(directive.policy);
        const original = positionAt(output.originalText, directive.originalRange.pos);
        const virtual = positionAt(output.text, directive.virtualRange.pos);
        const item = new vscode.TreeItem(policy, vscode.TreeItemCollapsibleState.None);
        item.description = `${formatPosition(original)} \u2192 ${formatPosition(virtual)}`;
        item.iconPath = new vscode.ThemeIcon(directive.policy === 1 ? "error" : "eye");
        item.command = {
            command: revealDiagnosticDirectiveCommand,
            title: vscode.l10n.t("Reveal Diagnostic Directive"),
            arguments: [node],
        };
        item.tooltip = directiveTooltip(node);
        return item;
    }

    getChildren(node?: DirectiveTreeNode): DirectiveTreeNode[] {
        if (!node) {
            return this.outputs
                .filter(output => output.diagnosticDirectives.length !== 0)
                .map(output => ({ kind: "output", output }));
        }
        if (node.kind === "output") {
            return node.output.diagnosticDirectives.map(directive => ({
                kind: "directive",
                output: node.output,
                directive,
            }));
        }
        return [];
    }

    dispose(): void {
        for (const disposable of this.disposables.splice(0)) {
            disposable.dispose();
        }
    }

    private updateMessage(): void {
        const directiveCount = this.outputs.reduce(
            (count, output) => count + output.diagnosticDirectives.length,
            0,
        );
        this.treeView.description = directiveCount === 0 ? undefined : String(directiveCount);
        this.treeView.message = directiveCount === 0
            ? vscode.l10n.t("The current content-mapped file has no diagnostic directives.")
            : undefined;
    }
}

function directiveTooltip(node: DiagnosticDirectiveNode): vscode.MarkdownString {
    const { directive, output } = node;
    const tooltip = new vscode.MarkdownString();
    tooltip.appendMarkdown(`**${diagnosticDirectivePolicyName(directive.policy)}** in \`${path.basename(output.fileName)}\``);
    tooltip.appendMarkdown(`\n\n${vscode.l10n.t("Original range: {0}", formatRange(output.originalText, directive.originalRange))}`);
    tooltip.appendMarkdown(`\n\n${vscode.l10n.t("Virtual range: {0}", formatRange(output.text, directive.virtualRange))}`);
    if (directive.policy === 1) {
        tooltip.appendMarkdown(`\n\n${vscode.l10n.t("Unused diagnostic code: {0}", directive.unusedCode)}`);
    }
    return tooltip;
}

function diagnosticDirectivePolicyName(policy: number): string {
    switch (policy) {
        case 0:
            return vscode.l10n.t("Ignore");
        case 1:
            return vscode.l10n.t("Expect");
        default:
            return vscode.l10n.t("Unknown ({0})", policy);
    }
}

function formatRange(text: string, range: ContentMapperTextRange): string {
    return `${formatPosition(positionAt(text, range.pos))}\u2013${formatPosition(positionAt(text, range.end))}`;
}

function formatPosition(position: vscode.Position): string {
    return `${position.line + 1}:${position.character + 1}`;
}

function positionAt(text: string, offset: number): vscode.Position {
    const limit = Math.min(Math.max(offset, 0), text.length);
    let line = 0;
    let lineStart = 0;
    for (let index = 0; index < limit; index++) {
        if (text.charCodeAt(index) === 10) {
            line++;
            lineStart = index + 1;
        }
    }
    return new vscode.Position(line, limit - lineStart);
}
