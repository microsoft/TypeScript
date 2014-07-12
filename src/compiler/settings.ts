///<reference path='references.ts' />

module TypeScript {
    /// Compiler settings
    export class CompilationSettings {
        public propagateEnumConstants: boolean = false;
        public removeComments: boolean = false;
        public watch: boolean = false;
        public noResolve: boolean = false;
        public allowAutomaticSemicolonInsertion: boolean = true;
        public noImplicitAny: boolean = false;
        public noLib: boolean = false;
        public codeGenTarget: LanguageVersion = LanguageVersion.EcmaScript3;
        public moduleGenTarget: ModuleGenTarget = ModuleGenTarget.Unspecified;
        public outFileOption: string = "";
        public outDirOption: string = "";
        public mapSourceFiles: boolean = false;
        public mapRoot: string = "";
        public sourceRoot: string = "";
        public generateDeclarationFiles: boolean = false;
        public useCaseSensitiveFileResolution: boolean = false;
        public gatherDiagnostics: boolean = false;
        public codepage: number = null
        public createFileLog: boolean = false;
    }

    export class ImmutableCompilationSettings {
        private static _defaultSettings: ImmutableCompilationSettings;

        private _propagateEnumConstants: boolean;
        private _removeComments: boolean;
        private _watch: boolean;
        private _noResolve: boolean;
        private _allowAutomaticSemicolonInsertion: boolean;
        private _noImplicitAny: boolean;
        private _noLib: boolean;
        private _codeGenTarget: LanguageVersion;
        private _moduleGenTarget: ModuleGenTarget;
        private _outFileOption: string;
        private _outDirOption: string;
        private _mapSourceFiles: boolean;
        private _mapRoot: string;
        private _sourceRoot: string;
        private _generateDeclarationFiles: boolean;
        private _useCaseSensitiveFileResolution: boolean;
        private _gatherDiagnostics: boolean;
        private _codepage: number;
        private _createFileLog: boolean;

        public propagateEnumConstants() { return this._propagateEnumConstants; }
        public removeComments() { return this._removeComments; }
        public watch() { return this._watch; }
        public noResolve() { return this._noResolve; }
        public allowAutomaticSemicolonInsertion() { return this._allowAutomaticSemicolonInsertion; }
        public noImplicitAny() { return this._noImplicitAny; }
        public noLib() { return this._noLib; }
        public codeGenTarget() { return this._codeGenTarget; }
        public moduleGenTarget() { return this._moduleGenTarget; }
        public outFileOption() { return this._outFileOption; }
        public outDirOption() { return this._outDirOption; }
        public mapSourceFiles() { return this._mapSourceFiles; }
        public mapRoot() { return this._mapRoot; }
        public sourceRoot() { return this._sourceRoot; }
        public generateDeclarationFiles() { return this._generateDeclarationFiles; }
        public useCaseSensitiveFileResolution() { return this._useCaseSensitiveFileResolution; }
        public gatherDiagnostics() { return this._gatherDiagnostics; }
        public codepage() { return this._codepage; }
        public createFileLog() { return this._createFileLog; }

        constructor(
            propagateEnumConstants: boolean,
            removeComments: boolean,
            watch: boolean,
            noResolve: boolean,
            allowAutomaticSemicolonInsertion: boolean,
            noImplicitAny: boolean,
            noLib: boolean,
            codeGenTarget: LanguageVersion,
            moduleGenTarget: ModuleGenTarget,
            outFileOption: string,
            outDirOption: string,
            mapSourceFiles: boolean,
            mapRoot: string,
            sourceRoot: string,
            generateDeclarationFiles: boolean,
            useCaseSensitiveFileResolution: boolean,
            gatherDiagnostics: boolean,
            codepage: number,
            createFileLog: boolean) {

            this._propagateEnumConstants = propagateEnumConstants;
            this._removeComments = removeComments;
            this._watch = watch;
            this._noResolve = noResolve;
            this._allowAutomaticSemicolonInsertion = allowAutomaticSemicolonInsertion;
            this._noImplicitAny = noImplicitAny;
            this._noLib = noLib;
            this._codeGenTarget = codeGenTarget;
            this._moduleGenTarget = moduleGenTarget;
            this._outFileOption = outFileOption;
            this._outDirOption = outDirOption;
            this._mapSourceFiles = mapSourceFiles;
            this._mapRoot = mapRoot;
            this._sourceRoot = sourceRoot;
            this._generateDeclarationFiles = generateDeclarationFiles;
            this._useCaseSensitiveFileResolution = useCaseSensitiveFileResolution;
            this._gatherDiagnostics = gatherDiagnostics;
            this._codepage = codepage;
            this._createFileLog = createFileLog;
        }

        public static defaultSettings() {
            if (!ImmutableCompilationSettings._defaultSettings) {
                ImmutableCompilationSettings._defaultSettings = ImmutableCompilationSettings.fromCompilationSettings(new CompilationSettings());
            }

            return ImmutableCompilationSettings._defaultSettings;
        }

        public static fromCompilationSettings(settings: CompilationSettings): ImmutableCompilationSettings {
            return new ImmutableCompilationSettings(
                settings.propagateEnumConstants,
                settings.removeComments,
                settings.watch,
                settings.noResolve,
                settings.allowAutomaticSemicolonInsertion,
                settings.noImplicitAny,
                settings.noLib,
                settings.codeGenTarget,
                settings.moduleGenTarget,
                settings.outFileOption,
                settings.outDirOption,
                settings.mapSourceFiles,
                settings.mapRoot,
                settings.sourceRoot,
                settings.generateDeclarationFiles,
                settings.useCaseSensitiveFileResolution,
                settings.gatherDiagnostics,
                settings.codepage,
                settings.createFileLog);
        }

        public toCompilationSettings(): any {
            var result = new CompilationSettings();

            var thisAsIndexable: IIndexable<any> = <any>this;
            var resultAsIndexable: IIndexable<any> = <any>result
            for (var name in this) {
                if (this.hasOwnProperty(name) && StringUtilities.startsWith(name, "_")) {
                    resultAsIndexable[name.substr(1)] = thisAsIndexable[name];
                }
            }

            return result;
        }
    }
}