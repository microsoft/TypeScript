namespace fakes {
    export class CompilerHost extends FakeCompilerHost {
        public readonly shouldAssertInvariants = !Harness.lightMode;
        public getSourceFile(fileName: string, languageVersion: number): ts.SourceFile | undefined {
            const canonicalFileName = this.getCanonicalFileName(vpath.resolve(this.getCurrentDirectory(), fileName));
            const existing = this._sourceFiles.get(canonicalFileName);
            if (existing) return existing;

            const content = this.readFile(canonicalFileName);
            if (content === undefined) return undefined;

            // A virtual file system may shadow another existing virtual file system. This
            // allows us to reuse a common virtual file system structure across multiple
            // tests. If a virtual file is a shadow, it is likely that the file will be
            // reused across multiple tests. In that case, we cache the SourceFile we parse
            // so that it can be reused across multiple tests to avoid the cost of
            // repeatedly parsing the same file over and over (such as lib.d.ts).
            const cacheKey = this.vfs.shadowRoot && `SourceFile[languageVersion=${languageVersion},setParentNodes=${this._setParentNodes}]`;
            if (cacheKey) {
                const meta = this.vfs.filemeta(canonicalFileName);
                const sourceFileFromMetadata = meta.get(cacheKey) as ts.SourceFile | undefined;
                if (sourceFileFromMetadata && sourceFileFromMetadata.getFullText() === content) {
                    this._sourceFiles.set(canonicalFileName, sourceFileFromMetadata);
                    return sourceFileFromMetadata;
                }
            }

            const parsed = ts.createSourceFile(fileName, content, languageVersion, this._setParentNodes || this.shouldAssertInvariants);
            if (this.shouldAssertInvariants) {
                // TODO: Move this into a subclass
                Utils.assertInvariants(parsed, /*parent*/ undefined);
            }

            this._sourceFiles.set(canonicalFileName, parsed);

            if (cacheKey) {
                // store the cached source file on the unshadowed file with the same version.
                const stats = this.vfs.statSync(canonicalFileName);

                let fs = this.vfs;
                while (fs.shadowRoot) {
                    try {
                        const shadowRootStats = fs.shadowRoot.existsSync(canonicalFileName) ? fs.shadowRoot.statSync(canonicalFileName) : undefined!; // TODO: GH#18217
                        if (shadowRootStats.dev !== stats.dev ||
                            shadowRootStats.ino !== stats.ino ||
                            shadowRootStats.mtimeMs !== stats.mtimeMs) {
                            break;
                        }

                        fs = fs.shadowRoot;
                    }
                    catch {
                        break;
                    }
                }

                if (fs !== this.vfs) {
                    fs.filemeta(canonicalFileName).set(cacheKey, parsed);
                }
            }

            return parsed;
        }

    }
    function indentedText(indent: number, text: string) {
        if (!indent) return text;
        let indentText = "";
        for (let i = 0; i < indent; i++) {
            indentText += "  ";
        }
        return `
${indentText}${text}`;
    }

    function expectedDiagnosticMessageToText([message, ...args]: ExpectedDiagnosticMessage) {
        let text = ts.getLocaleSpecificMessage(message);
        if (args.length) {
            text = ts.formatStringFromArgs(text, args);
        }
        return text;
    }

    function expectedDiagnosticMessageChainToText({ message, next }: ExpectedDiagnosticMessageChain, indent = 0) {
        let text = indentedText(indent, expectedDiagnosticMessageToText(message));
        if (next) {
            indent++;
            next.forEach(kid => text += expectedDiagnosticMessageChainToText(kid, indent));
        }
        return text;
    }

    function diagnosticMessageChainToText({ messageText, next}: ts.DiagnosticMessageChain, indent = 0) {
        let text = indentedText(indent, messageText);
        if (next) {
            indent++;
            next.forEach(kid => text += diagnosticMessageChainToText(kid, indent));
        }
        return text;
    }

    function diagnosticRelatedInformationToText({ file, start, length, messageText }: ts.DiagnosticRelatedInformation) {
        const text = typeof messageText === "string" ?
            messageText :
            diagnosticMessageChainToText(messageText);
        return file ?
            `${file.fileName}(${start}:${length}):: ${text}` :
            text;
    }

    function diagnosticToText({ kind, diagnostic: { relatedInformation, ...diagnosticRelatedInformation } }: SolutionBuilderDiagnostic) {
        let text = `${kind}!: ${diagnosticRelatedInformationToText(diagnosticRelatedInformation)}`;
        if (relatedInformation) {
            for (const kid of relatedInformation) {
                text += `
  related:: ${diagnosticRelatedInformationToText(kid)}`;
            }
        }
        return text;
    }

    function expectedDiagnosticRelatedInformationToText({ location, ...diagnosticMessage }: ExpectedDiagnosticRelatedInformation) {
        const text = expectedDiagnosticMessageChainToText(diagnosticMessage);
        if (location) {
            const { file, start, length } = location;
            return `${file}(${start}:${length}):: ${text}`;
        }
        return text;
    }

    function expectedErrorDiagnosticToText({ relatedInformation, ...diagnosticRelatedInformation }: ExpectedErrorDiagnostic) {
        let text = `${DiagnosticKind.Error}!: ${expectedDiagnosticRelatedInformationToText(diagnosticRelatedInformation)}`;
        if (relatedInformation) {
            for (const kid of relatedInformation) {
                text += `
  related:: ${expectedDiagnosticRelatedInformationToText(kid)}`;
            }
        }
        return text;
    }

    function expectedDiagnosticToText(errorOrStatus: ExpectedDiagnostic) {
        return ts.isArray(errorOrStatus) ?
            `${DiagnosticKind.Status}!: ${expectedDiagnosticMessageToText(errorOrStatus)}` :
            expectedErrorDiagnosticToText(errorOrStatus);
    }

    export class SolutionBuilderHost extends FakeSolutionBuilderHost implements ts.SolutionBuilderHost<ts.BuilderProgram> {
        static create(sys: System | vfs.FileSystem, options?: ts.CompilerOptions, setParentNodes?: boolean, createProgram?: ts.CreateProgram<ts.BuilderProgram>) {
            const host = new SolutionBuilderHost(sys, options, setParentNodes, createProgram);
            patchHostForBuildInfoReadWrite(host.sys);
            return host;
        }

        assertDiagnosticMessages(...expectedDiagnostics: ExpectedDiagnostic[]) {
            const actual = this.diagnostics.slice().map(diagnosticToText);
            const expected = expectedDiagnostics.map(expectedDiagnosticToText);
            assert.deepEqual(actual, expected, `Diagnostic arrays did not match:
Actual: ${JSON.stringify(actual, /*replacer*/ undefined, " ")}
Expected: ${JSON.stringify(expected, /*replacer*/ undefined, " ")}`);
        }

        assertErrors(...expectedDiagnostics: ExpectedErrorDiagnostic[]) {
            const actual = this.diagnostics.filter(d => d.kind === DiagnosticKind.Error).map(diagnosticToText);
            const expected = expectedDiagnostics.map(expectedDiagnosticToText);
            assert.deepEqual(actual, expected, `Diagnostics arrays did not match:
Actual: ${JSON.stringify(actual, /*replacer*/ undefined, " ")}
Expected: ${JSON.stringify(expected, /*replacer*/ undefined, " ")}
Actual All:: ${JSON.stringify(this.diagnostics.slice().map(diagnosticToText), /*replacer*/ undefined, " ")}`);
        }

        printDiagnostics(header = "== Diagnostics ==") {
            const out = ts.createDiagnosticReporter(ts.sys);
            ts.sys.write(header + "\r\n");
            for (const { diagnostic } of this.diagnostics) {
                out(diagnostic);
            }
        }


    }
}
