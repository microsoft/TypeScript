///<reference path='..\..\compiler\types.ts' />

module ts.formatting {

    export function getEndLinePosition(line: number, sourceFile: SourceFile): number {
        var lineStarts = sourceFile.getLineStarts();
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

    export function getNonAdjustedLineAndCharacterFromPosition(position: number, sourceFile: SourceFile): LineAndCharacter {
        var lineAndChar = sourceFile.getLineAndCharacterFromPosition(position);
        return { line: lineAndChar.line - 1, character: lineAndChar.character - 1 };
    }

    export function getStartPositionOfLine(line: number, sourceFile: SourceFile): number {
        return sourceFile.getLineStarts()[line];
    }

    export function getStartLinePositionForPosition(position: number, sourceFile: SourceFile): number {
        var lineStarts = sourceFile.getLineStarts();
        var line = getNonAdjustedLineAndCharacterFromPosition(position, sourceFile).line;
        return lineStarts[line];
    }
}