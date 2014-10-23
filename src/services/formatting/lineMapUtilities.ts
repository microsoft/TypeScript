///<reference path='..\..\compiler\types.ts' />

module ts.formatting {

    export function getEndLinePosition(line: number, sourceFile: SourceFile): number {
        Debug.assert(line >= 1);
        var lineStarts = sourceFile.getLineStarts();

        line = line - 1;
        if (line === lineStarts.length - 1) {
            // last line - return EOF
            return sourceFile.text.length - 1;
        }
        else {
            // current line start
            var start = lineStarts[line];
            // take the start position of the next line -1 = it should be some line break
            var pos = lineStarts[line + 1] - 1;
            Debug.assert(isLineBreak(sourceFile.text.charCodeAt(pos)));
            // walk backwards skipping line breaks, stop the the beginning of current line.
            // i.e:
            // <some text>
            // $ <- end of line for this position should match the start position
            while (start <= pos && isLineBreak(sourceFile.text.charCodeAt(pos))) {
                pos--;
            }
            return pos;
        }
    }

    export function getStartPositionOfLine(line: number, sourceFile: SourceFile): number {
        Debug.assert(line >= 1);
        return sourceFile.getLineStarts()[line - 1];
    }

    export function getStartLinePositionForPosition(position: number, sourceFile: SourceFile): number {
        var lineStarts = sourceFile.getLineStarts();
        var line = sourceFile.getLineAndCharacterFromPosition(position).line;
        return lineStarts[line - 1];
    }
}