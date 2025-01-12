import * as ts from "../_namespaces/ts";

export function getEditsForFileRename(
    oldFilePath: string,
    newFilePath: string,
    sourceFile: ts.SourceFile
): ts.FileTextChanges[] {
    const edits: ts.FileTextChanges[] = [];

    // Extract function name from old and new file paths
    const oldFileName = ts.getBaseFileName(oldFilePath).replace(/\.[jt]sx?$/, "");
    const newFileName = ts.getBaseFileName(newFilePath).replace(/\.[jt]sx?$/, "");

    if (!oldFileName || !newFileName) return edits;

    // Traverse the source file to find a matching function
    function visit(node: ts.Node) {
        if (
            ts.isFunctionDeclaration(node) &&
            node.name?.text === oldFileName
        ) {
            edits.push({
                fileName: sourceFile.fileName,
                textChanges: [
                    {
                        newText: newFileName,
                        span: {
                            start: node.name.getStart(),
                            length: node.name.getWidth(),
                        },
                    },
                ],
            });
        }

        ts.forEachChild(node, visit);
    }

    visit(sourceFile);
    return edits;
}
