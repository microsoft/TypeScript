import * as vscode from "vscode";

export function setupStatusBar(context: vscode.ExtensionContext): void {
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = "$(beaker) tsgo";
    statusBarItem.tooltip = "TypeScript Native Preview Language Server";
    statusBarItem.command = "typescript.native-preview.showMenu";
    statusBarItem.backgroundColor = new vscode.ThemeColor("statusBarItem.warningBackground");
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);
}
