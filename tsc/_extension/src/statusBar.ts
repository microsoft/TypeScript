import * as vscode from "vscode";

export function setupStatusBar(): vscode.Disposable {
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = "$(beaker) tsgo";
    statusBarItem.tooltip = "TypeScript Native Preview Language Server";
    statusBarItem.command = "typescript.native-preview.showMenu";
    statusBarItem.backgroundColor = new vscode.ThemeColor("statusBarItem.warningBackground");
    statusBarItem.show();
    return statusBarItem;
}
