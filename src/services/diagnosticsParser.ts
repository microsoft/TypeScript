///<reference path='..\compiler\io.ts'/>
///<reference path='..\compiler\typescript.ts'/>
///<reference path='..\..\samples\node\node.d.ts'/>

module DiagnosticsParser {

    class FourSlashGenerator {

        private fsFiles: { [s: string]: IFourSlashFile; };

        constructor(private diagnosticsFile: string) {
            this.fsFiles = {};
        }

        public generate(args: string[]): void {

            if (IO.fileExists(this.diagnosticsFile)) {

                this.parseDiagnostics(args);

                if (args !== undefined) {
                    for (var i = 0; i < args.length; i++) {
                        for (var fsFile in this.fsFiles) {
                            var strippedScriptId = fsFile.replace(/.+\\/, '');
                            if (strippedScriptId === args[i]) {
                                this.writeFile(fsFile);
                            }
                        }
                    }
                } else {
                    for (var fsFile in this.fsFiles) {
                        this.writeFile(fsFile);
                    }
                }

            }
        }

        private parseDiagnostics(args: string[]) {

            var file: string = IO.readFile(this.diagnosticsFile);
            var lines: string[] = file.split('\r\n');

            var updateMode: boolean;
            var scriptId: string;

            var editBlock: string;
            var editRange: TypeScript.ScriptEditRange;

            var startPosition: number;
            var caretPosition: number;
            var collapsingBlock: string;

            var openEditTag = /^.*<Edit>/;
            var closeEditTag = /<Edit\/>.*/;

            // Loops through the lines of the diagnostics file
            for (var i = 0; i < lines.length; i++) {

                // Indicates the user opening a file
                if (lines[i].match(/\/\/=New=\\\\/)) {

                    updateMode = false;

                // Indicates the user making updates to an opened file
                } else if (lines[i].match(/\/\/=Update=\\\\/)) {

                    updateMode = true;

                // Record the filePath of the opened/modified file
                } else if (lines[i].match(/^scriptId: /)) {

                    var newScriptId = lines[i].replace(/^scriptId: /, '');
                    if (scriptId !== undefined && newScriptId !== scriptId && collapsingBlock !== undefined) {
                        this.fsFiles[scriptId].insertAt(startPosition, caretPosition, collapsingBlock);

                        startPosition = undefined;
                        caretPosition = undefined;
                        collapsingBlock = undefined
                    }
                    scriptId = newScriptId;

                // Records the editRange (minChar, limChar, deltaOfCaret)
                } else if (lines[i].match(/^editRange\(/)) {

                    //Capture numbers in editRange(minChar=###, limChar=###, delta=###)
                    var match = /editRange\(minChar=([0-9]+), limChar=([0-9]+), delta=(-?[0-9]+)\)/.exec(lines[i]);
                    if (match !== null) {
                        editRange = new TypeScript.ScriptEditRange(parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10));
                    }

                // Indicates the beginning of added text and records
                } else if (lines[i].match(openEditTag)) {

                    var editLines: string[] = [];

                    lines[i] = lines[i].replace(openEditTag, '');
                    while (lines[i].match(closeEditTag) === null) {
                        editLines.push(lines[i]);
                        i++;
                    }

                    editLines.push(lines[i].replace(closeEditTag, ''));
                    editBlock = editLines.join('\r\n');

                // Indicates the end of the edit block, and then adds the text to the relevant file
                } else if (lines[i].match(/\\\\=====\/\//) && editRange !== null) {

                    if (updateMode) {

                        var range: number = editRange.limChar - editRange.minChar;
                        var deleting: boolean = (range !== 0);

                        if (deleting) {

                            if (collapsingBlock !== undefined) {
                                this.fsFiles[scriptId].insertAt(startPosition, caretPosition, collapsingBlock);
                            }

                            caretPosition = editRange.minChar + (editBlock !== undefined ? editBlock.length : 0);

                            this.fsFiles[scriptId].deleteAt(editRange.limChar, caretPosition, range, editBlock);

                            startPosition = undefined;
                            caretPosition = undefined;
                            collapsingBlock = undefined;

                        } else {
                            if (editRange.minChar === caretPosition) {
                                collapsingBlock += editBlock;
                            } else {
                                if (collapsingBlock !== undefined) {
                                    this.fsFiles[scriptId].insertAt(startPosition, caretPosition, collapsingBlock);
                                }
                                startPosition = editRange.minChar;
                                collapsingBlock = editBlock;
                            }
                            caretPosition = editRange.minChar + editRange.delta;
                        }
                    } else {
                        this.fsFiles[scriptId] = new FourSlashFile(scriptId, editBlock);
                    }
                    editBlock = undefined;
                }
            }

            // Add any text that hasn't been stored to its relevant file
            if (collapsingBlock !== undefined) {
                this.fsFiles[scriptId].insertAt(startPosition, caretPosition, collapsingBlock);
            }
        }

        private writeFile(scriptId: string): void {
            if (this.fsFiles[scriptId] !== undefined) {
                var fsFileName = this.fsFiles[scriptId].getFsFileName();
                IO.writeFile(fsFileName, this.fsFiles[scriptId].getFile());
            }
        }

    }

    interface IFourSlashFile {
        getFile(): string;
        getFsFileName(): string;
        getOriginalScriptId(): string;
        updateInternalFile(minChar: number, limChar: number, content: string): void;
        insertAt(position: number, caretPosition: number, content: string): void;
        deleteAt(position: number, caretPosition: number, amount: number, content?: string): void;
        addInternalState(caretPosition: number): void;
    }

    interface IFourSlashNode {
        getNode(): string;
    }

    class FourSlashFile implements IFourSlashFile {

        private static header = "/// <reference path=\"fourslash.ts\" />" + '\r\n' + '\r\n';

        private fsScriptId: string;

        private commands: IFourSlashNode[];

        private internalState: string;

        constructor(private originalScriptId: string, private startingContent: string) {

            this.fsScriptId = 'tests\\cases\\fourslash\\' + originalScriptId.replace(/.+\\(.+).ts/, '$1_generated.ts');
            this.commands = [];
            this.internalState = startingContent;

        }

        public getFile(): string {
            var file: string;

            //Split on \r\n and add ////
            var rnlines = this.startingContent.split('\r\n');
            rnlines.forEach((line, index, array) => { array[index] = '////' + line });
            var rnfile = rnlines.join('\r\n');

            //Repeat for \n
            var nlines = rnfile.split(/([^\r]\n|\r[^\n])/);
            nlines.forEach((line, index, array) => { if (line.indexOf('////') !== 0) { array[index] = '////' + line } });
            var nfile = nlines.join('\n');

            file = FourSlashFile.header + nfile + '\r\n' + '\r\n';
            this.commands.forEach((command, index, array) => { file += command.getNode() });

            return file;
        }

        private getWithWhitespace(text: string) {
            return text.replace(/ /g, '\u00B7').replace(/\r/g, '\u00B6').replace(/\n/g, '\u2193\n').replace(/\t/g, '\u2192\   ');
        }

        public getFsFileName(): string {
            return this.fsScriptId;
        }

        public getOriginalScriptId(): string {
            return this.originalScriptId;
        }

        public updateInternalFile(minChar: number, limChar: number, content: string): void {
            this.internalState = this.internalState.substring(0, minChar) + content + this.internalState.substr(limChar);
        }

        public insertAt(position: number, caretPosition: number, content: string): void {
            var posOffset = this.getInsertOffset(position);
            var insertNode = new FourSlashInsert(position - posOffset, content.replace(/(\r\n|\r|\n)/g, '\n'));
            this.commands.push(insertNode);
            this.updateInternalFile(position, position, content);
            this.addInternalState(caretPosition);
        }

        public deleteAt(position: number, caretPosition: number, amount: number, content?: string): void {
            var posOffset = this.getInsertOffset(position);
            var amountOffset = this.getDeleteOffset(position, amount);
            var deleteNode = new FourSlashDelete(position - posOffset, amount - amountOffset, (content !== undefined ? content.replace(/(\r\n|\r|\n)/g, '\n') : undefined));
            this.commands.push(deleteNode);
            this.updateInternalFile(position - amount, position, content);
            this.addInternalState(caretPosition);
        }

        public addInternalState(caretPosition: number): void {
            var caretedState = this.internalState.substr(0, caretPosition) + '|' + this.internalState.substr(caretPosition);
            var internalState = new FourSlashStateComment(caretedState);
            this.commands.push(internalState);
        }

        private getInsertOffset(position: number) {
            var offset: number = 0;
            var match = this.internalState.substring(0, position).match(/\r\n/g);
            if (match !== null) {
                offset = match.length;
            }
            offset = (match !== null ? match.length : 0);
            return offset;
        }

        private getDeleteOffset(position: number, amount: number) {
            var offset: number = 0;
            var match = this.internalState.substring(position - amount, position).match(/\r\n/g);
            if (match !== null) {
                offset = match.length;
            }
            return offset;
        }

    }

    class FourSlashInsert implements IFourSlashNode {

        constructor(private position: number, private content: string) {
            this.content = this.content.replace(/([\/\\"'])/g, '\\$1');
            this.content = this.content.replace(/\r\n/g, '\\r\\n');
            this.content = this.content.replace(/(\r|\n)/g, '\\n');
        }

        public getNode(): string {
            var insertNode: string = "goTo.position(" + this.position.toString() + ");" + "\n" +
                                     "edit.insert(\'" + this.content + "\');" + "\n";
            return insertNode;
        }

    }

    class FourSlashDelete implements IFourSlashNode {

        constructor(private position: number, private deletionAmount: number, private content: string) {
            if (this.content !== undefined) {
                this.content = this.content.replace(/([\/\\"'])/g, '\\$1');
                this.content = this.content.replace(/\r\n/g, '\\r\\n');
                this.content = this.content.replace(/(\r|\n)/g, '\\n');
            }
        }

        public getNode(): string {
            var deleteNode: string = "goTo.position(" + this.position.toString() + ");" + "\n" +
                                     "edit.backspace(" + this.deletionAmount + ");" + "\n";
            if (this.content !== undefined && this.content !== "") {
                deleteNode += "edit.insert(\'" + this.content + "\');" + "\n";
            }
            return deleteNode;
        }

    }

    class FourSlashStateComment implements IFourSlashNode {

        constructor(private state: string) { }

        public getNode(): string {

            var lines = this.state.replace(/\r\n|\r|\n/g, '\r\n').split('\n');
            lines.forEach((line, index, array) => { array[index] = '//-' + line; });
            var stateNode = lines.join('\n');

            return stateNode + '\n' + '\n';

        }

    }

    class DiagnosticsLocator {

        private diagnosticsFile: string = 'diagnostics.txt';

        public find(): string {
            return this.findDiagnosticsInFolder("C:/Users");
        }

        private findDiagnosticsInFolder(path: string): string {
            if (IO.directoryExists(path)) {
                var diagnosticsPath = undefined;
                var dir: string[] = IO.dir(path, undefined, { recursive: true });
                for (var i = 0; i < dir.length; i++) {
                    if (dir[i].indexOf(this.diagnosticsFile) !== -1) {
                        diagnosticsPath = dir[i];
                    }
                }
                return diagnosticsPath;
            }
        }

    }

    var diagnosticsFile: string = undefined;
    var diagnosticArgs: string[] = undefined
    if (process.argv.length > 2) {
        if (IO.fileExists(process.argv[2])) {
            diagnosticsFile = process.argv[2];
        }
        //Grab remaining arguments
        diagnosticArgs = process.argv.slice(3, process.argv.length - 1);
    }
    
    if (diagnosticsFile !== undefined) {
        new FourSlashGenerator(diagnosticsFile).generate(diagnosticArgs);
    }

}