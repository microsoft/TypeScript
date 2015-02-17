/** 
  * Declaration module describing the TypeScript Server protocol 
  */
declare module ts.server.protocol {
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
        type: string;
    }
    
    /** 
      * Client-initiated request message 
      */
    export interface Request extends Message {
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
      * Server-initiated event message 
      */
    export interface Event extends Message {
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
          * Contains error message if success == false. 
          */
        message?: string;

        /**
          * Contains message body if success == true.
          */
        body?: any;
    }

    /** 
      * Arguments for FileRequest messages.
      */
    export interface FileRequestArgs {
        /**
          * The file for the request (absolute pathname required).
          */
        file: string;
    }

    /**
      * Request whose sole parameter is a file name.
      */
    export interface FileRequest extends Request {
        arguments: FileRequestArgs;
    }

    /**
      * Instances of this interface specify a code location:
      * (file, line, col), where line and column are 1-based.
      */
    export interface CodeLocationRequestArgs extends FileRequestArgs {
        /** 
          * The line number for the request (1-based).
          */
        line: number;

        /** 
          * The column for the request (1-based).
          */
        col: number;
    }

    /**
      * A request whose arguments specify a code location (file, line, col).
      */
    export interface CodeLocationRequest extends FileRequest {
        arguments: CodeLocationRequestArgs;
    }

    /**
      * Go to definition request; value of command field is
      * "definition". Return response giving the code locations that
      * define the symbol found in file at location line, col.
      */
    export interface DefinitionRequest extends CodeLocationRequest {
    }

    /**
      * Object containing line and column (one-based) of code location.
      */
    export interface LineCol {
        line: number;
        col: number;
    }

    /**
      * Object found in response messages defining a span of text in source code.
      */
    export interface TextSpan { 
        /**
          * First character of the definition.
          */
        start: LineCol;

        /**
          * One character past last character of the definition.
          */
        end: LineCol;
    }

    /**
      * Object found in response messages defining a span of text in a specific source file.
      */
    export interface CodeSpan extends TextSpan {
        /** 
          * File containing text span.
          */
        file: string;
    }

    /**
      * Definition response message.  Gives text range for definition.
      */
    export interface DefinitionResponse extends Response {
        body?: CodeSpan[];
    }

    /**
      * Find references request; value of command field is
      * "references". Return response giving the code locations that
      * reference the symbol found in file at location line, col.
      */
    export interface ReferencesRequest extends CodeLocationRequest {
    }

    export interface ReferencesResponseItem extends CodeSpan {
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
    }

    /**
      * The body of a "references" response message. 
      */
    export interface ReferencesResponseBody {
        /**
          * The code locations referencing the symbol.
          */
        refs: ReferencesResponseItem[];

        /**
          * The name of the symbol.
          */
        symbolName: string;

        /**
          * The start column of the symbol (on the line provided by the references request).
          */
        symbolStartCol: number;

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

    export interface RenameRequestArgs extends CodeLocationRequestArgs {
        findInComments?: boolean;
        findInStrings?: boolean;
    }


    /**
      * Rename request; value of command field is "rename". Return
      * response giving the code locations that reference the symbol
      * found in file at location line, col. Also return full display
      * name of the symbol so that client can print it unambiguously.
      */
    export interface RenameRequest extends CodeLocationRequest {
        arguments: RenameRequestArgs;
    }

    /**
      * Information about the item to be renamed. 
      */
    export interface RenameInfo {
        /**
          * True if item can be renamed.
          */
        canRename: boolean;

        /**
          * Error message if item can not be renamed.
          */
        localizedErrorMessage?: string;

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
        kind: string;

        /** 
          * Optional modifiers for the kind (such as 'public').
          */
        kindModifiers: string;
    }

    /**
     *  A group of text spans, all in 'file'.
     */
    export interface SpanGroup {
        /** The file to which the spans apply */
        file: string;
        /** The text spans in this group */
        locs: TextSpan[];
    }

    export interface RenameResponseBody {
        /**
         * Information about the item to be renamed.
         */
        info: RenameInfo;

        /**
         * An array of span groups (one per file) that refer to the item to be renamed.
         */
        locs: SpanGroup[];
    }

    /**
      * Rename response message.
      */
    export interface RenameResponse extends Response {
        body?: RenameResponseBody;
    }

    /**
      * Open request; value of command field is "open". Notify the
      * server that the client has file open.  The server will not
      * monitor the filesystem for changes in this file and will assume
      * that the client is updating the server (using the change and/or
      * reload messages) when the file changes. Server does not currently
      * send a response to an open request.
      */
    export interface OpenRequest extends FileRequest {
    }

    /**
      * Close request; value of command field is "close". Notify the
      * server that the client has closed a previously open file.  If
      * file is still referenced by open files, the server will resume
      * monitoring the filesystem for changes to file.  Server does not
      * currently send a response to a close request.
      */
    export interface CloseRequest extends FileRequest {
    }

    /**
      * Quickinfo request; value of command field is
      * "quickinfo". Return response giving a quick type and
      * documentation string for the symbol found in file at location
      * line, col.
      */
    export interface QuickInfoRequest extends CodeLocationRequest {
    }

    /**
      * Body of QuickInfoResponse.
      */
    export interface QuickInfoResponseBody {
        /**
          * The symbol's kind (such as 'className' or 'parameterName' or plain 'text').
          */
        kind: string;
        
        /**
          * Optional modifiers for the kind (such as 'public').
          */
        kindModifiers: string;
        
        /**
          * Starting code location of symbol.
          */
        start: LineCol;
        
        /**
          * One past last character of symbol.
          */
        end: LineCol;
        
        /**
          * Type and kind of symbol.
          */
        displayString: string;
        
        /**
          * Documentation associated with symbol.
          */
        documentation: string;
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
    export interface FormatRequestArgs extends CodeLocationRequestArgs {
        /**
          * Last line of range for which to format text in file.
          */
        endLine: number;
        
        /**
          * Last column of range for which to format text in file.
          */
        endCol: number;
    }

    /**
      * Format request; value of command field is "format".  Return
      * response giving zero or more edit instructions.  The edit
      * instructions will be sorted in file order.  Applying the edit
      * instructions in reverse to file will result in correctly
      * reformatted text.
      */
    export interface FormatRequest extends CodeLocationRequest {
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
        start: LineCol;

        /**
          * One character past last character of the text span to edit.
          */
        end: LineCol;
        
        /**
          * Replace the span defined above with this string (may be
          * the empty string).
          */
        newText: string;
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
    export interface FormatOnKeyRequestArgs extends CodeLocationRequestArgs {
        /**
          * Key pressed (';', '\n', or '}').
          */
        key: string;
    }

    /**
      * Format on key request; value of command field is
      * "formatonkey". Given file location and key typed (as string),
      * return response giving zero or more edit instructions.  The
      * edit instructions will be sorted in file order.  Applying the
      * edit instructions in reverse to file will result in correctly
      * reformatted text.
      */
    export interface FormatOnKeyRequest extends CodeLocationRequest {
        arguments: FormatOnKeyRequestArgs;
    }

    /**
      * Arguments for completions messages.
      */
    export interface CompletionsRequestArgs extends CodeLocationRequestArgs {
        /**
          * Optional prefix to apply to possible completions.
          */
        prefix?: string;
    }

    /**
      * Completions request; value of command field is "completions".
      * Given a file location (file, line, col) and a prefix (which may
      * be the empty string), return the possible completions that
      * begin with prefix.
      */
    export interface CompletionsRequest extends CodeLocationRequest {
        arguments: CompletionsRequestArgs;
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
    export interface CompletionItem {
        /**
          * The symbol's name.
          */
        name: string;
        
        /**
          * The symbol's kind (such as 'className' or 'parameterName').
          */
        kind: string;
        
        /**
          * Optional modifiers for the kind (such as 'public').
          */
        kindModifiers?: string;
        
        /**
          * Display parts of the symbol (similar to quick info).
          */
        displayParts?: SymbolDisplayPart[];
        
        /**
          * Documentation strings for the symbol.
          */
        documentation?: SymbolDisplayPart[];
    }

    export interface CompletionsResponse extends Response {
        body?: CompletionItem[];
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
        arguments: GeterrRequestArgs;
    }

    /**
      * Item of diagnostic information found in a DiagEvent message.
      */
    export interface Diagnostic {
        /**
          * Starting code location at which text appies.
          */
        start: LineCol;
        
        /**
          * Length of code location at which text applies.
          */
        len: number;
        
        /**
          * Text of diagnostic message.
          */
        text: string;
    }

    /** 
      * Event message for "syntaxDiag" and "semanticDiag" event types.
      * These events provide syntactic and semantic errors for a file.
      */
    export interface DiagEvent extends Event {
        body?: {
            /**
              * The file for which diagnostic information is reported.
              */
            file: string;
      
            /**
              * An array of diagnostic information items.
              */
            diagnostics: Diagnostic[];
        };
    }

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
        arguments: ReloadRequestArgs;
    }

    /**
      * Response to "reload" request.  This is just an acknowledgement, so
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
        arguments: SavetoRequestArgs;
    }

    /**
      * Arguments for navto request message.
      */
    export interface NavtoRequestArgs extends FileRequestArgs {
        /**
          * Search term to navigate to from current location; term can
          * be '.*' or an identifier prefix.
          */
        searchTerm: string;
    }

    /**
      * Navto request message; value of command field is "navto".
      * Return list of objects giving code locations and symbols that
      * match the search term given in argument 'searchTerm'.  The
      * context for the search is given by the named file.
      */
    export interface NavtoRequest extends FileRequest {
        arguments: NavtoRequestArgs;
    }

    /**
      * An item found in a navto response.
      */
    export interface NavtoItem {
        /**
          * The symbol's name.
          */
        name: string;
       
        /**
          * The symbol's kind (such as 'className' or 'parameterName').
          */
        kind: string;
        
        /**
          * exact, substring, or prefix.
          */
        matchKind?: string;
        
        /**
          * Optional modifiers for the kind (such as 'public').
          */
        kindModifiers?: string;
        
        /** 
          * The file in which the symbol is found.
          */
        file: string;
        
        /**
          * The location within file at which the symbol is found.
          */
        start: LineCol;
        
        /**
          * One past the last character of the symbol.
          */
        end: LineCol;
        
        /**
          * Name of symbol's container symbol (if any); for example,
          * the class name if symbol is a class member.
          */
        containerName?: string;
        
        /**
          * Kind of symbol's container symbol (if any).
          */
        containerKind?: string;
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
    export interface ChangeRequestArgs extends CodeLocationRequestArgs {
        /**
          * Length of span deleted at location (file, line, col); nothing deleted
          * if this field is zero or undefined.
          */
        deleteLen?: number;
        
        /**
          * Optional string to insert at location (file, line col).
          */
        insertString?: string;
    }

    /**
      * Change request message; value of command field is "change".
      * Update the server's view of the file named by argument 'file'.  
      * Server does not currently send a response to a change request.
      */
    export interface ChangeRequest extends CodeLocationRequest {
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
      * Return response giving the code locations of matching braces
      * found in file at location line, col.
      */
    export interface BraceRequest extends CodeLocationRequest {
    }

    /**
      * NavBar itesm request; value of command field is "navbar".
      * Return response giving the list of navigation bar entries
      * extracted from the requested file.
      */
    export interface NavBarRequest extends FileRequest {
    }

    export interface NavigationBarItem {
        /**
          * The item's display text.
          */
        text: string;

        /**
          * The symbol's kind (such as 'className' or 'parameterName').
          */
        kind: string;

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
    }

    export interface NavBarResponse extends Response { 
        body?: NavigationBarItem[];
    }
}
