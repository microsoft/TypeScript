/* eslint-disable @typescript-eslint/no-unnecessary-qualifier */

/**
 * Declaration module describing the TypeScript Server protocol
 */
namespace ts.server.protocol {
    // NOTE: If updating this, be sure to also update `allCommandNames` in `testRunner/unittests/tsserver/session.ts`.
    export const enum CommandTypes {
        JsxClosingTag = "jsxClosingTag",
        Brace = "brace",
        /* @internal */
        BraceFull = "brace-full",
        BraceCompletion = "braceCompletion",
        GetSpanOfEnclosingComment = "getSpanOfEnclosingComment",
        Change = "change",
        Close = "close",
        /** @deprecated Prefer CompletionInfo -- see comment on CompletionsResponse */
        Completions = "completions",
        CompletionInfo = "completionInfo",
        /* @internal */
        CompletionsFull = "completions-full",
        CompletionDetails = "completionEntryDetails",
        /* @internal */
        CompletionDetailsFull = "completionEntryDetails-full",
        CompileOnSaveAffectedFileList = "compileOnSaveAffectedFileList",
        CompileOnSaveEmitFile = "compileOnSaveEmitFile",
        Configure = "configure",
        Definition = "definition",
        /* @internal */
        DefinitionFull = "definition-full",
        DefinitionAndBoundSpan = "definitionAndBoundSpan",
        /* @internal */
        DefinitionAndBoundSpanFull = "definitionAndBoundSpan-full",
        Implementation = "implementation",
        /* @internal */
        ImplementationFull = "implementation-full",
        /* @internal */
        EmitOutput = "emit-output",
        Exit = "exit",
        Format = "format",
        Formatonkey = "formatonkey",
        /* @internal */
        FormatFull = "format-full",
        /* @internal */
        FormatonkeyFull = "formatonkey-full",
        /* @internal */
        FormatRangeFull = "formatRange-full",
        Geterr = "geterr",
        GeterrForProject = "geterrForProject",
        SemanticDiagnosticsSync = "semanticDiagnosticsSync",
        SyntacticDiagnosticsSync = "syntacticDiagnosticsSync",
        SuggestionDiagnosticsSync = "suggestionDiagnosticsSync",
        NavBar = "navbar",
        /* @internal */
        NavBarFull = "navbar-full",
        Navto = "navto",
        /* @internal */
        NavtoFull = "navto-full",
        NavTree = "navtree",
        NavTreeFull = "navtree-full",
        /** @deprecated */
        Occurrences = "occurrences",
        DocumentHighlights = "documentHighlights",
        /* @internal */
        DocumentHighlightsFull = "documentHighlights-full",
        Open = "open",
        Quickinfo = "quickinfo",
        /* @internal */
        QuickinfoFull = "quickinfo-full",
        References = "references",
        /* @internal */
        ReferencesFull = "references-full",
        Reload = "reload",
        Rename = "rename",
        /* @internal */
        RenameInfoFull = "rename-full",
        /* @internal */
        RenameLocationsFull = "renameLocations-full",
        Saveto = "saveto",
        SignatureHelp = "signatureHelp",
        /* @internal */
        SignatureHelpFull = "signatureHelp-full",
        Status = "status",
        TypeDefinition = "typeDefinition",
        ProjectInfo = "projectInfo",
        ReloadProjects = "reloadProjects",
        Unknown = "unknown",
        OpenExternalProject = "openExternalProject",
        OpenExternalProjects = "openExternalProjects",
        CloseExternalProject = "closeExternalProject",
        /* @internal */
        SynchronizeProjectList = "synchronizeProjectList",
        /* @internal */
        ApplyChangedToOpenFiles = "applyChangedToOpenFiles",
        UpdateOpen = "updateOpen",
        /* @internal */
        EncodedSyntacticClassificationsFull = "encodedSyntacticClassifications-full",
        /* @internal */
        EncodedSemanticClassificationsFull = "encodedSemanticClassifications-full",
        /* @internal */
        Cleanup = "cleanup",
        GetOutliningSpans = "getOutliningSpans",
        /* @internal */
        GetOutliningSpansFull = "outliningSpans", // Full command name is different for backward compatibility purposes
        TodoComments = "todoComments",
        Indentation = "indentation",
        DocCommentTemplate = "docCommentTemplate",
        /* @internal */
        CompilerOptionsDiagnosticsFull = "compilerOptionsDiagnostics-full",
        /* @internal */
        NameOrDottedNameSpan = "nameOrDottedNameSpan",
        /* @internal */
        BreakpointStatement = "breakpointStatement",
        CompilerOptionsForInferredProjects = "compilerOptionsForInferredProjects",
        GetCodeFixes = "getCodeFixes",
        /* @internal */
        GetCodeFixesFull = "getCodeFixes-full",
        GetCombinedCodeFix = "getCombinedCodeFix",
        /* @internal */
        GetCombinedCodeFixFull = "getCombinedCodeFix-full",
        ApplyCodeActionCommand = "applyCodeActionCommand",
        GetSupportedCodeFixes = "getSupportedCodeFixes",

        GetApplicableRefactors = "getApplicableRefactors",
        GetEditsForRefactor = "getEditsForRefactor",
        /* @internal */
        GetEditsForRefactorFull = "getEditsForRefactor-full",

        OrganizeImports = "organizeImports",
        /* @internal */
        OrganizeImportsFull = "organizeImports-full",
        GetEditsForFileRename = "getEditsForFileRename",
        /* @internal */
        GetEditsForFileRenameFull = "getEditsForFileRename-full",
        ConfigurePlugin = "configurePlugin",
        SelectionRange = "selectionRange",
        /* @internal */
        SelectionRangeFull = "selectionRange-full",

        PrepareCallHierarchy = "prepareCallHierarchy",
        ProvideCallHierarchyIncomingCalls = "provideCallHierarchyIncomingCalls",
        ProvideCallHierarchyOutgoingCalls = "provideCallHierarchyOutgoingCalls",

        // NOTE: If updating this, be sure to also update `allCommandNames` in `testRunner/unittests/tsserver/session.ts`.
    }

    /**
     * A TypeScript Server message
     */
    export interface Message {
        /**
         * Sequence number of the message
         */
        seq: number;

        /**
         * One of "request", "response", or "event"
         */
        type: "request" | "response" | "event";
    }

    /**
     * Client-initiated request message
     */
    export interface Request extends Message {
        type: "request";

        /**
         * The command to execute
         */
        command: string;

        /**
         * Object containing arguments for the command
         */
        arguments?: any;
    }

    /**
     * Request to reload the project structure for all the opened files
     */
    export interface ReloadProjectsRequest extends Message {
        command: CommandTypes.ReloadProjects;
    }

    /**
     * Server-initiated event message
     */
    export interface Event extends Message {
        type: "event";

        /**
         * Name of event
         */
        event: string;

        /**
         * Event-specific information
         */
        body?: any;
    }

    /**
     * Response by server to client request message.
     */
    export interface Response extends Message {
        type: "response";

        /**
         * Sequence number of the request message.
         */
        request_seq: number;

        /**
         * Outcome of the request.
         */
        success: boolean;

        /**
         * The command requested.
         */
        command: string;

        /**
         * If success === false, this should always be provided.
         * Otherwise, may (or may not) contain a success message.
         */
        message?: string;

        /**
         * Contains message body if success === true.
         */
        body?: any;

        /**
         * Contains extra information that plugin can include to be passed on
         */
        metadata?: unknown;

        /**
         * Exposes information about the performance of this request-response pair.
         */
        performanceData?: PerformanceData;
    }

    export interface PerformanceData {
        /**
         * Time spent updating the program graph, in milliseconds.
         */
        updateGraphDurationMs?: number;
    }

    /**
     * Arguments for FileRequest messages.
     */
    export interface FileRequestArgs {
        /**
         * The file for the request (absolute pathname required).
         */
        file: string;

        /*
        * Optional name of project that contains file
        */
        projectFileName?: string;
    }

    export interface StatusRequest extends Request {
        command: CommandTypes.Status;
    }

    export interface StatusResponseBody {
        /**
         * The TypeScript version (`ts.version`).
         */
        version: string;
    }

    /**
     * Response to StatusRequest
     */
    export interface StatusResponse extends Response {
        body: StatusResponseBody;
    }

    /**
     * Requests a JS Doc comment template for a given position
     */
    export interface DocCommentTemplateRequest extends FileLocationRequest {
        command: CommandTypes.DocCommentTemplate;
    }

    /**
     * Response to DocCommentTemplateRequest
     */
    export interface DocCommandTemplateResponse extends Response {
        body?: TextInsertion;
    }

    /**
     * A request to get TODO comments from the file
     */
    export interface TodoCommentRequest extends FileRequest {
        command: CommandTypes.TodoComments;
        arguments: TodoCommentRequestArgs;
    }

    /**
     * Arguments for TodoCommentRequest request.
     */
    export interface TodoCommentRequestArgs extends FileRequestArgs {
        /**
         * Array of target TodoCommentDescriptors that describes TODO comments to be found
         */
        descriptors: TodoCommentDescriptor[];
    }

    /**
     * Response for TodoCommentRequest request.
     */
    export interface TodoCommentsResponse extends Response {
        body?: TodoComment[];
    }

    /**
     * A request to determine if the caret is inside a comment.
     */
    export interface SpanOfEnclosingCommentRequest extends FileLocationRequest {
        command: CommandTypes.GetSpanOfEnclosingComment;
        arguments: SpanOfEnclosingCommentRequestArgs;
    }

    export interface SpanOfEnclosingCommentRequestArgs extends FileLocationRequestArgs {
        /**
         * Requires that the enclosing span be a multi-line comment, or else the request returns undefined.
         */
        onlyMultiLine: boolean;
    }

    /**
     * Request to obtain outlining spans in file.
     */
    export interface OutliningSpansRequest extends FileRequest {
        command: CommandTypes.GetOutliningSpans;
    }

    export interface OutliningSpan {
        /** The span of the document to actually collapse. */
        textSpan: TextSpan;

        /** The span of the document to display when the user hovers over the collapsed span. */
        hintSpan: TextSpan;

        /** The text to display in the editor for the collapsed region. */
        bannerText: string;

        /**
         * Whether or not this region should be automatically collapsed when
         * the 'Collapse to Definitions' command is invoked.
         */
        autoCollapse: boolean;

        /**
         * Classification of the contents of the span
         */
        kind: OutliningSpanKind;
    }

    /**
     * Response to OutliningSpansRequest request.
     */
    export interface OutliningSpansResponse extends Response {
        body?: OutliningSpan[];
    }

    /**
     * Request to obtain outlining spans in file.
     */
    /* @internal */
    export interface OutliningSpansRequestFull extends FileRequest {
        command: CommandTypes.GetOutliningSpansFull;
    }

    /**
     * Response to OutliningSpansRequest request.
     */
    /* @internal */
    export interface OutliningSpansResponseFull extends Response {
        body?: ts.OutliningSpan[];
    }

    /**
     * A request to get indentation for a location in file
     */
    export interface IndentationRequest extends FileLocationRequest {
        command: CommandTypes.Indentation;
        arguments: IndentationRequestArgs;
    }

    /**
     * Response for IndentationRequest request.
     */
    export interface IndentationResponse extends Response {
        body?: IndentationResult;
    }

    /**
     * Indentation result representing where indentation should be placed
     */
    export interface IndentationResult {
        /**
         * The base position in the document that the indent should be relative to
         */
        position: number;
        /**
         * The number of columns the indent should be at relative to the position's column.
         */
        indentation: number;
    }

    /**
     * Arguments for IndentationRequest request.
     */
    export interface IndentationRequestArgs extends FileLocationRequestArgs {
        /**
         * An optional set of settings to be used when computing indentation.
         * If argument is omitted - then it will use settings for file that were previously set via 'configure' request or global settings.
         */
        options?: EditorSettings;
    }

    /**
     * Arguments for ProjectInfoRequest request.
     */
    export interface ProjectInfoRequestArgs extends FileRequestArgs {
        /**
         * Indicate if the file name list of the project is needed
         */
        needFileNameList: boolean;
    }

    /**
     * A request to get the project information of the current file.
     */
    export interface ProjectInfoRequest extends Request {
        command: CommandTypes.ProjectInfo;
        arguments: ProjectInfoRequestArgs;
    }

    /**
     * A request to retrieve compiler options diagnostics for a project
     */
    export interface CompilerOptionsDiagnosticsRequest extends Request {
        arguments: CompilerOptionsDiagnosticsRequestArgs;
    }

    /**
     * Arguments for CompilerOptionsDiagnosticsRequest request.
     */
    export interface CompilerOptionsDiagnosticsRequestArgs {
        /**
         * Name of the project to retrieve compiler options diagnostics.
         */
        projectFileName: string;
    }

    /**
     * Response message body for "projectInfo" request
     */
    export interface ProjectInfo {
        /**
         * For configured project, this is the normalized path of the 'tsconfig.json' file
         * For inferred project, this is undefined
         */
        configFileName: string;
        /**
         * The list of normalized file name in the project, including 'lib.d.ts'
         */
        fileNames?: string[];
        /**
         * Indicates if the project has a active language service instance
         */
        languageServiceDisabled?: boolean;
    }

    /**
     * Represents diagnostic info that includes location of diagnostic in two forms
     * - start position and length of the error span
     * - startLocation and endLocation - a pair of Location objects that store start/end line and offset of the error span.
     */
    export interface DiagnosticWithLinePosition {
        message: string;
        start: number;
        length: number;
        startLocation: Location;
        endLocation: Location;
        category: string;
        code: number;
        /** May store more in future. For now, this will simply be `true` to indicate when a diagnostic is an unused-identifier diagnostic. */
        reportsUnnecessary?: {};
        relatedInformation?: DiagnosticRelatedInformation[];
    }

    /**
     * Response message for "projectInfo" request
     */
    export interface ProjectInfoResponse extends Response {
        body?: ProjectInfo;
    }

    /**
     * Request whose sole parameter is a file name.
     */
    export interface FileRequest extends Request {
        arguments: FileRequestArgs;
    }

    /**
     * Instances of this interface specify a location in a source file:
     * (file, line, character offset), where line and character offset are 1-based.
     */
    export interface FileLocationRequestArgs extends FileRequestArgs {
        /**
         * The line number for the request (1-based).
         */
        line: number;

        /**
         * The character offset (on the line) for the request (1-based).
         */
        offset: number;

        /**
         * Position (can be specified instead of line/offset pair)
         */
        /* @internal */
        position?: number;
    }

    export type FileLocationOrRangeRequestArgs = FileLocationRequestArgs | FileRangeRequestArgs;

    /**
     * Request refactorings at a given position or selection area.
     */
    export interface GetApplicableRefactorsRequest extends Request {
        command: CommandTypes.GetApplicableRefactors;
        arguments: GetApplicableRefactorsRequestArgs;
    }
    export type GetApplicableRefactorsRequestArgs = FileLocationOrRangeRequestArgs & {
        triggerReason?: RefactorTriggerReason
    };

    export type RefactorTriggerReason = "implicit" | "invoked";

    /**
     * Response is a list of available refactorings.
     * Each refactoring exposes one or more "Actions"; a user selects one action to invoke a refactoring
     */
    export interface GetApplicableRefactorsResponse extends Response {
        body?: ApplicableRefactorInfo[];
    }

    /**
     * A set of one or more available refactoring actions, grouped under a parent refactoring.
     */
    export interface ApplicableRefactorInfo {
        /**
         * The programmatic name of the refactoring
         */
        name: string;
        /**
         * A description of this refactoring category to show to the user.
         * If the refactoring gets inlined (see below), this text will not be visible.
         */
        description: string;
        /**
         * Inlineable refactorings can have their actions hoisted out to the top level
         * of a context menu. Non-inlineanable refactorings should always be shown inside
         * their parent grouping.
         *
         * If not specified, this value is assumed to be 'true'
         */
        inlineable?: boolean;

        actions: RefactorActionInfo[];
    }

    /**
     * Represents a single refactoring action - for example, the "Extract Method..." refactor might
     * offer several actions, each corresponding to a surround class or closure to extract into.
     */
    export interface RefactorActionInfo {
        /**
         * The programmatic name of the refactoring action
         */
        name: string;

        /**
         * A description of this refactoring action to show to the user.
         * If the parent refactoring is inlined away, this will be the only text shown,
         * so this description should make sense by itself if the parent is inlineable=true
         */
        description: string;
    }

    export interface GetEditsForRefactorRequest extends Request {
        command: CommandTypes.GetEditsForRefactor;
        arguments: GetEditsForRefactorRequestArgs;
    }

    /**
     * Request the edits that a particular refactoring action produces.
     * Callers must specify the name of the refactor and the name of the action.
     */
    export type GetEditsForRefactorRequestArgs = FileLocationOrRangeRequestArgs & {
        /* The 'name' property from the refactoring that offered this action */
        refactor: string;
        /* The 'name' property from the refactoring action */
        action: string;
    };


    export interface GetEditsForRefactorResponse extends Response {
        body?: RefactorEditInfo;
    }

    export interface RefactorEditInfo {
        edits: FileCodeEdits[];

        /**
         * An optional location where the editor should start a rename operation once
         * the refactoring edits have been applied
         */
        renameLocation?: Location;
        renameFilename?: string;
    }

    /**
     * Organize imports by:
     *   1) Removing unused imports
     *   2) Coalescing imports from the same module
     *   3) Sorting imports
     */
    export interface OrganizeImportsRequest extends Request {
        command: CommandTypes.OrganizeImports;
        arguments: OrganizeImportsRequestArgs;
    }

    export type OrganizeImportsScope = GetCombinedCodeFixScope;

    export interface OrganizeImportsRequestArgs {
        scope: OrganizeImportsScope;
    }

    export interface OrganizeImportsResponse extends Response {
        body: readonly FileCodeEdits[];
    }

    export interface GetEditsForFileRenameRequest extends Request {
        command: CommandTypes.GetEditsForFileRename;
        arguments: GetEditsForFileRenameRequestArgs;
    }

    /** Note: Paths may also be directories. */
    export interface GetEditsForFileRenameRequestArgs {
        readonly oldFilePath: string;
        readonly newFilePath: string;
    }

    export interface GetEditsForFileRenameResponse extends Response {
        body: readonly FileCodeEdits[];
    }

    /**
     * Request for the available codefixes at a specific position.
     */
    export interface CodeFixRequest extends Request {
        command: CommandTypes.GetCodeFixes;
        arguments: CodeFixRequestArgs;
    }

    export interface GetCombinedCodeFixRequest extends Request {
        command: CommandTypes.GetCombinedCodeFix;
        arguments: GetCombinedCodeFixRequestArgs;
    }

    export interface GetCombinedCodeFixResponse extends Response {
        body: CombinedCodeActions;
    }

    export interface ApplyCodeActionCommandRequest extends Request {
        command: CommandTypes.ApplyCodeActionCommand;
        arguments: ApplyCodeActionCommandRequestArgs;
    }

    // All we need is the `success` and `message` fields of Response.
    export interface ApplyCodeActionCommandResponse extends Response {}

    export interface FileRangeRequestArgs extends FileRequestArgs {
        /**
         * The line number for the request (1-based).
         */
        startLine: number;

        /**
         * The character offset (on the line) for the request (1-based).
         */
        startOffset: number;

        /**
         * Position (can be specified instead of line/offset pair)
         */
        /* @internal */
        startPosition?: number;

        /**
         * The line number for the request (1-based).
         */
        endLine: number;

        /**
         * The character offset (on the line) for the request (1-based).
         */
        endOffset: number;

        /**
         * Position (can be specified instead of line/offset pair)
         */
        /* @internal */
        endPosition?: number;
    }

    /**
     * Instances of this interface specify errorcodes on a specific location in a sourcefile.
     */
    export interface CodeFixRequestArgs extends FileRangeRequestArgs {
        /**
         * Errorcodes we want to get the fixes for.
         */
        errorCodes: readonly number[];
    }

    export interface GetCombinedCodeFixRequestArgs {
        scope: GetCombinedCodeFixScope;
        fixId: {};
    }

    export interface GetCombinedCodeFixScope {
        type: "file";
        args: FileRequestArgs;
    }

    export interface ApplyCodeActionCommandRequestArgs {
        /** May also be an array of commands. */
        command: {};
    }

    /**
     * Response for GetCodeFixes request.
     */
    export interface GetCodeFixesResponse extends Response {
        body?: CodeAction[];
    }

    /**
     * A request whose arguments specify a file location (file, line, col).
     */
    export interface FileLocationRequest extends FileRequest {
        arguments: FileLocationRequestArgs;
    }

    /**
     * A request to get codes of supported code fixes.
     */
    export interface GetSupportedCodeFixesRequest extends Request {
        command: CommandTypes.GetSupportedCodeFixes;
    }

    /**
     * A response for GetSupportedCodeFixesRequest request.
     */
    export interface GetSupportedCodeFixesResponse extends Response {
        /**
         * List of error codes supported by the server.
         */
        body?: string[];
    }

    /**
     * A request to get encoded Syntactic classifications for a span in the file
     */
    /** @internal */
    export interface EncodedSyntacticClassificationsRequest extends FileRequest {
        arguments: EncodedSyntacticClassificationsRequestArgs;
    }

    /**
     * Arguments for EncodedSyntacticClassificationsRequest request.
     */
    /** @internal */
    export interface EncodedSyntacticClassificationsRequestArgs extends FileRequestArgs {
        /**
         * Start position of the span.
         */
        start: number;
        /**
         * Length of the span.
         */
        length: number;
    }

    /**
     * A request to get encoded semantic classifications for a span in the file
     */
    /** @internal */
    export interface EncodedSemanticClassificationsRequest extends FileRequest {
        arguments: EncodedSemanticClassificationsRequestArgs;
    }

    /**
     * Arguments for EncodedSemanticClassificationsRequest request.
     */
    /** @internal */
    export interface EncodedSemanticClassificationsRequestArgs extends FileRequestArgs {
        /**
         * Start position of the span.
         */
        start: number;
        /**
         * Length of the span.
         */
        length: number;
    }

    /**
     * Arguments in document highlight request; include: filesToSearch, file,
     * line, offset.
     */
    export interface DocumentHighlightsRequestArgs extends FileLocationRequestArgs {
        /**
         * List of files to search for document highlights.
         */
        filesToSearch: string[];
    }

    /**
     * Go to definition request; value of command field is
     * "definition". Return response giving the file locations that
     * define the symbol found in file at location line, col.
     */
    export interface DefinitionRequest extends FileLocationRequest {
        command: CommandTypes.Definition;
    }

    export interface DefinitionAndBoundSpanRequest extends FileLocationRequest {
        readonly command: CommandTypes.DefinitionAndBoundSpan;
    }

    export interface DefinitionAndBoundSpanResponse extends Response {
        readonly body: DefinitionInfoAndBoundSpan;
    }

    /** @internal */
    export interface EmitOutputRequest extends FileRequest {
        command: CommandTypes.EmitOutput;
        arguments: EmitOutputRequestArgs;
    }
    /** @internal */
    export interface EmitOutputRequestArgs extends FileRequestArgs {
        includeLinePosition?: boolean;
        /** if true - return response as object with emitSkipped and diagnostics */
        richResponse?: boolean;
    }
    /** @internal */
    export interface EmitOutputResponse extends Response {
        readonly body: EmitOutput | ts.EmitOutput;
    }
    /** @internal */
    export interface EmitOutput {
        outputFiles: OutputFile[];
        emitSkipped: boolean;
        diagnostics: Diagnostic[] | DiagnosticWithLinePosition[];
    }

    /**
     * Go to type request; value of command field is
     * "typeDefinition". Return response giving the file locations that
     * define the type for the symbol found in file at location line, col.
     */
    export interface TypeDefinitionRequest extends FileLocationRequest {
        command: CommandTypes.TypeDefinition;
    }

    /**
     * Go to implementation request; value of command field is
     * "implementation". Return response giving the file locations that
     * implement the symbol found in file at location line, col.
     */
    export interface ImplementationRequest extends FileLocationRequest {
        command: CommandTypes.Implementation;
    }

    /**
     * Location in source code expressed as (one-based) line and (one-based) column offset.
     */
    export interface Location {
        line: number;
        offset: number;
    }

    /**
     * Object found in response messages defining a span of text in source code.
     */
    export interface TextSpan {
        /**
         * First character of the definition.
         */
        start: Location;

        /**
         * One character past last character of the definition.
         */
        end: Location;
    }

    /**
     * Object found in response messages defining a span of text in a specific source file.
     */
    export interface FileSpan extends TextSpan {
        /**
         * File containing text span.
         */
        file: string;
    }

    export interface TextSpanWithContext extends TextSpan {
        contextStart?: Location;
        contextEnd?: Location;
    }

    export interface FileSpanWithContext extends FileSpan, TextSpanWithContext {
    }

    export interface DefinitionInfoAndBoundSpan {
        definitions: readonly FileSpanWithContext[];
        textSpan: TextSpan;
    }

    /**
     * Definition response message.  Gives text range for definition.
     */
    export interface DefinitionResponse extends Response {
        body?: FileSpanWithContext[];
    }

    export interface DefinitionInfoAndBoundSpanResponse extends Response {
        body?: DefinitionInfoAndBoundSpan;
    }

    /** @deprecated Use `DefinitionInfoAndBoundSpanResponse` instead. */
    export type DefinitionInfoAndBoundSpanReponse = DefinitionInfoAndBoundSpanResponse;

    /**
     * Definition response message.  Gives text range for definition.
     */
    export interface TypeDefinitionResponse extends Response {
        body?: FileSpanWithContext[];
    }

    /**
     * Implementation response message.  Gives text range for implementations.
     */
    export interface ImplementationResponse extends Response {
        body?: FileSpanWithContext[];
    }

    /**
     * Request to get brace completion for a location in the file.
     */
    export interface BraceCompletionRequest extends FileLocationRequest {
        command: CommandTypes.BraceCompletion;
        arguments: BraceCompletionRequestArgs;
    }

    /**
     * Argument for BraceCompletionRequest request.
     */
    export interface BraceCompletionRequestArgs extends FileLocationRequestArgs {
        /**
         * Kind of opening brace
         */
        openingBrace: string;
    }

    export interface JsxClosingTagRequest extends FileLocationRequest {
        readonly command: CommandTypes.JsxClosingTag;
        readonly arguments: JsxClosingTagRequestArgs;
    }

    export interface JsxClosingTagRequestArgs extends FileLocationRequestArgs {}

    export interface JsxClosingTagResponse extends Response {
        readonly body: TextInsertion;
    }

    /**
     * @deprecated
     * Get occurrences request; value of command field is
     * "occurrences". Return response giving spans that are relevant
     * in the file at a given line and column.
     */
    export interface OccurrencesRequest extends FileLocationRequest {
        command: CommandTypes.Occurrences;
    }

    /** @deprecated */
    export interface OccurrencesResponseItem extends FileSpanWithContext {
        /**
         * True if the occurrence is a write location, false otherwise.
         */
        isWriteAccess: boolean;

        /**
         * True if the occurrence is in a string, undefined otherwise;
         */
        isInString?: true;
    }

    /** @deprecated */
    export interface OccurrencesResponse extends Response {
        body?: OccurrencesResponseItem[];
    }

    /**
     * Get document highlights request; value of command field is
     * "documentHighlights". Return response giving spans that are relevant
     * in the file at a given line and column.
     */
    export interface DocumentHighlightsRequest extends FileLocationRequest {
        command: CommandTypes.DocumentHighlights;
        arguments: DocumentHighlightsRequestArgs;
    }

    /**
     * Span augmented with extra information that denotes the kind of the highlighting to be used for span.
     */
    export interface HighlightSpan extends TextSpanWithContext {
        kind: HighlightSpanKind;
    }

    /**
     * Represents a set of highligh spans for a give name
     */
    export interface DocumentHighlightsItem {
        /**
         * File containing highlight spans.
         */
        file: string;

        /**
         * Spans to highlight in file.
         */
        highlightSpans: HighlightSpan[];
    }

    /**
     * Response for a DocumentHighlightsRequest request.
     */
    export interface DocumentHighlightsResponse extends Response {
        body?: DocumentHighlightsItem[];
    }

    /**
     * Find references request; value of command field is
     * "references". Return response giving the file locations that
     * reference the symbol found in file at location line, col.
     */
    export interface ReferencesRequest extends FileLocationRequest {
        command: CommandTypes.References;
    }

    export interface ReferencesResponseItem extends FileSpanWithContext {
        /** Text of line containing the reference.  Including this
         *  with the response avoids latency of editor loading files
         * to show text of reference line (the server already has
         * loaded the referencing files).
         */
        lineText: string;

        /**
         * True if reference is a write location, false otherwise.
         */
        isWriteAccess: boolean;

        /**
         * True if reference is a definition, false otherwise.
         */
        isDefinition: boolean;
    }

    /**
     * The body of a "references" response message.
     */
    export interface ReferencesResponseBody {
        /**
         * The file locations referencing the symbol.
         */
        refs: readonly ReferencesResponseItem[];

        /**
         * The name of the symbol.
         */
        symbolName: string;

        /**
         * The start character offset of the symbol (on the line provided by the references request).
         */
        symbolStartOffset: number;

        /**
         * The full display name of the symbol.
         */
        symbolDisplayString: string;
    }

    /**
     * Response to "references" request.
     */
    export interface ReferencesResponse extends Response {
        body?: ReferencesResponseBody;
    }

    /**
     * Argument for RenameRequest request.
     */
    export interface RenameRequestArgs extends FileLocationRequestArgs {
        /**
         * Should text at specified location be found/changed in comments?
         */
        findInComments?: boolean;
        /**
         * Should text at specified location be found/changed in strings?
         */
        findInStrings?: boolean;
    }

    /**
     * Rename request; value of command field is "rename". Return
     * response giving the file locations that reference the symbol
     * found in file at location line, col. Also return full display
     * name of the symbol so that client can print it unambiguously.
     */
    export interface RenameRequest extends FileLocationRequest {
        command: CommandTypes.Rename;
        arguments: RenameRequestArgs;
    }

    /* @internal */
    export interface RenameFullRequest extends FileLocationRequest {
        readonly command: CommandTypes.RenameLocationsFull;
        readonly arguments: RenameRequestArgs;
    }

    /* @internal */
    export interface RenameFullResponse extends Response {
        readonly body: readonly RenameLocation[];
    }

    /**
     * Information about the item to be renamed.
     */
    export type RenameInfo = RenameInfoSuccess | RenameInfoFailure;
    export interface RenameInfoSuccess {
        /**
         * True if item can be renamed.
         */
        canRename: true;
        /**
         * File or directory to rename.
         * If set, `getEditsForFileRename` should be called instead of `findRenameLocations`.
         */
        fileToRename?: string;

        /**
         * Display name of the item to be renamed.
         */
        displayName: string;

        /**
         * Full display name of item to be renamed.
         */
        fullDisplayName: string;

        /**
         * The items's kind (such as 'className' or 'parameterName' or plain 'text').
         */
        kind: ScriptElementKind;

        /**
         * Optional modifiers for the kind (such as 'public').
         */
        kindModifiers: string;

        /** Span of text to rename. */
        triggerSpan: TextSpan;
    }
    export interface RenameInfoFailure {
        canRename: false;
        /**
         * Error message if item can not be renamed.
         */
        localizedErrorMessage: string;
    }

    /**
     *  A group of text spans, all in 'file'.
     */
    export interface SpanGroup {
        /** The file to which the spans apply */
        file: string;
        /** The text spans in this group */
        locs: RenameTextSpan[];
    }

    export interface RenameTextSpan extends TextSpanWithContext {
        readonly prefixText?: string;
        readonly suffixText?: string;
    }

    export interface RenameResponseBody {
        /**
         * Information about the item to be renamed.
         */
        info: RenameInfo;

        /**
         * An array of span groups (one per file) that refer to the item to be renamed.
         */
        locs: readonly SpanGroup[];
    }

    /**
     * Rename response message.
     */
    export interface RenameResponse extends Response {
        body?: RenameResponseBody;
    }

    /**
     * Represents a file in external project.
     * External project is project whose set of files, compilation options and open\close state
     * is maintained by the client (i.e. if all this data come from .csproj file in Visual Studio).
     * External project will exist even if all files in it are closed and should be closed explicitly.
     * If external project includes one or more tsconfig.json/jsconfig.json files then tsserver will
     * create configured project for every config file but will maintain a link that these projects were created
     * as a result of opening external project so they should be removed once external project is closed.
     */
    export interface ExternalFile {
        /**
         * Name of file file
         */
        fileName: string;
        /**
         * Script kind of the file
         */
        scriptKind?: ScriptKindName | ts.ScriptKind;
        /**
         * Whether file has mixed content (i.e. .cshtml file that combines html markup with C#/JavaScript)
         */
        hasMixedContent?: boolean;
        /**
         * Content of the file
         */
        content?: string;
    }

    /**
     * Represent an external project
     */
    export interface ExternalProject {
        /**
         * Project name
         */
        projectFileName: string;
        /**
         * List of root files in project
         */
        rootFiles: ExternalFile[];
        /**
         * Compiler options for the project
         */
        options: ExternalProjectCompilerOptions;
        /**
         * @deprecated typingOptions. Use typeAcquisition instead
         */
        typingOptions?: TypeAcquisition;
        /**
         * Explicitly specified type acquisition for the project
         */
        typeAcquisition?: TypeAcquisition;
    }

    export interface CompileOnSaveMixin {
        /**
         * If compile on save is enabled for the project
         */
        compileOnSave?: boolean;
    }

    /**
     * For external projects, some of the project settings are sent together with
     * compiler settings.
     */
    export type ExternalProjectCompilerOptions = CompilerOptions & CompileOnSaveMixin & WatchOptions;

    /**
     * Contains information about current project version
     */
    /* @internal */
    export interface ProjectVersionInfo {
        /**
         * Project name
         */
        projectName: string;
        /**
         * true if project is inferred or false if project is external or configured
         */
        isInferred: boolean;
        /**
         * Project version
         */
        version: number;
        /**
         * Current set of compiler options for project
         */
        options: ts.CompilerOptions;
        /**
         * true if project language service is disabled
         */
        languageServiceDisabled: boolean;
        /**
         * Filename of the last file analyzed before disabling the language service. undefined, if the language service is enabled.
         */
        lastFileExceededProgramSize?: string;
    }

    export interface FileWithProjectReferenceRedirectInfo {
        /**
         * Name of file
         */
        fileName: string;

        /**
         * True if the file is primarily included in a referenced project
         */
        isSourceOfProjectReferenceRedirect: boolean;
    }

    /**
     * Represents a set of changes that happen in project
     */
    export interface ProjectChanges {
        /**
         * List of added files
         */
        added: string[] | FileWithProjectReferenceRedirectInfo[];
        /**
         * List of removed files
         */
        removed: string[] | FileWithProjectReferenceRedirectInfo[];
        /**
         * List of updated files
         */
        updated: string[] | FileWithProjectReferenceRedirectInfo[];
        /**
         * List of files that have had their project reference redirect status updated
         * Only provided when the synchronizeProjectList request has includeProjectReferenceRedirectInfo set to true
         */
        updatedRedirects?: FileWithProjectReferenceRedirectInfo[];
    }

    /**
     * Describes set of files in the project.
     * info might be omitted in case of inferred projects
     * if files is set - then this is the entire set of files in the project
     * if changes is set - then this is the set of changes that should be applied to existing project
     * otherwise - assume that nothing is changed
     */
    /* @internal */
    export interface ProjectFiles {
        /**
         * Information about project verison
         */
        info?: ProjectVersionInfo;
        /**
         * List of files in project (might be omitted if current state of project can be computed using only information from 'changes')
         * This property will have type FileWithProjectReferenceRedirectInfo[] if includeProjectReferenceRedirectInfo is set to true in
         * the corresponding SynchronizeProjectList request; otherwise, it will have type string[].
         */
        files?: string[] | FileWithProjectReferenceRedirectInfo[];
        /**
         * Set of changes in project (omitted if the entire set of files in project should be replaced)
         */
        changes?: ProjectChanges;
    }

    /**
     * Combines project information with project level errors.
     */
    /* @internal */
    export interface ProjectFilesWithDiagnostics extends ProjectFiles {
        /**
         * List of errors in project
         */
        projectErrors: DiagnosticWithLinePosition[];
    }

    /**
     * Represents set of changes in open file
     */
    /* @internal */
    export interface ChangedOpenFile {
        /**
         * Name of file
         */
        fileName: string;
        /**
         * List of changes that should be applied to known open file
         */
        changes: ts.TextChange[];
    }


    /**
     * Information found in a configure request.
     */
    export interface ConfigureRequestArguments {

        /**
         * Information about the host, for example 'Emacs 24.4' or
         * 'Sublime Text version 3075'
         */
        hostInfo?: string;

        /**
         * If present, tab settings apply only to this file.
         */
        file?: string;

        /**
         * The format options to use during formatting and other code editing features.
         */
        formatOptions?: FormatCodeSettings;

        preferences?: UserPreferences;

        /**
         * The host's additional supported .js file extensions
         */
        extraFileExtensions?: FileExtensionInfo[];

        watchOptions?: WatchOptions;
    }

    export const enum WatchFileKind {
        FixedPollingInterval = "FixedPollingInterval",
        PriorityPollingInterval = "PriorityPollingInterval",
        DynamicPriorityPolling = "DynamicPriorityPolling",
        UseFsEvents = "UseFsEvents",
        UseFsEventsOnParentDirectory = "UseFsEventsOnParentDirectory",
    }

    export const enum WatchDirectoryKind {
        UseFsEvents = "UseFsEvents",
        FixedPollingInterval = "FixedPollingInterval",
        DynamicPriorityPolling = "DynamicPriorityPolling",
    }

    export const enum PollingWatchKind {
        FixedInterval = "FixedInterval",
        PriorityInterval = "PriorityInterval",
        DynamicPriority = "DynamicPriority",
    }

    export interface WatchOptions {
        watchFile?: WatchFileKind | ts.WatchFileKind;
        watchDirectory?: WatchDirectoryKind | ts.WatchDirectoryKind;
        fallbackPolling?: PollingWatchKind | ts.PollingWatchKind;
        synchronousWatchDirectory?: boolean;
        [option: string]: CompilerOptionsValue | undefined;
    }

    /**
     *  Configure request; value of command field is "configure".  Specifies
     *  host information, such as host type, tab size, and indent size.
     */
    export interface ConfigureRequest extends Request {
        command: CommandTypes.Configure;
        arguments: ConfigureRequestArguments;
    }

    /**
     * Response to "configure" request.  This is just an acknowledgement, so
     * no body field is required.
     */
    export interface ConfigureResponse extends Response {
    }

    export interface ConfigurePluginRequestArguments {
        pluginName: string;
        configuration: any;
    }

    export interface ConfigurePluginRequest extends Request {
        command: CommandTypes.ConfigurePlugin;
        arguments: ConfigurePluginRequestArguments;
    }

    export interface ConfigurePluginResponse extends Response {
    }

    export interface SelectionRangeRequest extends FileRequest {
        command: CommandTypes.SelectionRange;
        arguments: SelectionRangeRequestArgs;
    }

    export interface SelectionRangeRequestArgs extends FileRequestArgs {
        locations: Location[];
    }

    export interface SelectionRangeResponse extends Response {
        body?: SelectionRange[];
    }

    export interface SelectionRange {
        textSpan: TextSpan;
        parent?: SelectionRange;
    }

    /**
     *  Information found in an "open" request.
     */
    export interface OpenRequestArgs extends FileRequestArgs {
        /**
         * Used when a version of the file content is known to be more up to date than the one on disk.
         * Then the known content will be used upon opening instead of the disk copy
         */
        fileContent?: string;
        /**
         * Used to specify the script kind of the file explicitly. It could be one of the following:
         *      "TS", "JS", "TSX", "JSX"
         */
        scriptKindName?: ScriptKindName;
        /**
         * Used to limit the searching for project config file. If given the searching will stop at this
         * root path; otherwise it will go all the way up to the dist root path.
         */
        projectRootPath?: string;
    }

    export type ScriptKindName = "TS" | "JS" | "TSX" | "JSX";

    /**
     * Open request; value of command field is "open". Notify the
     * server that the client has file open.  The server will not
     * monitor the filesystem for changes in this file and will assume
     * that the client is updating the server (using the change and/or
     * reload messages) when the file changes. Server does not currently
     * send a response to an open request.
     */
    export interface OpenRequest extends Request {
        command: CommandTypes.Open;
        arguments: OpenRequestArgs;
    }

    /**
     * Request to open or update external project
     */
    export interface OpenExternalProjectRequest extends Request {
        command: CommandTypes.OpenExternalProject;
        arguments: OpenExternalProjectArgs;
    }

    /**
     * Arguments to OpenExternalProjectRequest request
     */
    export type OpenExternalProjectArgs = ExternalProject;

    /**
     * Request to open multiple external projects
     */
    export interface OpenExternalProjectsRequest extends Request {
        command: CommandTypes.OpenExternalProjects;
        arguments: OpenExternalProjectsArgs;
    }

    /**
     * Arguments to OpenExternalProjectsRequest
     */
    export interface OpenExternalProjectsArgs {
        /**
         * List of external projects to open or update
         */
        projects: ExternalProject[];
    }

    /**
     * Response to OpenExternalProjectRequest request. This is just an acknowledgement, so
     * no body field is required.
     */
    export interface OpenExternalProjectResponse extends Response {
    }

    /**
     * Response to OpenExternalProjectsRequest request. This is just an acknowledgement, so
     * no body field is required.
     */
    export interface OpenExternalProjectsResponse extends Response {
    }

    /**
     * Request to close external project.
     */
    export interface CloseExternalProjectRequest extends Request {
        command: CommandTypes.CloseExternalProject;
        arguments: CloseExternalProjectRequestArgs;
    }

    /**
     * Arguments to CloseExternalProjectRequest request
     */
    export interface CloseExternalProjectRequestArgs {
        /**
         * Name of the project to close
         */
        projectFileName: string;
    }

    /**
     * Response to CloseExternalProjectRequest request. This is just an acknowledgement, so
     * no body field is required.
     */
    export interface CloseExternalProjectResponse extends Response {
    }

    /**
     * Request to check if given list of projects is up-to-date and synchronize them if necessary
     */
    /* @internal */
    export interface SynchronizeProjectListRequest extends Request {
        arguments: SynchronizeProjectListRequestArgs;
    }

    /**
     * Arguments to SynchronizeProjectListRequest
     */
    /* @internal */
    export interface SynchronizeProjectListRequestArgs {
        /**
         * List of last known projects
         */
        knownProjects: ProjectVersionInfo[];
        /**
         * If true, response specifies whether or not each file in each project
         * is a source from a project reference redirect
         */
        includeProjectReferenceRedirectInfo?: boolean;
    }

    /**
     * Request to synchronize list of open files with the client
     */
    /* @internal */
    export interface ApplyChangedToOpenFilesRequest extends Request {
        arguments: ApplyChangedToOpenFilesRequestArgs;
    }

    /**
     * Arguments to ApplyChangedToOpenFilesRequest
     */
    /* @internal */
    export interface ApplyChangedToOpenFilesRequestArgs {
        /**
         * List of newly open files
         */
        openFiles?: ExternalFile[];
        /**
         * List of open files files that were changes
         */
        changedFiles?: ChangedOpenFile[];
        /**
         * List of files that were closed
         */
        closedFiles?: string[];
    }

    /**
     * Request to synchronize list of open files with the client
     */
    export interface UpdateOpenRequest extends Request {
        command: CommandTypes.UpdateOpen;
        arguments: UpdateOpenRequestArgs;
    }

    /**
     * Arguments to UpdateOpenRequest
     */
    export interface UpdateOpenRequestArgs {
        /**
         * List of newly open files
         */
        openFiles?: OpenRequestArgs[];
        /**
         * List of open files files that were changes
         */
        changedFiles?: FileCodeEdits[];
        /**
         * List of files that were closed
         */
        closedFiles?: string[];
    }

    /**
     * Request to set compiler options for inferred projects.
     * External projects are opened / closed explicitly.
     * Configured projects are opened when user opens loose file that has 'tsconfig.json' or 'jsconfig.json' anywhere in one of containing folders.
     * This configuration file will be used to obtain a list of files and configuration settings for the project.
     * Inferred projects are created when user opens a loose file that is not the part of external project
     * or configured project and will contain only open file and transitive closure of referenced files if 'useOneInferredProject' is false,
     * or all open loose files and its transitive closure of referenced files if 'useOneInferredProject' is true.
     */
    export interface SetCompilerOptionsForInferredProjectsRequest extends Request {
        command: CommandTypes.CompilerOptionsForInferredProjects;
        arguments: SetCompilerOptionsForInferredProjectsArgs;
    }

    /**
     * Argument for SetCompilerOptionsForInferredProjectsRequest request.
     */
    export interface SetCompilerOptionsForInferredProjectsArgs {
        /**
         * Compiler options to be used with inferred projects.
         */
        options: ExternalProjectCompilerOptions;

        /**
         * Specifies the project root path used to scope compiler options.
         * It is an error to provide this property if the server has not been started with
         * `useInferredProjectPerProjectRoot` enabled.
         */
        projectRootPath?: string;
    }

    /**
     * Response to SetCompilerOptionsForInferredProjectsResponse request. This is just an acknowledgement, so
     * no body field is required.
     */
    export interface SetCompilerOptionsForInferredProjectsResponse extends Response {
    }

    /**
     *  Exit request; value of command field is "exit".  Ask the server process
     *  to exit.
     */
    export interface ExitRequest extends Request {
        command: CommandTypes.Exit;
    }

    /**
     * Close request; value of command field is "close". Notify the
     * server that the client has closed a previously open file.  If
     * file is still referenced by open files, the server will resume
     * monitoring the filesystem for changes to file.  Server does not
     * currently send a response to a close request.
     */
    export interface CloseRequest extends FileRequest {
        command: CommandTypes.Close;
    }

    /**
     * Request to obtain the list of files that should be regenerated if target file is recompiled.
     * NOTE: this us query-only operation and does not generate any output on disk.
     */
    export interface CompileOnSaveAffectedFileListRequest extends FileRequest {
        command: CommandTypes.CompileOnSaveAffectedFileList;
    }

    /**
     * Contains a list of files that should be regenerated in a project
     */
    export interface CompileOnSaveAffectedFileListSingleProject {
        /**
         * Project name
         */
        projectFileName: string;
        /**
         * List of files names that should be recompiled
         */
        fileNames: string[];

        /**
         * true if project uses outFile or out compiler option
         */
        projectUsesOutFile: boolean;
    }

    /**
     * Response for CompileOnSaveAffectedFileListRequest request;
     */
    export interface CompileOnSaveAffectedFileListResponse extends Response {
        body: CompileOnSaveAffectedFileListSingleProject[];
    }

    /**
     * Request to recompile the file. All generated outputs (.js, .d.ts or .js.map files) is written on disk.
     */
    export interface CompileOnSaveEmitFileRequest extends FileRequest {
        command: CommandTypes.CompileOnSaveEmitFile;
        arguments: CompileOnSaveEmitFileRequestArgs;
    }

    /**
     * Arguments for CompileOnSaveEmitFileRequest
     */
    export interface CompileOnSaveEmitFileRequestArgs extends FileRequestArgs {
        /**
         * if true - then file should be recompiled even if it does not have any changes.
         */
        forced?: boolean;
        includeLinePosition?: boolean;
        /** if true - return response as object with emitSkipped and diagnostics */
        richResponse?: boolean;
    }

    export interface CompileOnSaveEmitFileResponse extends Response {
        body: boolean | EmitResult;
    }

    export interface EmitResult {
        emitSkipped: boolean;
        diagnostics: Diagnostic[] | DiagnosticWithLinePosition[];
    }

    /**
     * Quickinfo request; value of command field is
     * "quickinfo". Return response giving a quick type and
     * documentation string for the symbol found in file at location
     * line, col.
     */
    export interface QuickInfoRequest extends FileLocationRequest {
        command: CommandTypes.Quickinfo;
    }

    /**
     * Body of QuickInfoResponse.
     */
    export interface QuickInfoResponseBody {
        /**
         * The symbol's kind (such as 'className' or 'parameterName' or plain 'text').
         */
        kind: ScriptElementKind;

        /**
         * Optional modifiers for the kind (such as 'public').
         */
        kindModifiers: string;

        /**
         * Starting file location of symbol.
         */
        start: Location;

        /**
         * One past last character of symbol.
         */
        end: Location;

        /**
         * Type and kind of symbol.
         */
        displayString: string;

        /**
         * Documentation associated with symbol.
         */
        documentation: string;

        /**
         * JSDoc tags associated with symbol.
         */
        tags: JSDocTagInfo[];
    }

    /**
     * Quickinfo response message.
     */
    export interface QuickInfoResponse extends Response {
        body?: QuickInfoResponseBody;
    }

    /**
     * Arguments for format messages.
     */
    export interface FormatRequestArgs extends FileLocationRequestArgs {
        /**
         * Last line of range for which to format text in file.
         */
        endLine: number;

        /**
         * Character offset on last line of range for which to format text in file.
         */
        endOffset: number;

        /**
         * End position of the range for which to format text in file.
         */
        /* @internal */
        endPosition?: number;
        /**
         * Format options to be used.
         */
        options?: FormatCodeSettings;
    }

    /**
     * Format request; value of command field is "format".  Return
     * response giving zero or more edit instructions.  The edit
     * instructions will be sorted in file order.  Applying the edit
     * instructions in reverse to file will result in correctly
     * reformatted text.
     */
    export interface FormatRequest extends FileLocationRequest {
        command: CommandTypes.Format;
        arguments: FormatRequestArgs;
    }

    /**
     * Object found in response messages defining an editing
     * instruction for a span of text in source code.  The effect of
     * this instruction is to replace the text starting at start and
     * ending one character before end with newText. For an insertion,
     * the text span is empty.  For a deletion, newText is empty.
     */
    export interface CodeEdit {
        /**
         * First character of the text span to edit.
         */
        start: Location;

        /**
         * One character past last character of the text span to edit.
         */
        end: Location;

        /**
         * Replace the span defined above with this string (may be
         * the empty string).
         */
        newText: string;
    }

    export interface FileCodeEdits {
        fileName: string;
        textChanges: CodeEdit[];
    }

    export interface CodeFixResponse extends Response {
        /** The code actions that are available */
        body?: CodeFixAction[];
    }

    export interface CodeAction {
        /** Description of the code action to display in the UI of the editor */
        description: string;
        /** Text changes to apply to each file as part of the code action */
        changes: FileCodeEdits[];
        /** A command is an opaque object that should be passed to `ApplyCodeActionCommandRequestArgs` without modification.  */
        commands?: {}[];
    }

    export interface CombinedCodeActions {
        changes: readonly FileCodeEdits[];
        commands?: readonly {}[];
    }

    export interface CodeFixAction extends CodeAction {
        /** Short name to identify the fix, for use by telemetry. */
        fixName: string;
        /**
         * If present, one may call 'getCombinedCodeFix' with this fixId.
         * This may be omitted to indicate that the code fix can't be applied in a group.
         */
        fixId?: {};
        /** Should be present if and only if 'fixId' is. */
        fixAllDescription?: string;
    }

    /**
     * Format and format on key response message.
     */
    export interface FormatResponse extends Response {
        body?: CodeEdit[];
    }

    /**
     * Arguments for format on key messages.
     */
    export interface FormatOnKeyRequestArgs extends FileLocationRequestArgs {
        /**
         * Key pressed (';', '\n', or '}').
         */
        key: string;

        options?: FormatCodeSettings;
    }

    /**
     * Format on key request; value of command field is
     * "formatonkey". Given file location and key typed (as string),
     * return response giving zero or more edit instructions.  The
     * edit instructions will be sorted in file order.  Applying the
     * edit instructions in reverse to file will result in correctly
     * reformatted text.
     */
    export interface FormatOnKeyRequest extends FileLocationRequest {
        command: CommandTypes.Formatonkey;
        arguments: FormatOnKeyRequestArgs;
    }

    export type CompletionsTriggerCharacter = "." | '"' | "'" | "`" | "/" | "@" | "<" | "#";

    /**
     * Arguments for completions messages.
     */
    export interface CompletionsRequestArgs extends FileLocationRequestArgs {
        /**
         * Optional prefix to apply to possible completions.
         */
        prefix?: string;
        /**
         * Character that was responsible for triggering completion.
         * Should be `undefined` if a user manually requested completion.
         */
        triggerCharacter?: CompletionsTriggerCharacter;
        /**
         * @deprecated Use UserPreferences.includeCompletionsForModuleExports
         */
        includeExternalModuleExports?: boolean;
        /**
         * @deprecated Use UserPreferences.includeCompletionsWithInsertText
         */
        includeInsertTextCompletions?: boolean;
    }

    /**
     * Completions request; value of command field is "completions".
     * Given a file location (file, line, col) and a prefix (which may
     * be the empty string), return the possible completions that
     * begin with prefix.
     */
    export interface CompletionsRequest extends FileLocationRequest {
        command: CommandTypes.Completions | CommandTypes.CompletionInfo;
        arguments: CompletionsRequestArgs;
    }

    /**
     * Arguments for completion details request.
     */
    export interface CompletionDetailsRequestArgs extends FileLocationRequestArgs {
        /**
         * Names of one or more entries for which to obtain details.
         */
        entryNames: (string | CompletionEntryIdentifier)[];
    }

    export interface CompletionEntryIdentifier {
        name: string;
        source?: string;
    }

    /**
     * Completion entry details request; value of command field is
     * "completionEntryDetails".  Given a file location (file, line,
     * col) and an array of completion entry names return more
     * detailed information for each completion entry.
     */
    export interface CompletionDetailsRequest extends FileLocationRequest {
        command: CommandTypes.CompletionDetails;
        arguments: CompletionDetailsRequestArgs;
    }

    /**
     * Part of a symbol description.
     */
    export interface SymbolDisplayPart {
        /**
         * Text of an item describing the symbol.
         */
        text: string;

        /**
         * The symbol's kind (such as 'className' or 'parameterName' or plain 'text').
         */
        kind: string;
    }

    /**
     * An item found in a completion response.
     */
    export interface CompletionEntry {
        /**
         * The symbol's name.
         */
        name: string;
        /**
         * The symbol's kind (such as 'className' or 'parameterName').
         */
        kind: ScriptElementKind;
        /**
         * Optional modifiers for the kind (such as 'public').
         */
        kindModifiers?: string;
        /**
         * A string that is used for comparing completion items so that they can be ordered.  This
         * is often the same as the name but may be different in certain circumstances.
         */
        sortText: string;
        /**
         * Text to insert instead of `name`.
         * This is used to support bracketed completions; If `name` might be "a-b" but `insertText` would be `["a-b"]`,
         * coupled with `replacementSpan` to replace a dotted access with a bracket access.
         */
        insertText?: string;
        /**
         * An optional span that indicates the text to be replaced by this completion item.
         * If present, this span should be used instead of the default one.
         * It will be set if the required span differs from the one generated by the default replacement behavior.
         */
        replacementSpan?: TextSpan;
        /**
         * Indicates whether commiting this completion entry will require additional code actions to be
         * made to avoid errors. The CompletionEntryDetails will have these actions.
         */
        hasAction?: true;
        /**
         * Identifier (not necessarily human-readable) identifying where this completion came from.
         */
        source?: string;
        /**
         * If true, this completion should be highlighted as recommended. There will only be one of these.
         * This will be set when we know the user should write an expression with a certain type and that type is an enum or constructable class.
         * Then either that enum/class or a namespace containing it will be the recommended symbol.
         */
        isRecommended?: true;
        /**
         * If true, this completion was generated from traversing the name table of an unchecked JS file,
         * and therefore may not be accurate.
         */
        isFromUncheckedFile?: true;
    }

    /**
     * Additional completion entry details, available on demand
     */
    export interface CompletionEntryDetails {
        /**
         * The symbol's name.
         */
        name: string;
        /**
         * The symbol's kind (such as 'className' or 'parameterName').
         */
        kind: ScriptElementKind;
        /**
         * Optional modifiers for the kind (such as 'public').
         */
        kindModifiers: string;
        /**
         * Display parts of the symbol (similar to quick info).
         */
        displayParts: SymbolDisplayPart[];

        /**
         * Documentation strings for the symbol.
         */
        documentation?: SymbolDisplayPart[];

        /**
         * JSDoc tags for the symbol.
         */
        tags?: JSDocTagInfo[];

        /**
         * The associated code actions for this entry
         */
        codeActions?: CodeAction[];

        /**
         * Human-readable description of the `source` from the CompletionEntry.
         */
        source?: SymbolDisplayPart[];
    }

    /** @deprecated Prefer CompletionInfoResponse, which supports several top-level fields in addition to the array of entries. */
    export interface CompletionsResponse extends Response {
        body?: CompletionEntry[];
    }

    export interface CompletionInfoResponse extends Response {
        body?: CompletionInfo;
    }

    export interface CompletionInfo {
        readonly isGlobalCompletion: boolean;
        readonly isMemberCompletion: boolean;
        readonly isNewIdentifierLocation: boolean;
        readonly entries: readonly CompletionEntry[];
    }

    export interface CompletionDetailsResponse extends Response {
        body?: CompletionEntryDetails[];
    }

    /**
     * Signature help information for a single parameter
     */
    export interface SignatureHelpParameter {

        /**
         * The parameter's name
         */
        name: string;

        /**
         * Documentation of the parameter.
         */
        documentation: SymbolDisplayPart[];

        /**
         * Display parts of the parameter.
         */
        displayParts: SymbolDisplayPart[];

        /**
         * Whether the parameter is optional or not.
         */
        isOptional: boolean;
    }

    /**
     * Represents a single signature to show in signature help.
     */
    export interface SignatureHelpItem {

        /**
         * Whether the signature accepts a variable number of arguments.
         */
        isVariadic: boolean;

        /**
         * The prefix display parts.
         */
        prefixDisplayParts: SymbolDisplayPart[];

        /**
         * The suffix display parts.
         */
        suffixDisplayParts: SymbolDisplayPart[];

        /**
         * The separator display parts.
         */
        separatorDisplayParts: SymbolDisplayPart[];

        /**
         * The signature helps items for the parameters.
         */
        parameters: SignatureHelpParameter[];

        /**
         * The signature's documentation
         */
        documentation: SymbolDisplayPart[];

        /**
         * The signature's JSDoc tags
         */
        tags: JSDocTagInfo[];
    }

    /**
     * Signature help items found in the response of a signature help request.
     */
    export interface SignatureHelpItems {

        /**
         * The signature help items.
         */
        items: SignatureHelpItem[];

        /**
         * The span for which signature help should appear on a signature
         */
        applicableSpan: TextSpan;

        /**
         * The item selected in the set of available help items.
         */
        selectedItemIndex: number;

        /**
         * The argument selected in the set of parameters.
         */
        argumentIndex: number;

        /**
         * The argument count
         */
        argumentCount: number;
    }

    export type SignatureHelpTriggerCharacter = "," | "(" | "<";
    export type SignatureHelpRetriggerCharacter = SignatureHelpTriggerCharacter | ")";

    /**
     * Arguments of a signature help request.
     */
    export interface SignatureHelpRequestArgs extends FileLocationRequestArgs {
        /**
         * Reason why signature help was invoked.
         * See each individual possible
         */
        triggerReason?: SignatureHelpTriggerReason;
    }

    export type SignatureHelpTriggerReason =
        | SignatureHelpInvokedReason
        | SignatureHelpCharacterTypedReason
        | SignatureHelpRetriggeredReason;

    /**
     * Signals that the user manually requested signature help.
     * The language service will unconditionally attempt to provide a result.
     */
    export interface SignatureHelpInvokedReason {
        kind: "invoked";
        triggerCharacter?: undefined;
    }

    /**
     * Signals that the signature help request came from a user typing a character.
     * Depending on the character and the syntactic context, the request may or may not be served a result.
     */
    export interface SignatureHelpCharacterTypedReason {
        kind: "characterTyped";
        /**
         * Character that was responsible for triggering signature help.
         */
        triggerCharacter: SignatureHelpTriggerCharacter;
    }

    /**
     * Signals that this signature help request came from typing a character or moving the cursor.
     * This should only occur if a signature help session was already active and the editor needs to see if it should adjust.
     * The language service will unconditionally attempt to provide a result.
     * `triggerCharacter` can be `undefined` for a retrigger caused by a cursor move.
     */
    export interface SignatureHelpRetriggeredReason {
        kind: "retrigger";
        /**
         * Character that was responsible for triggering signature help.
         */
        triggerCharacter?: SignatureHelpRetriggerCharacter;
    }

    /**
     * Signature help request; value of command field is "signatureHelp".
     * Given a file location (file, line, col), return the signature
     * help.
     */
    export interface SignatureHelpRequest extends FileLocationRequest {
        command: CommandTypes.SignatureHelp;
        arguments: SignatureHelpRequestArgs;
    }

    /**
     * Response object for a SignatureHelpRequest.
     */
    export interface SignatureHelpResponse extends Response {
        body?: SignatureHelpItems;
    }

    /**
     * Synchronous request for semantic diagnostics of one file.
     */
    export interface SemanticDiagnosticsSyncRequest extends FileRequest {
        command: CommandTypes.SemanticDiagnosticsSync;
        arguments: SemanticDiagnosticsSyncRequestArgs;
    }

    export interface SemanticDiagnosticsSyncRequestArgs extends FileRequestArgs {
        includeLinePosition?: boolean;
    }

    /**
     * Response object for synchronous sematic diagnostics request.
     */
    export interface SemanticDiagnosticsSyncResponse extends Response {
        body?: Diagnostic[] | DiagnosticWithLinePosition[];
    }

    export interface SuggestionDiagnosticsSyncRequest extends FileRequest {
        command: CommandTypes.SuggestionDiagnosticsSync;
        arguments: SuggestionDiagnosticsSyncRequestArgs;
    }

    export type SuggestionDiagnosticsSyncRequestArgs = SemanticDiagnosticsSyncRequestArgs;
    export type SuggestionDiagnosticsSyncResponse = SemanticDiagnosticsSyncResponse;

    /**
     * Synchronous request for syntactic diagnostics of one file.
     */
    export interface SyntacticDiagnosticsSyncRequest extends FileRequest {
        command: CommandTypes.SyntacticDiagnosticsSync;
        arguments: SyntacticDiagnosticsSyncRequestArgs;
    }

    export interface SyntacticDiagnosticsSyncRequestArgs extends FileRequestArgs {
        includeLinePosition?: boolean;
    }

    /**
     * Response object for synchronous syntactic diagnostics request.
     */
    export interface SyntacticDiagnosticsSyncResponse extends Response {
        body?: Diagnostic[] | DiagnosticWithLinePosition[];
    }

    /**
     * Arguments for GeterrForProject request.
     */
    export interface GeterrForProjectRequestArgs {
        /**
         * the file requesting project error list
         */
        file: string;

        /**
         * Delay in milliseconds to wait before starting to compute
         * errors for the files in the file list
         */
        delay: number;
    }

    /**
     * GeterrForProjectRequest request; value of command field is
     * "geterrForProject". It works similarly with 'Geterr', only
     * it request for every file in this project.
     */
    export interface GeterrForProjectRequest extends Request {
        command: CommandTypes.GeterrForProject;
        arguments: GeterrForProjectRequestArgs;
    }

    /**
     * Arguments for geterr messages.
     */
    export interface GeterrRequestArgs {
        /**
         * List of file names for which to compute compiler errors.
         * The files will be checked in list order.
         */
        files: string[];

        /**
         * Delay in milliseconds to wait before starting to compute
         * errors for the files in the file list
         */
        delay: number;
    }

    /**
     * Geterr request; value of command field is "geterr". Wait for
     * delay milliseconds and then, if during the wait no change or
     * reload messages have arrived for the first file in the files
     * list, get the syntactic errors for the file, field requests,
     * and then get the semantic errors for the file.  Repeat with a
     * smaller delay for each subsequent file on the files list.  Best
     * practice for an editor is to send a file list containing each
     * file that is currently visible, in most-recently-used order.
     */
    export interface GeterrRequest extends Request {
        command: CommandTypes.Geterr;
        arguments: GeterrRequestArgs;
    }

    export type RequestCompletedEventName = "requestCompleted";

    /**
     * Event that is sent when server have finished processing request with specified id.
     */
    export interface RequestCompletedEvent extends Event {
        event: RequestCompletedEventName;
        body: RequestCompletedEventBody;
    }

    export interface RequestCompletedEventBody {
        request_seq: number;
    }

    /**
     * Item of diagnostic information found in a DiagnosticEvent message.
     */
    export interface Diagnostic {
        /**
         * Starting file location at which text applies.
         */
        start: Location;

        /**
         * The last file location at which the text applies.
         */
        end: Location;

        /**
         * Text of diagnostic message.
         */
        text: string;

        /**
         * The category of the diagnostic message, e.g. "error", "warning", or "suggestion".
         */
        category: string;

        reportsUnnecessary?: {};

        /**
         * Any related spans the diagnostic may have, such as other locations relevant to an error, such as declarartion sites
         */
        relatedInformation?: DiagnosticRelatedInformation[];

        /**
         * The error code of the diagnostic message.
         */
        code?: number;

        /**
         * The name of the plugin reporting the message.
         */
        source?: string;
    }

    export interface DiagnosticWithFileName extends Diagnostic {
        /**
         * Name of the file the diagnostic is in
         */
        fileName: string;
    }

    /**
     * Represents additional spans returned with a diagnostic which are relevant to it
     */
    export interface DiagnosticRelatedInformation {
        /**
         * The category of the related information message, e.g. "error", "warning", or "suggestion".
         */
        category: string;
        /**
         * The code used ot identify the related information
         */
        code: number;
        /**
         * Text of related or additional information.
         */
        message: string;
        /**
         * Associated location
         */
        span?: FileSpan;
    }

    export interface DiagnosticEventBody {
        /**
         * The file for which diagnostic information is reported.
         */
        file: string;

        /**
         * An array of diagnostic information items.
         */
        diagnostics: Diagnostic[];
    }

    export type DiagnosticEventKind = "semanticDiag" | "syntaxDiag" | "suggestionDiag";

    /**
     * Event message for DiagnosticEventKind event types.
     * These events provide syntactic and semantic errors for a file.
     */
    export interface DiagnosticEvent extends Event {
        body?: DiagnosticEventBody;
        event: DiagnosticEventKind;
    }

    export interface ConfigFileDiagnosticEventBody {
        /**
         * The file which trigged the searching and error-checking of the config file
         */
        triggerFile: string;

        /**
         * The name of the found config file.
         */
        configFile: string;

        /**
         * An arry of diagnostic information items for the found config file.
         */
        diagnostics: DiagnosticWithFileName[];
    }

    /**
     * Event message for "configFileDiag" event type.
     * This event provides errors for a found config file.
     */
    export interface ConfigFileDiagnosticEvent extends Event {
        body?: ConfigFileDiagnosticEventBody;
        event: "configFileDiag";
    }

    export type ProjectLanguageServiceStateEventName = "projectLanguageServiceState";
    export interface ProjectLanguageServiceStateEvent extends Event {
        event: ProjectLanguageServiceStateEventName;
        body?: ProjectLanguageServiceStateEventBody;
    }

    export interface ProjectLanguageServiceStateEventBody {
        /**
         * Project name that has changes in the state of language service.
         * For configured projects this will be the config file path.
         * For external projects this will be the name of the projects specified when project was open.
         * For inferred projects this event is not raised.
         */
        projectName: string;
        /**
         * True if language service state switched from disabled to enabled
         * and false otherwise.
         */
        languageServiceEnabled: boolean;
    }

    export type ProjectsUpdatedInBackgroundEventName = "projectsUpdatedInBackground";
    export interface ProjectsUpdatedInBackgroundEvent extends Event {
        event: ProjectsUpdatedInBackgroundEventName;
        body: ProjectsUpdatedInBackgroundEventBody;
    }

    export interface ProjectsUpdatedInBackgroundEventBody {
        /**
         * Current set of open files
         */
        openFiles: string[];
    }

    export type ProjectLoadingStartEventName = "projectLoadingStart";
    export interface ProjectLoadingStartEvent extends Event {
        event: ProjectLoadingStartEventName;
        body: ProjectLoadingStartEventBody;
    }

    export interface ProjectLoadingStartEventBody {
        /** name of the project */
        projectName: string;
        /** reason for loading */
        reason: string;
    }

    export type ProjectLoadingFinishEventName = "projectLoadingFinish";
    export interface ProjectLoadingFinishEvent extends Event {
        event: ProjectLoadingFinishEventName;
        body: ProjectLoadingFinishEventBody;
    }

    export interface ProjectLoadingFinishEventBody {
        /** name of the project */
        projectName: string;
    }

    export type SurveyReadyEventName = "surveyReady";

    export interface SurveyReadyEvent extends Event {
        event: SurveyReadyEventName;
        body: SurveyReadyEventBody;
    }

    export interface SurveyReadyEventBody {
        /** Name of the survey. This is an internal machine- and programmer-friendly name */
        surveyId: string;
    }

    export type LargeFileReferencedEventName = "largeFileReferenced";
    export interface LargeFileReferencedEvent extends Event {
        event: LargeFileReferencedEventName;
        body: LargeFileReferencedEventBody;
    }

    export interface LargeFileReferencedEventBody {
        /**
         * name of the large file being loaded
         */
        file: string;
        /**
         * size of the file
         */
        fileSize: number;
        /**
         * max file size allowed on the server
         */
        maxFileSize: number;
    }

    /*@internal*/
    export type AnyEvent =
        RequestCompletedEvent
        | DiagnosticEvent
        | ConfigFileDiagnosticEvent
        | ProjectLanguageServiceStateEvent
        | TelemetryEvent
        | ProjectsUpdatedInBackgroundEvent
        | ProjectLoadingStartEvent
        | ProjectLoadingFinishEvent
        | SurveyReadyEvent
        | LargeFileReferencedEvent;

    /**
     * Arguments for reload request.
     */
    export interface ReloadRequestArgs extends FileRequestArgs {
        /**
         * Name of temporary file from which to reload file
         * contents. May be same as file.
         */
        tmpfile: string;
    }

    /**
     * Reload request message; value of command field is "reload".
     * Reload contents of file with name given by the 'file' argument
     * from temporary file with name given by the 'tmpfile' argument.
     * The two names can be identical.
     */
    export interface ReloadRequest extends FileRequest {
        command: CommandTypes.Reload;
        arguments: ReloadRequestArgs;
    }

    /**
     * Response to "reload" request. This is just an acknowledgement, so
     * no body field is required.
     */
    export interface ReloadResponse extends Response {
    }

    /**
     * Arguments for saveto request.
     */
    export interface SavetoRequestArgs extends FileRequestArgs {
        /**
         * Name of temporary file into which to save server's view of
         * file contents.
         */
        tmpfile: string;
    }

    /**
     * Saveto request message; value of command field is "saveto".
     * For debugging purposes, save to a temporaryfile (named by
     * argument 'tmpfile') the contents of file named by argument
     * 'file'.  The server does not currently send a response to a
     * "saveto" request.
     */
    export interface SavetoRequest extends FileRequest {
        command: CommandTypes.Saveto;
        arguments: SavetoRequestArgs;
    }

    /**
     * Arguments for navto request message.
     */
    export interface NavtoRequestArgs {
        /**
         * Search term to navigate to from current location; term can
         * be '.*' or an identifier prefix.
         */
        searchValue: string;
        /**
         *  Optional limit on the number of items to return.
         */
        maxResultCount?: number;
        /**
         * The file for the request (absolute pathname required).
         */
        file?: string;
        /**
         * Optional flag to indicate we want results for just the current file
         * or the entire project.
         */
        currentFileOnly?: boolean;

        projectFileName?: string;
    }

    /**
     * Navto request message; value of command field is "navto".
     * Return list of objects giving file locations and symbols that
     * match the search term given in argument 'searchTerm'.  The
     * context for the search is given by the named file.
     */
    export interface NavtoRequest extends Request {
        command: CommandTypes.Navto;
        arguments: NavtoRequestArgs;
    }

    /**
     * An item found in a navto response.
     */
    export interface NavtoItem extends FileSpan {
        /**
         * The symbol's name.
         */
        name: string;

        /**
         * The symbol's kind (such as 'className' or 'parameterName').
         */
        kind: ScriptElementKind;

        /**
         * exact, substring, or prefix.
         */
        matchKind: string;

        /**
         * If this was a case sensitive or insensitive match.
         */
        isCaseSensitive: boolean;

        /**
         * Optional modifiers for the kind (such as 'public').
         */
        kindModifiers?: string;

        /**
         * Name of symbol's container symbol (if any); for example,
         * the class name if symbol is a class member.
         */
        containerName?: string;

        /**
         * Kind of symbol's container symbol (if any).
         */
        containerKind?: ScriptElementKind;
    }

    /**
     * Navto response message. Body is an array of navto items.  Each
     * item gives a symbol that matched the search term.
     */
    export interface NavtoResponse extends Response {
        body?: NavtoItem[];
    }

    /**
     * Arguments for change request message.
     */
    export interface ChangeRequestArgs extends FormatRequestArgs {
        /**
         * Optional string to insert at location (file, line, offset).
         */
        insertString?: string;
    }

    /**
     * Change request message; value of command field is "change".
     * Update the server's view of the file named by argument 'file'.
     * Server does not currently send a response to a change request.
     */
    export interface ChangeRequest extends FileLocationRequest {
        command: CommandTypes.Change;
        arguments: ChangeRequestArgs;
    }

    /**
     * Response to "brace" request.
     */
    export interface BraceResponse extends Response {
        body?: TextSpan[];
    }

    /**
     * Brace matching request; value of command field is "brace".
     * Return response giving the file locations of matching braces
     * found in file at location line, offset.
     */
    export interface BraceRequest extends FileLocationRequest {
        command: CommandTypes.Brace;
    }

    /**
     * NavBar items request; value of command field is "navbar".
     * Return response giving the list of navigation bar entries
     * extracted from the requested file.
     */
    export interface NavBarRequest extends FileRequest {
        command: CommandTypes.NavBar;
    }

    /**
     * NavTree request; value of command field is "navtree".
     * Return response giving the navigation tree of the requested file.
     */
    export interface NavTreeRequest extends FileRequest {
        command: CommandTypes.NavTree;
    }

    export interface NavigationBarItem {
        /**
         * The item's display text.
         */
        text: string;

        /**
         * The symbol's kind (such as 'className' or 'parameterName').
         */
        kind: ScriptElementKind;

        /**
         * Optional modifiers for the kind (such as 'public').
         */
        kindModifiers?: string;

        /**
         * The definition locations of the item.
         */
        spans: TextSpan[];

        /**
         * Optional children.
         */
        childItems?: NavigationBarItem[];

        /**
         * Number of levels deep this item should appear.
         */
        indent: number;
    }

    /** protocol.NavigationTree is identical to ts.NavigationTree, except using protocol.TextSpan instead of ts.TextSpan */
    export interface NavigationTree {
        text: string;
        kind: ScriptElementKind;
        kindModifiers: string;
        spans: TextSpan[];
        nameSpan: TextSpan | undefined;
        childItems?: NavigationTree[];
    }

    export type TelemetryEventName = "telemetry";

    export interface TelemetryEvent extends Event {
        event: TelemetryEventName;
        body: TelemetryEventBody;
    }

    export interface TelemetryEventBody {
        telemetryEventName: string;
        payload: any;
    }

    export type TypesInstallerInitializationFailedEventName = "typesInstallerInitializationFailed";

    export interface TypesInstallerInitializationFailedEvent extends Event {
        event: TypesInstallerInitializationFailedEventName;
        body: TypesInstallerInitializationFailedEventBody;
    }

    export interface TypesInstallerInitializationFailedEventBody {
        message: string;
    }

    export type TypingsInstalledTelemetryEventName = "typingsInstalled";

    export interface TypingsInstalledTelemetryEventBody extends TelemetryEventBody {
        telemetryEventName: TypingsInstalledTelemetryEventName;
        payload: TypingsInstalledTelemetryEventPayload;
    }

    /*
     * __GDPR__
     * "typingsinstalled" : {
     *     "${include}": ["${TypeScriptCommonProperties}"],
     *     "installedPackages": { "classification": "PublicNonPersonalData", "purpose": "FeatureInsight" },
     *     "installSuccess": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
     *     "typingsInstallerVersion": { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
     * }
     */
    export interface TypingsInstalledTelemetryEventPayload {
        /**
         * Comma separated list of installed typing packages
         */
        installedPackages: string;
        /**
         * true if install request succeeded, otherwise - false
         */
        installSuccess: boolean;

        /**
         * version of typings installer
         */
        typingsInstallerVersion: string;
    }

    export type BeginInstallTypesEventName = "beginInstallTypes";
    export type EndInstallTypesEventName = "endInstallTypes";

    export interface BeginInstallTypesEvent extends Event {
        event: BeginInstallTypesEventName;
        body: BeginInstallTypesEventBody;
    }

    export interface EndInstallTypesEvent extends Event {
        event: EndInstallTypesEventName;
        body: EndInstallTypesEventBody;
    }

    export interface InstallTypesEventBody {
        /**
         * correlation id to match begin and end events
         */
        eventId: number;
        /**
         * list of packages to install
         */
        packages: readonly string[];
    }

    export interface BeginInstallTypesEventBody extends InstallTypesEventBody {
    }

    export interface EndInstallTypesEventBody extends InstallTypesEventBody {
        /**
         * true if installation succeeded, otherwise false
         */
        success: boolean;
    }

    export interface NavBarResponse extends Response {
        body?: NavigationBarItem[];
    }

    export interface NavTreeResponse extends Response {
        body?: NavigationTree;
    }

    export interface CallHierarchyItem {
        name: string;
        kind: ScriptElementKind;
        file: string;
        span: TextSpan;
        selectionSpan: TextSpan;
    }

    export interface CallHierarchyIncomingCall {
        from: CallHierarchyItem;
        fromSpans: TextSpan[];
    }

    export interface CallHierarchyOutgoingCall {
        to: CallHierarchyItem;
        fromSpans: TextSpan[];
    }

    export interface PrepareCallHierarchyRequest extends FileLocationRequest {
        command: CommandTypes.PrepareCallHierarchy;
    }

    export interface PrepareCallHierarchyResponse extends Response {
        readonly body: CallHierarchyItem | CallHierarchyItem[];
    }

    export interface ProvideCallHierarchyIncomingCallsRequest extends FileLocationRequest {
        command: CommandTypes.ProvideCallHierarchyIncomingCalls;
    }

    export interface ProvideCallHierarchyIncomingCallsResponse extends Response {
        readonly body: CallHierarchyIncomingCall[];
    }

    export interface ProvideCallHierarchyOutgoingCallsRequest extends FileLocationRequest {
        command: CommandTypes.ProvideCallHierarchyOutgoingCalls;
    }

    export interface ProvideCallHierarchyOutgoingCallsResponse extends Response {
        readonly body: CallHierarchyOutgoingCall[];
    }

    export const enum IndentStyle {
        None = "None",
        Block = "Block",
        Smart = "Smart",
    }

    export enum SemicolonPreference {
        Ignore = "ignore",
        Insert = "insert",
        Remove = "remove",
    }

    export interface EditorSettings {
        baseIndentSize?: number;
        indentSize?: number;
        tabSize?: number;
        newLineCharacter?: string;
        convertTabsToSpaces?: boolean;
        indentStyle?: IndentStyle | ts.IndentStyle;
        trimTrailingWhitespace?: boolean;
    }

    export interface FormatCodeSettings extends EditorSettings {
        insertSpaceAfterCommaDelimiter?: boolean;
        insertSpaceAfterSemicolonInForStatements?: boolean;
        insertSpaceBeforeAndAfterBinaryOperators?: boolean;
        insertSpaceAfterConstructor?: boolean;
        insertSpaceAfterKeywordsInControlFlowStatements?: boolean;
        insertSpaceAfterFunctionKeywordForAnonymousFunctions?: boolean;
        insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis?: boolean;
        insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets?: boolean;
        insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces?: boolean;
        insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces?: boolean;
        insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces?: boolean;
        insertSpaceAfterTypeAssertion?: boolean;
        insertSpaceBeforeFunctionParenthesis?: boolean;
        placeOpenBraceOnNewLineForFunctions?: boolean;
        placeOpenBraceOnNewLineForControlBlocks?: boolean;
        insertSpaceBeforeTypeAnnotation?: boolean;
        semicolons?: SemicolonPreference;
    }

    export interface UserPreferences {
        readonly disableSuggestions?: boolean;
        readonly quotePreference?: "auto" | "double" | "single";
        /**
         * If enabled, TypeScript will search through all external modules' exports and add them to the completions list.
         * This affects lone identifier completions but not completions on the right hand side of `obj.`.
         */
        readonly includeCompletionsForModuleExports?: boolean;
        /**
         * If enabled, the completion list will include completions with invalid identifier names.
         * For those entries, The `insertText` and `replacementSpan` properties will be set to change from `.x` property access to `["x"]`.
         */
        readonly includeCompletionsWithInsertText?: boolean;
        /**
         * Unless this option is `false`, or `includeCompletionsWithInsertText` is not enabled,
         * member completion lists triggered with `.` will include entries on potentially-null and potentially-undefined
         * values, with insertion text to replace preceding `.` tokens with `?.`.
         */
        readonly includeAutomaticOptionalChainCompletions?: boolean;
        readonly importModuleSpecifierPreference?: "auto" | "relative" | "non-relative";
        /** Determines whether we import `foo/index.ts` as "foo", "foo/index", or "foo/index.js" */
        readonly importModuleSpecifierEnding?: "auto" | "minimal" | "index" | "js";
        readonly allowTextChangesInNewFiles?: boolean;
        readonly lazyConfiguredProjectsFromExternalProject?: boolean;
        readonly providePrefixAndSuffixTextForRename?: boolean;
        readonly allowRenameOfImportPath?: boolean;
    }

    export interface CompilerOptions {
        allowJs?: boolean;
        allowSyntheticDefaultImports?: boolean;
        allowUnreachableCode?: boolean;
        allowUnusedLabels?: boolean;
        alwaysStrict?: boolean;
        baseUrl?: string;
        charset?: string;
        checkJs?: boolean;
        declaration?: boolean;
        declarationDir?: string;
        disableSizeLimit?: boolean;
        downlevelIteration?: boolean;
        emitBOM?: boolean;
        emitDecoratorMetadata?: boolean;
        experimentalDecorators?: boolean;
        forceConsistentCasingInFileNames?: boolean;
        importHelpers?: boolean;
        inlineSourceMap?: boolean;
        inlineSources?: boolean;
        isolatedModules?: boolean;
        jsx?: JsxEmit | ts.JsxEmit;
        lib?: string[];
        locale?: string;
        mapRoot?: string;
        maxNodeModuleJsDepth?: number;
        module?: ModuleKind | ts.ModuleKind;
        moduleResolution?: ModuleResolutionKind | ts.ModuleResolutionKind;
        newLine?: NewLineKind | ts.NewLineKind;
        noEmit?: boolean;
        noEmitHelpers?: boolean;
        noEmitOnError?: boolean;
        noErrorTruncation?: boolean;
        noFallthroughCasesInSwitch?: boolean;
        noImplicitAny?: boolean;
        noImplicitReturns?: boolean;
        noImplicitThis?: boolean;
        noUnusedLocals?: boolean;
        noUnusedParameters?: boolean;
        noImplicitUseStrict?: boolean;
        noLib?: boolean;
        noResolve?: boolean;
        out?: string;
        outDir?: string;
        outFile?: string;
        paths?: MapLike<string[]>;
        plugins?: PluginImport[];
        preserveConstEnums?: boolean;
        preserveSymlinks?: boolean;
        project?: string;
        reactNamespace?: string;
        removeComments?: boolean;
        references?: ProjectReference[];
        rootDir?: string;
        rootDirs?: string[];
        skipLibCheck?: boolean;
        skipDefaultLibCheck?: boolean;
        sourceMap?: boolean;
        sourceRoot?: string;
        strict?: boolean;
        strictNullChecks?: boolean;
        suppressExcessPropertyErrors?: boolean;
        suppressImplicitAnyIndexErrors?: boolean;
        useDefineForClassFields?: boolean;
        target?: ScriptTarget | ts.ScriptTarget;
        traceResolution?: boolean;
        resolveJsonModule?: boolean;
        types?: string[];
        /** Paths used to used to compute primary types search locations */
        typeRoots?: string[];
        [option: string]: CompilerOptionsValue | undefined;
    }

    export const enum JsxEmit {
        None = "None",
        Preserve = "Preserve",
        ReactNative = "ReactNative",
        React = "React",
    }

    export const enum ModuleKind {
        None = "None",
        CommonJS = "CommonJS",
        AMD = "AMD",
        UMD = "UMD",
        System = "System",
        ES6 = "ES6",
        ES2015 = "ES2015",
        ESNext = "ESNext"
    }

    export const enum ModuleResolutionKind {
        Classic = "Classic",
        Node = "Node",
    }

    export const enum NewLineKind {
        Crlf = "Crlf",
        Lf = "Lf",
    }

    export const enum ScriptTarget {
        ES3 = "ES3",
        ES5 = "ES5",
        ES6 = "ES6",
        ES2015 = "ES2015",
        ES2016 = "ES2016",
        ES2017 = "ES2017",
        ES2018 = "ES2018",
        ES2019 = "ES2019",
        ES2020 = "ES2020",
        ESNext = "ESNext"
    }
}
