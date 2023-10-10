import chalk from "chalk";
import * as path from "path";
import { Diagnostic } from "typescript";


export function printDiagnostics(diag: Diagnostic) {
    const pos = getLineColumn(diag)
    const relative = path.relative(process.cwd(), diag.file?.fileName!);
    console.log(`${chalk.blueBright(relative)}:${pos.line}:${pos.col} - ${diag.messageText}`);
}

export function getLineColumn(diag: Diagnostic) {
    const text = diag.file?.text!
    let line = 1; 
    let lineStart = text.lastIndexOf("\n", diag.start);
    const col = lineStart === -1 ? diag.start!: diag.start!- lineStart;
    while(lineStart > 0) {
        line++
        lineStart = text.lastIndexOf("\n", lineStart - 1);
    }
    return { line, col }
}