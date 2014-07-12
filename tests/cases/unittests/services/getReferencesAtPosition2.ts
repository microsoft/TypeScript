///<reference path='_project.ts'/>

function testFileForReferenceHighlighting(filename: string, expectedMissingCount ?= 0, expectedExtraCount ?= 0) {
    describe(
        'The file ' + filename + ' has ' + expectedMissingCount + ' missing reference highlights and ' + expectedExtraCount + ' extra reference highlights',
        function(filename: string, expectedMissingCount: number, expectedExtraCount: number) {
            return function() {
                validateReferencesFile(filename, expectedMissingCount, expectedExtraCount);
            }
        }(filename, expectedMissingCount, expectedExtraCount)
    );
}

function validateReferencesFile(filename: string, expectedMissingCount: number, expectedExtraCount: number) {
    var __typescriptLS = new Harness.TypeScriptLS();

    // Read the input file and split it apart into sub-files
    var testFile = IO.readFile(filename);
    var testFileParts = splitFile(testFile);
    
    var testFileNames: string[] = [];
    var testFileContents: string[] = [];
    
    // For each sub-file, add it to the project and collect its spans
    var spans: Span[] = [];
    var caretPositions: Span[] = [];
    var i;
    for(i = 0; i < testFileParts.length; i++) {
        var partSpans: Span[] = [];
        var partCarets: Span[] = [];
        var transformedCode = extractCodeSpans(testFileParts[i], partSpans, partCarets);

        partSpans.forEach(function(sp) {
            sp.fileIndex = i;
            spans.push(sp);
        });

        partCarets.forEach(function(sp) {
            sp.fileIndex = i;
            caretPositions.push(sp);
        });
        
        var tempFilename = 'tempFile' + i + '.ts';
        testFileNames.push(tempFilename);
        testFileContents.push(transformedCode);
        __typescriptLS.addScript(tempFilename , transformedCode);
    }

    // Be sure to do this last so file indices don't get off-by-n'd by the default library
    __typescriptLS.addDefaultLibrary();
    testFileContents.push(Harness.Compiler.libText);
    
    // If there's no caret position, someone screwed up the test authoring
    if(caretPositions.length === 0) {
        throw new Error('No caret positions in ' + filename + ' - did you forget to add some?');
    }
    
    var __ls = __typescriptLS.getLanguageService();

    for(var caretIndex = 0; caretIndex < caretPositions.length; caretIndex++) {
        var caret = caretPositions[caretIndex];
        describe('Returns the correct references at caret position = ' + caret, function() {
            var references = __ls.getReferencesAtPosition(testFileNames[caret.fileIndex], caret.start);
            var referencesList = Span.fromReferenceLines(references);
            referencesList.forEach(function(rf) { rf.getContent(testFileContents); });
            
            var diff = diffLists(spans, referencesList, function(s1, s2) { return s1.equals(s2); });
            if(expectedExtraCount === 0) {
                it('Has no extra highlights', function() {
                    assert.equal('', diff.extraItems.join(', '));
                });
            } else {
                it('Has ' + expectedExtraCount + ' extra highlights', function() {
                    assert.equal(expectedExtraCount, diff.extraItems.length);
                });
            }
                        
            if(expectedMissingCount === 0) {
                it('Has no missing highlights', function() {
                    assert.equal('', diff.missingItems.join(', '));
                });
            } else {
                it('Has ' + expectedMissingCount + ' missing highlights', function() {
                    assert.equal(expectedMissingCount, diff.missingItems.length);
                });
            }
        });
    }
}

interface ListDiffResult {
    areIdentical: boolean;
    extraItems: any[];
    missingItems: any[];
}

function diffLists(expected: any[], actual: any[], equals: (expct: any, actl: any) => boolean) : ListDiffResult {
    var result = { areIdentical: false, extraItems: actual.slice(0), missingItems: expected.slice(0) };
    
    var i, j;
    for(i = 0; i < result.extraItems.length; i++) {
        for(j = 0; j < result.missingItems.length; j++) {
            if(equals(result.missingItems[j], result.extraItems[i])) {
                result.extraItems.splice(i, 1);
                result.missingItems.splice(j, 1);
                i--;
                break;
            }
        }
    }
    
    result.areIdentical = result.extraItems.length === 0 && result.missingItems.length === 0;
    return result;
}

class Span {
    constructor (public start: number, public length: number, public content: string) { }

    public fileIndex: number = null;
    
    public getContent(fileContents: string[]) {
        this.content = fileContents[this.fileIndex].substr(this.start, this.length);
    }
    
    static fromReferenceLine(line: string): Span {
        var parts = line.split(' ');
        var fileNumber = parseInt(parts[0]);
        var start = parseInt(parts[1]);
        var end = parseInt(parts[2]);
    
        var result = new Span(start, end - start, "<???>");
        result.fileIndex = fileNumber;
        return result;
    }

    static fromReferenceLines(lines: string): Span[] {
        var result: Span[] = [];
        lines.split('\n').forEach(function(ln: string) {
            if(ln) {
                result.push(fromReferenceLine(ln));
            }
        });
        return result;
    }    
    
    public toString(): string {
        return '[File = ' + this.fileIndex + ', Start = ' + this.start + ', Length = ' + this.length + ', Content = "' + this.content + '"]';
    }
    
    public equals(other: Span) {
        if(!other) return false;
        // Don't check 'content' as that won't be populated in all cases (it's only for diagnostic purposes)
        return other.start === this.start &&
                other.length === this.length &&
                other.fileIndex === this.fileIndex;
    }
}

function splitFile(contents: string): string[] {
    var delimiterChar = '=';
    var delimiterStr = delimiterChar + delimiterChar + delimiterChar + delimiterChar;
    
    var result: string[] = [];
    
    while(true) {
        var delimIndex = contents.indexOf(delimiterStr);
        if(delimIndex === -1) {
            result.push(contents);
            break;
        } else {
            result.push(contents.substr(0, delimIndex - 1));
            while(contents.charAt(delimIndex) === delimiterChar) {
                delimIndex++;
            }
            contents = contents.substr(delimIndex);
        }
    }
    
    return result;
}

function extractCodeSpans(code: string, outputSpans: Span[], caretPositions: Span[]): string {
    var startTag = '[|';
    var endTag = '|]';
    var caretMarker = '^^';
    var result = code;
    while(true) {
        var caretIndex = result.indexOf(caretMarker);
        var tagStartIndex = result.indexOf(startTag);
        if(tagStartIndex === -1 && caretIndex === -1) break; // No more matches
        
        if(tagStartIndex != -1 && ((tagStartIndex < caretIndex) || (caretIndex === -1))) {
            // Tag series is first
            var tagEndIndex = result.indexOf(endTag, tagStartIndex + tagStartIndex.length);
            if(tagEndIndex === -1) throw new Error('Unbalanced ' + startTag + '/' + endTag + ' pairs - expected to find a ' + startTag);

            var interiorStart = tagStartIndex + startTag.length;
            var content = result.substr(interiorStart, tagEndIndex - interiorStart);
            var contentCaretIndex = content.indexOf(caretMarker);
            // Need to handle the case where there are caret[s] inside the tag markers
            while(contentCaretIndex != -1) {
                caretPositions.push(new Span(contentCaretIndex + tagStartIndex, 0, '<caret>'));
                content = content.substring(0, contentCaretIndex) + content.substring(contentCaretIndex + caretMarker.length);
                contentCaretIndex = content.indexOf(caretMarker);
            }
        
            outputSpans.push(new Span(tagStartIndex, content.length, content));
            result = result.substr(0, tagStartIndex) + content + result.substr(tagEndIndex + endTag.length);
        } else {
            // Cursor marker is first
            caretPositions.push(new Span(caretIndex, 0, '<caret>'));
            result = result.substr(0, caretIndex) + result.substr(caretIndex + caretMarker.length);
        }
    }
    
    return result;
}

var refFile = function(fn) { return Harness.userSpecifiedroot + 'tests/cases/unittests/services/testCode/references/' + fn; };

testFileForReferenceHighlighting(refFile('classLocal.ts'));
    
testFileForReferenceHighlighting(refFile('classParameter.ts'));

testFileForReferenceHighlighting(refFile('comment.ts'));

testFileForReferenceHighlighting(refFile('functionOverloads.ts'));
testFileForReferenceHighlighting(refFile('functionParameter.ts'));

testFileForReferenceHighlighting(refFile('illegalAssignment1.ts'));
testFileForReferenceHighlighting(refFile('illegalAssignment2.ts'));

testFileForReferenceHighlighting(refFile('noContext.ts'));
testFileForReferenceHighlighting(refFile('referenceToClass.ts'));
testFileForReferenceHighlighting(refFile('static.ts'));
