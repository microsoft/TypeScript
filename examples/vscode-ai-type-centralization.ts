// VS Code extension sample: AI Type Centralization Diagnostics
import * as vscode from 'vscode';
import { convertToAIDiagnostics } from '../src/compiler/aiDiagnostics';

export function activate(context: vscode.ExtensionContext) {
    vscode.languages.registerCodeActionsProvider('typescript', {
        provideCodeActions(document, range, context, token) {
            // Simulate getting diagnostics from TypeScript/AI
            const diagnostics = getDiagnosticsForDocument(document);
            const aiDiagnostics = convertToAIDiagnostics(diagnostics);
            const actions: vscode.CodeAction[] = [];
            for (const diag of aiDiagnostics) {
                if (diag.highConfidenceFix && diag.suggestions?.length) {
                    const fix = diag.suggestions[0];
                    const action = new vscode.CodeAction(
                        `Move type to central registry: ${fix.description}`,
                        vscode.CodeActionKind.QuickFix
                    );
                    action.command = {
                        title: 'Move type',
                        command: 'extension.moveTypeToRegistry',
                        arguments: [document, diag]
                    };
                    actions.push(action);
                }
                if (diag.why) {
                    // Show explanation in hover or info panel
                    vscode.window.showInformationMessage(`Type Hygiene: ${diag.why}`);
                }
            }
            return actions;
        }
    });

    context.subscriptions.push(
        vscode.commands.registerCommand('extension.moveTypeToRegistry', async (document, diag) => {
            // 1. Extract type definition text
            const typeText = document.getText(new vscode.Range(
                document.positionAt(diag.range.start),
                document.positionAt(diag.range.end)
            ));
            // 2. Determine type name (simple regex)
            const typeNameMatch = typeText.match(/(interface|type|enum|class)\s+([A-Za-z0-9_]+)/);
            if (!typeNameMatch) {
                vscode.window.showErrorMessage('Could not determine type name.');
                return;
            }
            const typeName = typeNameMatch[2];
            const typeFileName = `src/types/${typeName}.ts`;

            // 3. Create new file in src/types/
            const wsEdit = new vscode.WorkspaceEdit();
            const typeFileUri = vscode.Uri.joinPath(vscode.workspace.workspaceFolders?.[0].uri!, typeFileName);
            wsEdit.createFile(typeFileUri, { ignoreIfExists: true });
            wsEdit.insert(typeFileUri, new vscode.Position(0, 0), typeText + '\n');

            // 4. Remove type definition from original file
            wsEdit.delete(document.uri, new vscode.Range(
                document.positionAt(diag.range.start),
                document.positionAt(diag.range.end)
            ));

            // 5. Update imports in all files in workspace
            const files = await vscode.workspace.findFiles('**/*.ts', '**/node_modules/**');
            const importRegex = new RegExp(`import\s+\{?\s*${typeName}\s*\}?\s+from\s+['\"](\.\.?\/[^'\"]*)['\"];?`, 'g');
            for (const file of files) {
                if (file.fsPath === document.uri.fsPath) continue;
                const doc = await vscode.workspace.openTextDocument(file);
                let text = doc.getText();
                let updated = false;
                text = text.replace(importRegex, (match, importPath) => {
                    // Replace import path with new types location
                    updated = true;
                    return match.replace(importPath, '../../types/' + typeName);
                });
                if (updated) {
                    wsEdit.replace(file, new vscode.Range(0, 0, doc.lineCount, 0), text);
                }
            }

            // 6. Apply all edits
            await vscode.workspace.applyEdit(wsEdit);
            await vscode.window.showInformationMessage(`Moved type '${typeName}' to src/types/ and updated imports.`);
        })
    );
}


function getDiagnosticsForDocument(document: vscode.TextDocument): any[] {
    // Fetch real diagnostics from VS Code for the current document
    const vscodeDiagnostics = vscode.languages.getDiagnostics(document.uri);
    // Map VS Code diagnostics to a minimal TypeScript-like diagnostic format
    // (In a real extension, you would use richer TypeScript diagnostics, but this is a bridge)
    return vscodeDiagnostics.map(diag => ({
        code: diag.code as number,
        severity: diag.severity === vscode.DiagnosticSeverity.Error ? "error"
            : diag.severity === vscode.DiagnosticSeverity.Warning ? "warning"
            : diag.severity === vscode.DiagnosticSeverity.Information ? "info" : "suggestion",
        category: "type-checking", // Approximate
        message: diag.message,
        originalMessage: diag.message,
        location: {
            file: document.fileName,
            line: diag.range.start.line + 1,
            column: diag.range.start.character + 1,
            snippet: document.getText(diag.range)
        },
        range: {
            start: document.offsetAt(diag.range.start),
            end: document.offsetAt(diag.range.end)
        },
        // Optionally, add more fields if available
    }));
}
