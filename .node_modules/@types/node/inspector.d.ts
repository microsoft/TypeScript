// Type definitions for inspector

// These definitions are auto-generated.
// Please see https://github.com/DefinitelyTyped/DefinitelyTyped/pull/19330
// for more information.

/**
 * The inspector module provides an API for interacting with the V8 inspector.
 */
declare module "inspector" {
    import { EventEmitter } from 'events';

    export interface InspectorNotification<T> {
        method: string;
        params: T;
    }

    export namespace Schema {
        /**
         * Description of the protocol domain.
         */
        export interface Domain {
            /**
             * Domain name.
             */
            name: string;
            /**
             * Domain version.
             */
            version: string;
        }

        export interface GetDomainsReturnType {
            /**
             * List of supported domains.
             */
            domains: Schema.Domain[];
        }
    }

    export namespace Runtime {
        /**
         * Unique script identifier.
         */
        export type ScriptId = string;

        /**
         * Unique object identifier.
         */
        export type RemoteObjectId = string;

        /**
         * Primitive value which cannot be JSON-stringified.
         */
        export type UnserializableValue = string;

        /**
         * Mirror object referencing original JavaScript object.
         */
        export interface RemoteObject {
            /**
             * Object type.
             */
            type: string;
            /**
             * Object subtype hint. Specified for <code>object</code> type values only.
             */
            subtype?: string;
            /**
             * Object class (constructor) name. Specified for <code>object</code> type values only.
             */
            className?: string;
            /**
             * Remote object value in case of primitive values or JSON values (if it was requested).
             */
            value?: any;
            /**
             * Primitive value which can not be JSON-stringified does not have <code>value</code>, but gets this property.
             */
            unserializableValue?: Runtime.UnserializableValue;
            /**
             * String representation of the object.
             */
            description?: string;
            /**
             * Unique object identifier (for non-primitive values).
             */
            objectId?: Runtime.RemoteObjectId;
            /**
             * Preview containing abbreviated property values. Specified for <code>object</code> type values only.
             * @experimental
             */
            preview?: Runtime.ObjectPreview;
            /**
             * @experimental
             */
            customPreview?: Runtime.CustomPreview;
        }

        /**
         * @experimental
         */
        export interface CustomPreview {
            header: string;
            hasBody: boolean;
            formatterObjectId: Runtime.RemoteObjectId;
            bindRemoteObjectFunctionId: Runtime.RemoteObjectId;
            configObjectId?: Runtime.RemoteObjectId;
        }

        /**
         * Object containing abbreviated remote object value.
         * @experimental
         */
        export interface ObjectPreview {
            /**
             * Object type.
             */
            type: string;
            /**
             * Object subtype hint. Specified for <code>object</code> type values only.
             */
            subtype?: string;
            /**
             * String representation of the object.
             */
            description?: string;
            /**
             * True iff some of the properties or entries of the original object did not fit.
             */
            overflow: boolean;
            /**
             * List of the properties.
             */
            properties: Runtime.PropertyPreview[];
            /**
             * List of the entries. Specified for <code>map</code> and <code>set</code> subtype values only.
             */
            entries?: Runtime.EntryPreview[];
        }

        /**
         * @experimental
         */
        export interface PropertyPreview {
            /**
             * Property name.
             */
            name: string;
            /**
             * Object type. Accessor means that the property itself is an accessor property.
             */
            type: string;
            /**
             * User-friendly property value string.
             */
            value?: string;
            /**
             * Nested value preview.
             */
            valuePreview?: Runtime.ObjectPreview;
            /**
             * Object subtype hint. Specified for <code>object</code> type values only.
             */
            subtype?: string;
        }

        /**
         * @experimental
         */
        export interface EntryPreview {
            /**
             * Preview of the key. Specified for map-like collection entries.
             */
            key?: Runtime.ObjectPreview;
            /**
             * Preview of the value.
             */
            value: Runtime.ObjectPreview;
        }

        /**
         * Object property descriptor.
         */
        export interface PropertyDescriptor {
            /**
             * Property name or symbol description.
             */
            name: string;
            /**
             * The value associated with the property.
             */
            value?: Runtime.RemoteObject;
            /**
             * True if the value associated with the property may be changed (data descriptors only).
             */
            writable?: boolean;
            /**
             * A function which serves as a getter for the property, or <code>undefined</code> if there is no getter (accessor descriptors only).
             */
            get?: Runtime.RemoteObject;
            /**
             * A function which serves as a setter for the property, or <code>undefined</code> if there is no setter (accessor descriptors only).
             */
            set?: Runtime.RemoteObject;
            /**
             * True if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object.
             */
            configurable: boolean;
            /**
             * True if this property shows up during enumeration of the properties on the corresponding object.
             */
            enumerable: boolean;
            /**
             * True if the result was thrown during the evaluation.
             */
            wasThrown?: boolean;
            /**
             * True if the property is owned for the object.
             */
            isOwn?: boolean;
            /**
             * Property symbol object, if the property is of the <code>symbol</code> type.
             */
            symbol?: Runtime.RemoteObject;
        }

        /**
         * Object internal property descriptor. This property isn't normally visible in JavaScript code.
         */
        export interface InternalPropertyDescriptor {
            /**
             * Conventional property name.
             */
            name: string;
            /**
             * The value associated with the property.
             */
            value?: Runtime.RemoteObject;
        }

        /**
         * Represents function call argument. Either remote object id <code>objectId</code>, primitive <code>value</code>, unserializable primitive value or neither of (for undefined) them should be specified.
         */
        export interface CallArgument {
            /**
             * Primitive value.
             */
            value?: any;
            /**
             * Primitive value which can not be JSON-stringified.
             */
            unserializableValue?: Runtime.UnserializableValue;
            /**
             * Remote object handle.
             */
            objectId?: Runtime.RemoteObjectId;
        }

        /**
         * Id of an execution context.
         */
        export type ExecutionContextId = number;

        /**
         * Description of an isolated world.
         */
        export interface ExecutionContextDescription {
            /**
             * Unique id of the execution context. It can be used to specify in which execution context script evaluation should be performed.
             */
            id: Runtime.ExecutionContextId;
            /**
             * Execution context origin.
             */
            origin: string;
            /**
             * Human readable name describing given context.
             */
            name: string;
            /**
             * Embedder-specific auxiliary data.
             */
            auxData?: {};
        }

        /**
         * Detailed information about exception (or error) that was thrown during script compilation or execution.
         */
        export interface ExceptionDetails {
            /**
             * Exception id.
             */
            exceptionId: number;
            /**
             * Exception text, which should be used together with exception object when available.
             */
            text: string;
            /**
             * Line number of the exception location (0-based).
             */
            lineNumber: number;
            /**
             * Column number of the exception location (0-based).
             */
            columnNumber: number;
            /**
             * Script ID of the exception location.
             */
            scriptId?: Runtime.ScriptId;
            /**
             * URL of the exception location, to be used when the script was not reported.
             */
            url?: string;
            /**
             * JavaScript stack trace if available.
             */
            stackTrace?: Runtime.StackTrace;
            /**
             * Exception object if available.
             */
            exception?: Runtime.RemoteObject;
            /**
             * Identifier of the context where exception happened.
             */
            executionContextId?: Runtime.ExecutionContextId;
        }

        /**
         * Number of milliseconds since epoch.
         */
        export type Timestamp = number;

        /**
         * Stack entry for runtime errors and assertions.
         */
        export interface CallFrame {
            /**
             * JavaScript function name.
             */
            functionName: string;
            /**
             * JavaScript script id.
             */
            scriptId: Runtime.ScriptId;
            /**
             * JavaScript script name or url.
             */
            url: string;
            /**
             * JavaScript script line number (0-based).
             */
            lineNumber: number;
            /**
             * JavaScript script column number (0-based).
             */
            columnNumber: number;
        }

        /**
         * Call frames for assertions or error messages.
         */
        export interface StackTrace {
            /**
             * String label of this stack trace. For async traces this may be a name of the function that initiated the async call.
             */
            description?: string;
            /**
             * JavaScript function name.
             */
            callFrames: Runtime.CallFrame[];
            /**
             * Asynchronous JavaScript stack trace that preceded this stack, if available.
             */
            parent?: Runtime.StackTrace;
            /**
             * Creation frame of the Promise which produced the next synchronous trace when resolved, if available.
             * @experimental
             */
            promiseCreationFrame?: Runtime.CallFrame;
        }

        export interface EvaluateParameterType {
            /**
             * Expression to evaluate.
             */
            expression: string;
            /**
             * Symbolic group name that can be used to release multiple objects.
             */
            objectGroup?: string;
            /**
             * Determines whether Command Line API should be available during the evaluation.
             */
            includeCommandLineAPI?: boolean;
            /**
             * In silent mode exceptions thrown during evaluation are not reported and do not pause execution. Overrides <code>setPauseOnException</code> state.
             */
            silent?: boolean;
            /**
             * Specifies in which execution context to perform evaluation. If the parameter is omitted the evaluation will be performed in the context of the inspected page.
             */
            contextId?: Runtime.ExecutionContextId;
            /**
             * Whether the result is expected to be a JSON object that should be sent by value.
             */
            returnByValue?: boolean;
            /**
             * Whether preview should be generated for the result.
             * @experimental
             */
            generatePreview?: boolean;
            /**
             * Whether execution should be treated as initiated by user in the UI.
             * @experimental
             */
            userGesture?: boolean;
            /**
             * Whether execution should wait for promise to be resolved. If the result of evaluation is not a Promise, it's considered to be an error.
             */
            awaitPromise?: boolean;
        }

        export interface AwaitPromiseParameterType {
            /**
             * Identifier of the promise.
             */
            promiseObjectId: Runtime.RemoteObjectId;
            /**
             * Whether the result is expected to be a JSON object that should be sent by value.
             */
            returnByValue?: boolean;
            /**
             * Whether preview should be generated for the result.
             */
            generatePreview?: boolean;
        }

        export interface CallFunctionOnParameterType {
            /**
             * Identifier of the object to call function on.
             */
            objectId: Runtime.RemoteObjectId;
            /**
             * Declaration of the function to call.
             */
            functionDeclaration: string;
            /**
             * Call arguments. All call arguments must belong to the same JavaScript world as the target object.
             */
            arguments?: Runtime.CallArgument[];
            /**
             * In silent mode exceptions thrown during evaluation are not reported and do not pause execution. Overrides <code>setPauseOnException</code> state.
             */
            silent?: boolean;
            /**
             * Whether the result is expected to be a JSON object which should be sent by value.
             */
            returnByValue?: boolean;
            /**
             * Whether preview should be generated for the result.
             * @experimental
             */
            generatePreview?: boolean;
            /**
             * Whether execution should be treated as initiated by user in the UI.
             * @experimental
             */
            userGesture?: boolean;
            /**
             * Whether execution should wait for promise to be resolved. If the result of evaluation is not a Promise, it's considered to be an error.
             */
            awaitPromise?: boolean;
        }

        export interface GetPropertiesParameterType {
            /**
             * Identifier of the object to return properties for.
             */
            objectId: Runtime.RemoteObjectId;
            /**
             * If true, returns properties belonging only to the element itself, not to its prototype chain.
             */
            ownProperties?: boolean;
            /**
             * If true, returns accessor properties (with getter/setter) only; internal properties are not returned either.
             * @experimental
             */
            accessorPropertiesOnly?: boolean;
            /**
             * Whether preview should be generated for the results.
             * @experimental
             */
            generatePreview?: boolean;
        }

        export interface ReleaseObjectParameterType {
            /**
             * Identifier of the object to release.
             */
            objectId: Runtime.RemoteObjectId;
        }

        export interface ReleaseObjectGroupParameterType {
            /**
             * Symbolic object group name.
             */
            objectGroup: string;
        }

        export interface SetCustomObjectFormatterEnabledParameterType {
            enabled: boolean;
        }

        export interface CompileScriptParameterType {
            /**
             * Expression to compile.
             */
            expression: string;
            /**
             * Source url to be set for the script.
             */
            sourceURL: string;
            /**
             * Specifies whether the compiled script should be persisted.
             */
            persistScript: boolean;
            /**
             * Specifies in which execution context to perform script run. If the parameter is omitted the evaluation will be performed in the context of the inspected page.
             */
            executionContextId?: Runtime.ExecutionContextId;
        }

        export interface RunScriptParameterType {
            /**
             * Id of the script to run.
             */
            scriptId: Runtime.ScriptId;
            /**
             * Specifies in which execution context to perform script run. If the parameter is omitted the evaluation will be performed in the context of the inspected page.
             */
            executionContextId?: Runtime.ExecutionContextId;
            /**
             * Symbolic group name that can be used to release multiple objects.
             */
            objectGroup?: string;
            /**
             * In silent mode exceptions thrown during evaluation are not reported and do not pause execution. Overrides <code>setPauseOnException</code> state.
             */
            silent?: boolean;
            /**
             * Determines whether Command Line API should be available during the evaluation.
             */
            includeCommandLineAPI?: boolean;
            /**
             * Whether the result is expected to be a JSON object which should be sent by value.
             */
            returnByValue?: boolean;
            /**
             * Whether preview should be generated for the result.
             */
            generatePreview?: boolean;
            /**
             * Whether execution should wait for promise to be resolved. If the result of evaluation is not a Promise, it's considered to be an error.
             */
            awaitPromise?: boolean;
        }

        export interface EvaluateReturnType {
            /**
             * Evaluation result.
             */
            result: Runtime.RemoteObject;
            /**
             * Exception details.
             */
            exceptionDetails?: Runtime.ExceptionDetails;
        }

        export interface AwaitPromiseReturnType {
            /**
             * Promise result. Will contain rejected value if promise was rejected.
             */
            result: Runtime.RemoteObject;
            /**
             * Exception details if stack strace is available.
             */
            exceptionDetails?: Runtime.ExceptionDetails;
        }

        export interface CallFunctionOnReturnType {
            /**
             * Call result.
             */
            result: Runtime.RemoteObject;
            /**
             * Exception details.
             */
            exceptionDetails?: Runtime.ExceptionDetails;
        }

        export interface GetPropertiesReturnType {
            /**
             * Object properties.
             */
            result: Runtime.PropertyDescriptor[];
            /**
             * Internal object properties (only of the element itself).
             */
            internalProperties?: Runtime.InternalPropertyDescriptor[];
            /**
             * Exception details.
             */
            exceptionDetails?: Runtime.ExceptionDetails;
        }

        export interface CompileScriptReturnType {
            /**
             * Id of the script.
             */
            scriptId?: Runtime.ScriptId;
            /**
             * Exception details.
             */
            exceptionDetails?: Runtime.ExceptionDetails;
        }

        export interface RunScriptReturnType {
            /**
             * Run result.
             */
            result: Runtime.RemoteObject;
            /**
             * Exception details.
             */
            exceptionDetails?: Runtime.ExceptionDetails;
        }

        export interface ExecutionContextCreatedEventDataType {
            /**
             * A newly created execution context.
             */
            context: Runtime.ExecutionContextDescription;
        }

        export interface ExecutionContextDestroyedEventDataType {
            /**
             * Id of the destroyed context
             */
            executionContextId: Runtime.ExecutionContextId;
        }

        export interface ExceptionThrownEventDataType {
            /**
             * Timestamp of the exception.
             */
            timestamp: Runtime.Timestamp;
            exceptionDetails: Runtime.ExceptionDetails;
        }

        export interface ExceptionRevokedEventDataType {
            /**
             * Reason describing why exception was revoked.
             */
            reason: string;
            /**
             * The id of revoked exception, as reported in <code>exceptionUnhandled</code>.
             */
            exceptionId: number;
        }

        export interface ConsoleAPICalledEventDataType {
            /**
             * Type of the call.
             */
            type: string;
            /**
             * Call arguments.
             */
            args: Runtime.RemoteObject[];
            /**
             * Identifier of the context where the call was made.
             */
            executionContextId: Runtime.ExecutionContextId;
            /**
             * Call timestamp.
             */
            timestamp: Runtime.Timestamp;
            /**
             * Stack trace captured when the call was made.
             */
            stackTrace?: Runtime.StackTrace;
            /**
             * Console context descriptor for calls on non-default console context (not console.*): 'anonymous#unique-logger-id' for call on unnamed context, 'name#unique-logger-id' for call on named context.
             * @experimental
             */
            context?: string;
        }

        export interface InspectRequestedEventDataType {
            object: Runtime.RemoteObject;
            hints: {};
        }
    }

    export namespace Debugger {
        /**
         * Breakpoint identifier.
         */
        export type BreakpointId = string;

        /**
         * Call frame identifier.
         */
        export type CallFrameId = string;

        /**
         * Location in the source code.
         */
        export interface Location {
            /**
             * Script identifier as reported in the <code>Debugger.scriptParsed</code>.
             */
            scriptId: Runtime.ScriptId;
            /**
             * Line number in the script (0-based).
             */
            lineNumber: number;
            /**
             * Column number in the script (0-based).
             */
            columnNumber?: number;
        }

        /**
         * Location in the source code.
         * @experimental
         */
        export interface ScriptPosition {
            lineNumber: number;
            columnNumber: number;
        }

        /**
         * JavaScript call frame. Array of call frames form the call stack.
         */
        export interface CallFrame {
            /**
             * Call frame identifier. This identifier is only valid while the virtual machine is paused.
             */
            callFrameId: Debugger.CallFrameId;
            /**
             * Name of the JavaScript function called on this call frame.
             */
            functionName: string;
            /**
             * Location in the source code.
             * @experimental
             */
            functionLocation?: Debugger.Location;
            /**
             * Location in the source code.
             */
            location: Debugger.Location;
            /**
             * Scope chain for this call frame.
             */
            scopeChain: Debugger.Scope[];
            /**
             * <code>this</code> object for this call frame.
             */
            this: Runtime.RemoteObject;
            /**
             * The value being returned, if the function is at return point.
             */
            returnValue?: Runtime.RemoteObject;
        }

        /**
         * Scope description.
         */
        export interface Scope {
            /**
             * Scope type.
             */
            type: string;
            /**
             * Object representing the scope. For <code>global</code> and <code>with</code> scopes it represents the actual object; for the rest of the scopes, it is artificial transient object enumerating scope variables as its properties.
             */
            object: Runtime.RemoteObject;
            name?: string;
            /**
             * Location in the source code where scope starts
             */
            startLocation?: Debugger.Location;
            /**
             * Location in the source code where scope ends
             */
            endLocation?: Debugger.Location;
        }

        /**
         * Search match for resource.
         * @experimental
         */
        export interface SearchMatch {
            /**
             * Line number in resource content.
             */
            lineNumber: number;
            /**
             * Line with match content.
             */
            lineContent: string;
        }

        /**
         * @experimental
         */
        export interface BreakLocation {
            /**
             * Script identifier as reported in the <code>Debugger.scriptParsed</code>.
             */
            scriptId: Runtime.ScriptId;
            /**
             * Line number in the script (0-based).
             */
            lineNumber: number;
            /**
             * Column number in the script (0-based).
             */
            columnNumber?: number;
            type?: string;
        }

        export interface SetBreakpointsActiveParameterType {
            /**
             * New value for breakpoints active state.
             */
            active: boolean;
        }

        export interface SetSkipAllPausesParameterType {
            /**
             * New value for skip pauses state.
             */
            skip: boolean;
        }

        export interface SetBreakpointByUrlParameterType {
            /**
             * Line number to set breakpoint at.
             */
            lineNumber: number;
            /**
             * URL of the resources to set breakpoint on.
             */
            url?: string;
            /**
             * Regex pattern for the URLs of the resources to set breakpoints on. Either <code>url</code> or <code>urlRegex</code> must be specified.
             */
            urlRegex?: string;
            /**
             * Offset in the line to set breakpoint at.
             */
            columnNumber?: number;
            /**
             * Expression to use as a breakpoint condition. When specified, debugger will only stop on the breakpoint if this expression evaluates to true.
             */
            condition?: string;
        }

        export interface SetBreakpointParameterType {
            /**
             * Location to set breakpoint in.
             */
            location: Debugger.Location;
            /**
             * Expression to use as a breakpoint condition. When specified, debugger will only stop on the breakpoint if this expression evaluates to true.
             */
            condition?: string;
        }

        export interface RemoveBreakpointParameterType {
            breakpointId: Debugger.BreakpointId;
        }

        export interface GetPossibleBreakpointsParameterType {
            /**
             * Start of range to search possible breakpoint locations in.
             */
            start: Debugger.Location;
            /**
             * End of range to search possible breakpoint locations in (excluding). When not specified, end of scripts is used as end of range.
             */
            end?: Debugger.Location;
            /**
             * Only consider locations which are in the same (non-nested) function as start.
             */
            restrictToFunction?: boolean;
        }

        export interface ContinueToLocationParameterType {
            /**
             * Location to continue to.
             */
            location: Debugger.Location;
            /**
             * @experimental
             */
            targetCallFrames?: string;
        }

        export interface SearchInContentParameterType {
            /**
             * Id of the script to search in.
             */
            scriptId: Runtime.ScriptId;
            /**
             * String to search for.
             */
            query: string;
            /**
             * If true, search is case sensitive.
             */
            caseSensitive?: boolean;
            /**
             * If true, treats string parameter as regex.
             */
            isRegex?: boolean;
        }

        export interface SetScriptSourceParameterType {
            /**
             * Id of the script to edit.
             */
            scriptId: Runtime.ScriptId;
            /**
             * New content of the script.
             */
            scriptSource: string;
            /**
             *  If true the change will not actually be applied. Dry run may be used to get result description without actually modifying the code.
             */
            dryRun?: boolean;
        }

        export interface RestartFrameParameterType {
            /**
             * Call frame identifier to evaluate on.
             */
            callFrameId: Debugger.CallFrameId;
        }

        export interface GetScriptSourceParameterType {
            /**
             * Id of the script to get source for.
             */
            scriptId: Runtime.ScriptId;
        }

        export interface SetPauseOnExceptionsParameterType {
            /**
             * Pause on exceptions mode.
             */
            state: string;
        }

        export interface EvaluateOnCallFrameParameterType {
            /**
             * Call frame identifier to evaluate on.
             */
            callFrameId: Debugger.CallFrameId;
            /**
             * Expression to evaluate.
             */
            expression: string;
            /**
             * String object group name to put result into (allows rapid releasing resulting object handles using <code>releaseObjectGroup</code>).
             */
            objectGroup?: string;
            /**
             * Specifies whether command line API should be available to the evaluated expression, defaults to false.
             */
            includeCommandLineAPI?: boolean;
            /**
             * In silent mode exceptions thrown during evaluation are not reported and do not pause execution. Overrides <code>setPauseOnException</code> state.
             */
            silent?: boolean;
            /**
             * Whether the result is expected to be a JSON object that should be sent by value.
             */
            returnByValue?: boolean;
            /**
             * Whether preview should be generated for the result.
             * @experimental
             */
            generatePreview?: boolean;
            /**
             * Whether to throw an exception if side effect cannot be ruled out during evaluation.
             * @experimental
             */
            throwOnSideEffect?: boolean;
        }

        export interface SetVariableValueParameterType {
            /**
             * 0-based number of scope as was listed in scope chain. Only 'local', 'closure' and 'catch' scope types are allowed. Other scopes could be manipulated manually.
             */
            scopeNumber: number;
            /**
             * Variable name.
             */
            variableName: string;
            /**
             * New variable value.
             */
            newValue: Runtime.CallArgument;
            /**
             * Id of callframe that holds variable.
             */
            callFrameId: Debugger.CallFrameId;
        }

        export interface SetAsyncCallStackDepthParameterType {
            /**
             * Maximum depth of async call stacks. Setting to <code>0</code> will effectively disable collecting async call stacks (default).
             */
            maxDepth: number;
        }

        export interface SetBlackboxPatternsParameterType {
            /**
             * Array of regexps that will be used to check script url for blackbox state.
             */
            patterns: string[];
        }

        export interface SetBlackboxedRangesParameterType {
            /**
             * Id of the script.
             */
            scriptId: Runtime.ScriptId;
            positions: Debugger.ScriptPosition[];
        }

        export interface SetBreakpointByUrlReturnType {
            /**
             * Id of the created breakpoint for further reference.
             */
            breakpointId: Debugger.BreakpointId;
            /**
             * List of the locations this breakpoint resolved into upon addition.
             */
            locations: Debugger.Location[];
        }

        export interface SetBreakpointReturnType {
            /**
             * Id of the created breakpoint for further reference.
             */
            breakpointId: Debugger.BreakpointId;
            /**
             * Location this breakpoint resolved into.
             */
            actualLocation: Debugger.Location;
        }

        export interface GetPossibleBreakpointsReturnType {
            /**
             * List of the possible breakpoint locations.
             */
            locations: Debugger.BreakLocation[];
        }

        export interface SearchInContentReturnType {
            /**
             * List of search matches.
             */
            result: Debugger.SearchMatch[];
        }

        export interface SetScriptSourceReturnType {
            /**
             * New stack trace in case editing has happened while VM was stopped.
             */
            callFrames?: Debugger.CallFrame[];
            /**
             * Whether current call stack  was modified after applying the changes.
             */
            stackChanged?: boolean;
            /**
             * Async stack trace, if any.
             */
            asyncStackTrace?: Runtime.StackTrace;
            /**
             * Exception details if any.
             */
            exceptionDetails?: Runtime.ExceptionDetails;
        }

        export interface RestartFrameReturnType {
            /**
             * New stack trace.
             */
            callFrames: Debugger.CallFrame[];
            /**
             * Async stack trace, if any.
             */
            asyncStackTrace?: Runtime.StackTrace;
        }

        export interface GetScriptSourceReturnType {
            /**
             * Script source.
             */
            scriptSource: string;
        }

        export interface EvaluateOnCallFrameReturnType {
            /**
             * Object wrapper for the evaluation result.
             */
            result: Runtime.RemoteObject;
            /**
             * Exception details.
             */
            exceptionDetails?: Runtime.ExceptionDetails;
        }

        export interface ScriptParsedEventDataType {
            /**
             * Identifier of the script parsed.
             */
            scriptId: Runtime.ScriptId;
            /**
             * URL or name of the script parsed (if any).
             */
            url: string;
            /**
             * Line offset of the script within the resource with given URL (for script tags).
             */
            startLine: number;
            /**
             * Column offset of the script within the resource with given URL.
             */
            startColumn: number;
            /**
             * Last line of the script.
             */
            endLine: number;
            /**
             * Length of the last line of the script.
             */
            endColumn: number;
            /**
             * Specifies script creation context.
             */
            executionContextId: Runtime.ExecutionContextId;
            /**
             * Content hash of the script.
             */
            hash: string;
            /**
             * Embedder-specific auxiliary data.
             */
            executionContextAuxData?: {};
            /**
             * True, if this script is generated as a result of the live edit operation.
             * @experimental
             */
            isLiveEdit?: boolean;
            /**
             * URL of source map associated with script (if any).
             */
            sourceMapURL?: string;
            /**
             * True, if this script has sourceURL.
             * @experimental
             */
            hasSourceURL?: boolean;
            /**
             * True, if this script is ES6 module.
             * @experimental
             */
            isModule?: boolean;
            /**
             * This script length.
             * @experimental
             */
            length?: number;
            /**
             * JavaScript top stack frame of where the script parsed event was triggered if available.
             * @experimental
             */
            stackTrace?: Runtime.StackTrace;
        }

        export interface ScriptFailedToParseEventDataType {
            /**
             * Identifier of the script parsed.
             */
            scriptId: Runtime.ScriptId;
            /**
             * URL or name of the script parsed (if any).
             */
            url: string;
            /**
             * Line offset of the script within the resource with given URL (for script tags).
             */
            startLine: number;
            /**
             * Column offset of the script within the resource with given URL.
             */
            startColumn: number;
            /**
             * Last line of the script.
             */
            endLine: number;
            /**
             * Length of the last line of the script.
             */
            endColumn: number;
            /**
             * Specifies script creation context.
             */
            executionContextId: Runtime.ExecutionContextId;
            /**
             * Content hash of the script.
             */
            hash: string;
            /**
             * Embedder-specific auxiliary data.
             */
            executionContextAuxData?: {};
            /**
             * URL of source map associated with script (if any).
             */
            sourceMapURL?: string;
            /**
             * True, if this script has sourceURL.
             * @experimental
             */
            hasSourceURL?: boolean;
            /**
             * True, if this script is ES6 module.
             * @experimental
             */
            isModule?: boolean;
            /**
             * This script length.
             * @experimental
             */
            length?: number;
            /**
             * JavaScript top stack frame of where the script parsed event was triggered if available.
             * @experimental
             */
            stackTrace?: Runtime.StackTrace;
        }

        export interface BreakpointResolvedEventDataType {
            /**
             * Breakpoint unique identifier.
             */
            breakpointId: Debugger.BreakpointId;
            /**
             * Actual breakpoint location.
             */
            location: Debugger.Location;
        }

        export interface PausedEventDataType {
            /**
             * Call stack the virtual machine stopped on.
             */
            callFrames: Debugger.CallFrame[];
            /**
             * Pause reason.
             */
            reason: string;
            /**
             * Object containing break-specific auxiliary properties.
             */
            data?: {};
            /**
             * Hit breakpoints IDs
             */
            hitBreakpoints?: string[];
            /**
             * Async stack trace, if any.
             */
            asyncStackTrace?: Runtime.StackTrace;
        }
    }

    export namespace Console {
        /**
         * Console message.
         */
        export interface ConsoleMessage {
            /**
             * Message source.
             */
            source: string;
            /**
             * Message severity.
             */
            level: string;
            /**
             * Message text.
             */
            text: string;
            /**
             * URL of the message origin.
             */
            url?: string;
            /**
             * Line number in the resource that generated this message (1-based).
             */
            line?: number;
            /**
             * Column number in the resource that generated this message (1-based).
             */
            column?: number;
        }

        export interface MessageAddedEventDataType {
            /**
             * Console message that has been added.
             */
            message: Console.ConsoleMessage;
        }
    }

    export namespace Profiler {
        /**
         * Profile node. Holds callsite information, execution statistics and child nodes.
         */
        export interface ProfileNode {
            /**
             * Unique id of the node.
             */
            id: number;
            /**
             * Function location.
             */
            callFrame: Runtime.CallFrame;
            /**
             * Number of samples where this node was on top of the call stack.
             * @experimental
             */
            hitCount?: number;
            /**
             * Child node ids.
             */
            children?: number[];
            /**
             * The reason of being not optimized. The function may be deoptimized or marked as don't optimize.
             */
            deoptReason?: string;
            /**
             * An array of source position ticks.
             * @experimental
             */
            positionTicks?: Profiler.PositionTickInfo[];
        }

        /**
         * Profile.
         */
        export interface Profile {
            /**
             * The list of profile nodes. First item is the root node.
             */
            nodes: Profiler.ProfileNode[];
            /**
             * Profiling start timestamp in microseconds.
             */
            startTime: number;
            /**
             * Profiling end timestamp in microseconds.
             */
            endTime: number;
            /**
             * Ids of samples top nodes.
             */
            samples?: number[];
            /**
             * Time intervals between adjacent samples in microseconds. The first delta is relative to the profile startTime.
             */
            timeDeltas?: number[];
        }

        /**
         * Specifies a number of samples attributed to a certain source position.
         * @experimental
         */
        export interface PositionTickInfo {
            /**
             * Source line number (1-based).
             */
            line: number;
            /**
             * Number of samples attributed to the source line.
             */
            ticks: number;
        }

        /**
         * Coverage data for a source range.
         * @experimental
         */
        export interface CoverageRange {
            /**
             * JavaScript script source offset for the range start.
             */
            startOffset: number;
            /**
             * JavaScript script source offset for the range end.
             */
            endOffset: number;
            /**
             * Collected execution count of the source range.
             */
            count: number;
        }

        /**
         * Coverage data for a JavaScript function.
         * @experimental
         */
        export interface FunctionCoverage {
            /**
             * JavaScript function name.
             */
            functionName: string;
            /**
             * Source ranges inside the function with coverage data.
             */
            ranges: Profiler.CoverageRange[];
            /**
             * Whether coverage data for this function has block granularity.
             */
            isBlockCoverage: boolean;
        }

        /**
         * Coverage data for a JavaScript script.
         * @experimental
         */
        export interface ScriptCoverage {
            /**
             * JavaScript script id.
             */
            scriptId: Runtime.ScriptId;
            /**
             * JavaScript script name or url.
             */
            url: string;
            /**
             * Functions contained in the script that has coverage data.
             */
            functions: Profiler.FunctionCoverage[];
        }

        export interface SetSamplingIntervalParameterType {
            /**
             * New sampling interval in microseconds.
             */
            interval: number;
        }

        export interface StartPreciseCoverageParameterType {
            /**
             * Collect accurate call counts beyond simple 'covered' or 'not covered'.
             */
            callCount?: boolean;
        }

        export interface StopReturnType {
            /**
             * Recorded profile.
             */
            profile: Profiler.Profile;
        }

        export interface TakePreciseCoverageReturnType {
            /**
             * Coverage data for the current isolate.
             */
            result: Profiler.ScriptCoverage[];
        }

        export interface GetBestEffortCoverageReturnType {
            /**
             * Coverage data for the current isolate.
             */
            result: Profiler.ScriptCoverage[];
        }

        export interface ConsoleProfileStartedEventDataType {
            id: string;
            /**
             * Location of console.profile().
             */
            location: Debugger.Location;
            /**
             * Profile title passed as an argument to console.profile().
             */
            title?: string;
        }

        export interface ConsoleProfileFinishedEventDataType {
            id: string;
            /**
             * Location of console.profileEnd().
             */
            location: Debugger.Location;
            profile: Profiler.Profile;
            /**
             * Profile title passed as an argument to console.profile().
             */
            title?: string;
        }
    }

    export namespace HeapProfiler {
        /**
         * Heap snapshot object id.
         */
        export type HeapSnapshotObjectId = string;

        /**
         * Sampling Heap Profile node. Holds callsite information, allocation statistics and child nodes.
         */
        export interface SamplingHeapProfileNode {
            /**
             * Function location.
             */
            callFrame: Runtime.CallFrame;
            /**
             * Allocations size in bytes for the node excluding children.
             */
            selfSize: number;
            /**
             * Child nodes.
             */
            children: HeapProfiler.SamplingHeapProfileNode[];
        }

        /**
         * Profile.
         */
        export interface SamplingHeapProfile {
            head: HeapProfiler.SamplingHeapProfileNode;
        }

        export interface StartTrackingHeapObjectsParameterType {
            trackAllocations?: boolean;
        }

        export interface StopTrackingHeapObjectsParameterType {
            /**
             * If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken when the tracking is stopped.
             */
            reportProgress?: boolean;
        }

        export interface TakeHeapSnapshotParameterType {
            /**
             * If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken.
             */
            reportProgress?: boolean;
        }

        export interface GetObjectByHeapObjectIdParameterType {
            objectId: HeapProfiler.HeapSnapshotObjectId;
            /**
             * Symbolic group name that can be used to release multiple objects.
             */
            objectGroup?: string;
        }

        export interface AddInspectedHeapObjectParameterType {
            /**
             * Heap snapshot object id to be accessible by means of $x command line API.
             */
            heapObjectId: HeapProfiler.HeapSnapshotObjectId;
        }

        export interface GetHeapObjectIdParameterType {
            /**
             * Identifier of the object to get heap object id for.
             */
            objectId: Runtime.RemoteObjectId;
        }

        export interface StartSamplingParameterType {
            /**
             * Average sample interval in bytes. Poisson distribution is used for the intervals. The default value is 32768 bytes.
             */
            samplingInterval?: number;
        }

        export interface GetObjectByHeapObjectIdReturnType {
            /**
             * Evaluation result.
             */
            result: Runtime.RemoteObject;
        }

        export interface GetHeapObjectIdReturnType {
            /**
             * Id of the heap snapshot object corresponding to the passed remote object id.
             */
            heapSnapshotObjectId: HeapProfiler.HeapSnapshotObjectId;
        }

        export interface StopSamplingReturnType {
            /**
             * Recorded sampling heap profile.
             */
            profile: HeapProfiler.SamplingHeapProfile;
        }

        export interface AddHeapSnapshotChunkEventDataType {
            chunk: string;
        }

        export interface ReportHeapSnapshotProgressEventDataType {
            done: number;
            total: number;
            finished?: boolean;
        }

        export interface LastSeenObjectIdEventDataType {
            lastSeenObjectId: number;
            timestamp: number;
        }

        export interface HeapStatsUpdateEventDataType {
            /**
             * An array of triplets. Each triplet describes a fragment. The first integer is the fragment index, the second integer is a total count of objects for the fragment, the third integer is a total size of the objects for the fragment.
             */
            statsUpdate: number[];
        }
    }

    /**
     * The inspector.Session is used for dispatching messages to the V8 inspector back-end and receiving message responses and notifications.
     */
    export class Session extends EventEmitter {
        /**
         * Create a new instance of the inspector.Session class. The inspector session needs to be connected through session.connect() before the messages can be dispatched to the inspector backend.
         */
        constructor();

        /**
         * Connects a session to the inspector back-end. An exception will be thrown if there is already a connected session established either through the API or by a front-end connected to the Inspector WebSocket port.
         */
        connect(): void;

        /**
         * Immediately close the session. All pending message callbacks will be called with an error. session.connect() will need to be called to be able to send messages again. Reconnected session will lose all inspector state, such as enabled agents or configured breakpoints.
         */
        disconnect(): void;

        /**
         * Posts a message to the inspector back-end. callback will be notified when a response is received. callback is a function that accepts two optional arguments - error and message-specific result.
         */
        post(method: string, params?: {}, callback?: (err: Error | null, params?: {}) => void): void;
        post(method: string, callback?: (err: Error | null, params?: {}) => void): void;

        /**
         * Returns supported domains.
         */
        post(method: "Schema.getDomains", callback?: (err: Error | null, params: Schema.GetDomainsReturnType) => void): void;
        /**
         * Evaluates expression on global object.
         */
        post(method: "Runtime.evaluate", params?: Runtime.EvaluateParameterType, callback?: (err: Error | null, params: Runtime.EvaluateReturnType) => void): void;
        post(method: "Runtime.evaluate", callback?: (err: Error | null, params: Runtime.EvaluateReturnType) => void): void;

        /**
         * Add handler to promise with given promise object id.
         */
        post(method: "Runtime.awaitPromise", params?: Runtime.AwaitPromiseParameterType, callback?: (err: Error | null, params: Runtime.AwaitPromiseReturnType) => void): void;
        post(method: "Runtime.awaitPromise", callback?: (err: Error | null, params: Runtime.AwaitPromiseReturnType) => void): void;

        /**
         * Calls function with given declaration on the given object. Object group of the result is inherited from the target object.
         */
        post(method: "Runtime.callFunctionOn", params?: Runtime.CallFunctionOnParameterType, callback?: (err: Error | null, params: Runtime.CallFunctionOnReturnType) => void): void;
        post(method: "Runtime.callFunctionOn", callback?: (err: Error | null, params: Runtime.CallFunctionOnReturnType) => void): void;

        /**
         * Returns properties of a given object. Object group of the result is inherited from the target object.
         */
        post(method: "Runtime.getProperties", params?: Runtime.GetPropertiesParameterType, callback?: (err: Error | null, params: Runtime.GetPropertiesReturnType) => void): void;
        post(method: "Runtime.getProperties", callback?: (err: Error | null, params: Runtime.GetPropertiesReturnType) => void): void;

        /**
         * Releases remote object with given id.
         */
        post(method: "Runtime.releaseObject", params?: Runtime.ReleaseObjectParameterType, callback?: (err: Error | null) => void): void;
        post(method: "Runtime.releaseObject", callback?: (err: Error | null) => void): void;

        /**
         * Releases all remote objects that belong to a given group.
         */
        post(method: "Runtime.releaseObjectGroup", params?: Runtime.ReleaseObjectGroupParameterType, callback?: (err: Error | null) => void): void;
        post(method: "Runtime.releaseObjectGroup", callback?: (err: Error | null) => void): void;

        /**
         * Tells inspected instance to run if it was waiting for debugger to attach.
         */
        post(method: "Runtime.runIfWaitingForDebugger", callback?: (err: Error | null) => void): void;

        /**
         * Enables reporting of execution contexts creation by means of <code>executionContextCreated</code> event. When the reporting gets enabled the event will be sent immediately for each existing execution context.
         */
        post(method: "Runtime.enable", callback?: (err: Error | null) => void): void;

        /**
         * Disables reporting of execution contexts creation.
         */
        post(method: "Runtime.disable", callback?: (err: Error | null) => void): void;

        /**
         * Discards collected exceptions and console API calls.
         */
        post(method: "Runtime.discardConsoleEntries", callback?: (err: Error | null) => void): void;

        /**
         * @experimental
         */
        post(method: "Runtime.setCustomObjectFormatterEnabled", params?: Runtime.SetCustomObjectFormatterEnabledParameterType, callback?: (err: Error | null) => void): void;
        post(method: "Runtime.setCustomObjectFormatterEnabled", callback?: (err: Error | null) => void): void;

        /**
         * Compiles expression.
         */
        post(method: "Runtime.compileScript", params?: Runtime.CompileScriptParameterType, callback?: (err: Error | null, params: Runtime.CompileScriptReturnType) => void): void;
        post(method: "Runtime.compileScript", callback?: (err: Error | null, params: Runtime.CompileScriptReturnType) => void): void;

        /**
         * Runs script with given id in a given context.
         */
        post(method: "Runtime.runScript", params?: Runtime.RunScriptParameterType, callback?: (err: Error | null, params: Runtime.RunScriptReturnType) => void): void;
        post(method: "Runtime.runScript", callback?: (err: Error | null, params: Runtime.RunScriptReturnType) => void): void;
        /**
         * Enables debugger for the given page. Clients should not assume that the debugging has been enabled until the result for this command is received.
         */
        post(method: "Debugger.enable", callback?: (err: Error | null) => void): void;

        /**
         * Disables debugger for given page.
         */
        post(method: "Debugger.disable", callback?: (err: Error | null) => void): void;

        /**
         * Activates / deactivates all breakpoints on the page.
         */
        post(method: "Debugger.setBreakpointsActive", params?: Debugger.SetBreakpointsActiveParameterType, callback?: (err: Error | null) => void): void;
        post(method: "Debugger.setBreakpointsActive", callback?: (err: Error | null) => void): void;

        /**
         * Makes page not interrupt on any pauses (breakpoint, exception, dom exception etc).
         */
        post(method: "Debugger.setSkipAllPauses", params?: Debugger.SetSkipAllPausesParameterType, callback?: (err: Error | null) => void): void;
        post(method: "Debugger.setSkipAllPauses", callback?: (err: Error | null) => void): void;

        /**
         * Sets JavaScript breakpoint at given location specified either by URL or URL regex. Once this command is issued, all existing parsed scripts will have breakpoints resolved and returned in <code>locations</code> property. Further matching script parsing will result in subsequent <code>breakpointResolved</code> events issued. This logical breakpoint will survive page reloads.
         */
        post(method: "Debugger.setBreakpointByUrl", params?: Debugger.SetBreakpointByUrlParameterType, callback?: (err: Error | null, params: Debugger.SetBreakpointByUrlReturnType) => void): void;
        post(method: "Debugger.setBreakpointByUrl", callback?: (err: Error | null, params: Debugger.SetBreakpointByUrlReturnType) => void): void;

        /**
         * Sets JavaScript breakpoint at a given location.
         */
        post(method: "Debugger.setBreakpoint", params?: Debugger.SetBreakpointParameterType, callback?: (err: Error | null, params: Debugger.SetBreakpointReturnType) => void): void;
        post(method: "Debugger.setBreakpoint", callback?: (err: Error | null, params: Debugger.SetBreakpointReturnType) => void): void;

        /**
         * Removes JavaScript breakpoint.
         */
        post(method: "Debugger.removeBreakpoint", params?: Debugger.RemoveBreakpointParameterType, callback?: (err: Error | null) => void): void;
        post(method: "Debugger.removeBreakpoint", callback?: (err: Error | null) => void): void;

        /**
         * Returns possible locations for breakpoint. scriptId in start and end range locations should be the same.
         * @experimental
         */
        post(method: "Debugger.getPossibleBreakpoints", params?: Debugger.GetPossibleBreakpointsParameterType, callback?: (err: Error | null, params: Debugger.GetPossibleBreakpointsReturnType) => void): void;
        post(method: "Debugger.getPossibleBreakpoints", callback?: (err: Error | null, params: Debugger.GetPossibleBreakpointsReturnType) => void): void;

        /**
         * Continues execution until specific location is reached.
         */
        post(method: "Debugger.continueToLocation", params?: Debugger.ContinueToLocationParameterType, callback?: (err: Error | null) => void): void;
        post(method: "Debugger.continueToLocation", callback?: (err: Error | null) => void): void;

        /**
         * Steps over the statement.
         */
        post(method: "Debugger.stepOver", callback?: (err: Error | null) => void): void;

        /**
         * Steps into the function call.
         */
        post(method: "Debugger.stepInto", callback?: (err: Error | null) => void): void;

        /**
         * Steps out of the function call.
         */
        post(method: "Debugger.stepOut", callback?: (err: Error | null) => void): void;

        /**
         * Stops on the next JavaScript statement.
         */
        post(method: "Debugger.pause", callback?: (err: Error | null) => void): void;

        /**
         * Steps into next scheduled async task if any is scheduled before next pause. Returns success when async task is actually scheduled, returns error if no task were scheduled or another scheduleStepIntoAsync was called.
         * @experimental
         */
        post(method: "Debugger.scheduleStepIntoAsync", callback?: (err: Error | null) => void): void;

        /**
         * Resumes JavaScript execution.
         */
        post(method: "Debugger.resume", callback?: (err: Error | null) => void): void;

        /**
         * Searches for given string in script content.
         * @experimental
         */
        post(method: "Debugger.searchInContent", params?: Debugger.SearchInContentParameterType, callback?: (err: Error | null, params: Debugger.SearchInContentReturnType) => void): void;
        post(method: "Debugger.searchInContent", callback?: (err: Error | null, params: Debugger.SearchInContentReturnType) => void): void;

        /**
         * Edits JavaScript source live.
         */
        post(method: "Debugger.setScriptSource", params?: Debugger.SetScriptSourceParameterType, callback?: (err: Error | null, params: Debugger.SetScriptSourceReturnType) => void): void;
        post(method: "Debugger.setScriptSource", callback?: (err: Error | null, params: Debugger.SetScriptSourceReturnType) => void): void;

        /**
         * Restarts particular call frame from the beginning.
         */
        post(method: "Debugger.restartFrame", params?: Debugger.RestartFrameParameterType, callback?: (err: Error | null, params: Debugger.RestartFrameReturnType) => void): void;
        post(method: "Debugger.restartFrame", callback?: (err: Error | null, params: Debugger.RestartFrameReturnType) => void): void;

        /**
         * Returns source for the script with given id.
         */
        post(method: "Debugger.getScriptSource", params?: Debugger.GetScriptSourceParameterType, callback?: (err: Error | null, params: Debugger.GetScriptSourceReturnType) => void): void;
        post(method: "Debugger.getScriptSource", callback?: (err: Error | null, params: Debugger.GetScriptSourceReturnType) => void): void;

        /**
         * Defines pause on exceptions state. Can be set to stop on all exceptions, uncaught exceptions or no exceptions. Initial pause on exceptions state is <code>none</code>.
         */
        post(method: "Debugger.setPauseOnExceptions", params?: Debugger.SetPauseOnExceptionsParameterType, callback?: (err: Error | null) => void): void;
        post(method: "Debugger.setPauseOnExceptions", callback?: (err: Error | null) => void): void;

        /**
         * Evaluates expression on a given call frame.
         */
        post(method: "Debugger.evaluateOnCallFrame", params?: Debugger.EvaluateOnCallFrameParameterType, callback?: (err: Error | null, params: Debugger.EvaluateOnCallFrameReturnType) => void): void;
        post(method: "Debugger.evaluateOnCallFrame", callback?: (err: Error | null, params: Debugger.EvaluateOnCallFrameReturnType) => void): void;

        /**
         * Changes value of variable in a callframe. Object-based scopes are not supported and must be mutated manually.
         */
        post(method: "Debugger.setVariableValue", params?: Debugger.SetVariableValueParameterType, callback?: (err: Error | null) => void): void;
        post(method: "Debugger.setVariableValue", callback?: (err: Error | null) => void): void;

        /**
         * Enables or disables async call stacks tracking.
         */
        post(method: "Debugger.setAsyncCallStackDepth", params?: Debugger.SetAsyncCallStackDepthParameterType, callback?: (err: Error | null) => void): void;
        post(method: "Debugger.setAsyncCallStackDepth", callback?: (err: Error | null) => void): void;

        /**
         * Replace previous blackbox patterns with passed ones. Forces backend to skip stepping/pausing in scripts with url matching one of the patterns. VM will try to leave blackboxed script by performing 'step in' several times, finally resorting to 'step out' if unsuccessful.
         * @experimental
         */
        post(method: "Debugger.setBlackboxPatterns", params?: Debugger.SetBlackboxPatternsParameterType, callback?: (err: Error | null) => void): void;
        post(method: "Debugger.setBlackboxPatterns", callback?: (err: Error | null) => void): void;

        /**
         * Makes backend skip steps in the script in blackboxed ranges. VM will try leave blacklisted scripts by performing 'step in' several times, finally resorting to 'step out' if unsuccessful. Positions array contains positions where blackbox state is changed. First interval isn't blackboxed. Array should be sorted.
         * @experimental
         */
        post(method: "Debugger.setBlackboxedRanges", params?: Debugger.SetBlackboxedRangesParameterType, callback?: (err: Error | null) => void): void;
        post(method: "Debugger.setBlackboxedRanges", callback?: (err: Error | null) => void): void;
        /**
         * Enables console domain, sends the messages collected so far to the client by means of the <code>messageAdded</code> notification.
         */
        post(method: "Console.enable", callback?: (err: Error | null) => void): void;

        /**
         * Disables console domain, prevents further console messages from being reported to the client.
         */
        post(method: "Console.disable", callback?: (err: Error | null) => void): void;

        /**
         * Does nothing.
         */
        post(method: "Console.clearMessages", callback?: (err: Error | null) => void): void;
        post(method: "Profiler.enable", callback?: (err: Error | null) => void): void;

        post(method: "Profiler.disable", callback?: (err: Error | null) => void): void;

        /**
         * Changes CPU profiler sampling interval. Must be called before CPU profiles recording started.
         */
        post(method: "Profiler.setSamplingInterval", params?: Profiler.SetSamplingIntervalParameterType, callback?: (err: Error | null) => void): void;
        post(method: "Profiler.setSamplingInterval", callback?: (err: Error | null) => void): void;

        post(method: "Profiler.start", callback?: (err: Error | null) => void): void;

        post(method: "Profiler.stop", callback?: (err: Error | null, params: Profiler.StopReturnType) => void): void;

        /**
         * Enable precise code coverage. Coverage data for JavaScript executed before enabling precise code coverage may be incomplete. Enabling prevents running optimized code and resets execution counters.
         * @experimental
         */
        post(method: "Profiler.startPreciseCoverage", params?: Profiler.StartPreciseCoverageParameterType, callback?: (err: Error | null) => void): void;
        post(method: "Profiler.startPreciseCoverage", callback?: (err: Error | null) => void): void;

        /**
         * Disable precise code coverage. Disabling releases unnecessary execution count records and allows executing optimized code.
         * @experimental
         */
        post(method: "Profiler.stopPreciseCoverage", callback?: (err: Error | null) => void): void;

        /**
         * Collect coverage data for the current isolate, and resets execution counters. Precise code coverage needs to have started.
         * @experimental
         */
        post(method: "Profiler.takePreciseCoverage", callback?: (err: Error | null, params: Profiler.TakePreciseCoverageReturnType) => void): void;

        /**
         * Collect coverage data for the current isolate. The coverage data may be incomplete due to garbage collection.
         * @experimental
         */
        post(method: "Profiler.getBestEffortCoverage", callback?: (err: Error | null, params: Profiler.GetBestEffortCoverageReturnType) => void): void;
        post(method: "HeapProfiler.enable", callback?: (err: Error | null) => void): void;

        post(method: "HeapProfiler.disable", callback?: (err: Error | null) => void): void;

        post(method: "HeapProfiler.startTrackingHeapObjects", params?: HeapProfiler.StartTrackingHeapObjectsParameterType, callback?: (err: Error | null) => void): void;
        post(method: "HeapProfiler.startTrackingHeapObjects", callback?: (err: Error | null) => void): void;

        post(method: "HeapProfiler.stopTrackingHeapObjects", params?: HeapProfiler.StopTrackingHeapObjectsParameterType, callback?: (err: Error | null) => void): void;
        post(method: "HeapProfiler.stopTrackingHeapObjects", callback?: (err: Error | null) => void): void;

        post(method: "HeapProfiler.takeHeapSnapshot", params?: HeapProfiler.TakeHeapSnapshotParameterType, callback?: (err: Error | null) => void): void;
        post(method: "HeapProfiler.takeHeapSnapshot", callback?: (err: Error | null) => void): void;

        post(method: "HeapProfiler.collectGarbage", callback?: (err: Error | null) => void): void;

        post(method: "HeapProfiler.getObjectByHeapObjectId", params?: HeapProfiler.GetObjectByHeapObjectIdParameterType, callback?: (err: Error | null, params: HeapProfiler.GetObjectByHeapObjectIdReturnType) => void): void;
        post(method: "HeapProfiler.getObjectByHeapObjectId", callback?: (err: Error | null, params: HeapProfiler.GetObjectByHeapObjectIdReturnType) => void): void;

        /**
         * Enables console to refer to the node with given id via $x (see Command Line API for more details $x functions).
         */
        post(method: "HeapProfiler.addInspectedHeapObject", params?: HeapProfiler.AddInspectedHeapObjectParameterType, callback?: (err: Error | null) => void): void;
        post(method: "HeapProfiler.addInspectedHeapObject", callback?: (err: Error | null) => void): void;

        post(method: "HeapProfiler.getHeapObjectId", params?: HeapProfiler.GetHeapObjectIdParameterType, callback?: (err: Error | null, params: HeapProfiler.GetHeapObjectIdReturnType) => void): void;
        post(method: "HeapProfiler.getHeapObjectId", callback?: (err: Error | null, params: HeapProfiler.GetHeapObjectIdReturnType) => void): void;

        post(method: "HeapProfiler.startSampling", params?: HeapProfiler.StartSamplingParameterType, callback?: (err: Error | null) => void): void;
        post(method: "HeapProfiler.startSampling", callback?: (err: Error | null) => void): void;

        post(method: "HeapProfiler.stopSampling", callback?: (err: Error | null, params: HeapProfiler.StopSamplingReturnType) => void): void;

        // Events

        addListener(event: string, listener: (...args: any[]) => void): this;

        /**
         * Emitted when any notification from the V8 Inspector is received.
         */
        addListener(event: "inspectorNotification", listener: (message: InspectorNotification<{}>) => void): this;

        /**
         * Issued when new execution context is created.
         */
        addListener(event: "Runtime.executionContextCreated", listener: (message: InspectorNotification<Runtime.ExecutionContextCreatedEventDataType>) => void): this;

        /**
         * Issued when execution context is destroyed.
         */
        addListener(event: "Runtime.executionContextDestroyed", listener: (message: InspectorNotification<Runtime.ExecutionContextDestroyedEventDataType>) => void): this;

        /**
         * Issued when all executionContexts were cleared in browser
         */
        addListener(event: "Runtime.executionContextsCleared", listener: () => void): this;

        /**
         * Issued when exception was thrown and unhandled.
         */
        addListener(event: "Runtime.exceptionThrown", listener: (message: InspectorNotification<Runtime.ExceptionThrownEventDataType>) => void): this;

        /**
         * Issued when unhandled exception was revoked.
         */
        addListener(event: "Runtime.exceptionRevoked", listener: (message: InspectorNotification<Runtime.ExceptionRevokedEventDataType>) => void): this;

        /**
         * Issued when console API was called.
         */
        addListener(event: "Runtime.consoleAPICalled", listener: (message: InspectorNotification<Runtime.ConsoleAPICalledEventDataType>) => void): this;

        /**
         * Issued when object should be inspected (for example, as a result of inspect() command line API call).
         */
        addListener(event: "Runtime.inspectRequested", listener: (message: InspectorNotification<Runtime.InspectRequestedEventDataType>) => void): this;

        /**
         * Fired when virtual machine parses script. This event is also fired for all known and uncollected scripts upon enabling debugger.
         */
        addListener(event: "Debugger.scriptParsed", listener: (message: InspectorNotification<Debugger.ScriptParsedEventDataType>) => void): this;

        /**
         * Fired when virtual machine fails to parse the script.
         */
        addListener(event: "Debugger.scriptFailedToParse", listener: (message: InspectorNotification<Debugger.ScriptFailedToParseEventDataType>) => void): this;

        /**
         * Fired when breakpoint is resolved to an actual script and location.
         */
        addListener(event: "Debugger.breakpointResolved", listener: (message: InspectorNotification<Debugger.BreakpointResolvedEventDataType>) => void): this;

        /**
         * Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria.
         */
        addListener(event: "Debugger.paused", listener: (message: InspectorNotification<Debugger.PausedEventDataType>) => void): this;

        /**
         * Fired when the virtual machine resumed execution.
         */
        addListener(event: "Debugger.resumed", listener: () => void): this;

        /**
         * Issued when new console message is added.
         */
        addListener(event: "Console.messageAdded", listener: (message: InspectorNotification<Console.MessageAddedEventDataType>) => void): this;

        /**
         * Sent when new profile recording is started using console.profile() call.
         */
        addListener(event: "Profiler.consoleProfileStarted", listener: (message: InspectorNotification<Profiler.ConsoleProfileStartedEventDataType>) => void): this;

        addListener(event: "Profiler.consoleProfileFinished", listener: (message: InspectorNotification<Profiler.ConsoleProfileFinishedEventDataType>) => void): this;
        addListener(event: "HeapProfiler.addHeapSnapshotChunk", listener: (message: InspectorNotification<HeapProfiler.AddHeapSnapshotChunkEventDataType>) => void): this;
        addListener(event: "HeapProfiler.resetProfiles", listener: () => void): this;
        addListener(event: "HeapProfiler.reportHeapSnapshotProgress", listener: (message: InspectorNotification<HeapProfiler.ReportHeapSnapshotProgressEventDataType>) => void): this;

        /**
         * If heap objects tracking has been started then backend regularly sends a current value for last seen object id and corresponding timestamp. If the were changes in the heap since last event then one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event.
         */
        addListener(event: "HeapProfiler.lastSeenObjectId", listener: (message: InspectorNotification<HeapProfiler.LastSeenObjectIdEventDataType>) => void): this;

        /**
         * If heap objects tracking has been started then backend may send update for one or more fragments
         */
        addListener(event: "HeapProfiler.heapStatsUpdate", listener: (message: InspectorNotification<HeapProfiler.HeapStatsUpdateEventDataType>) => void): this;

        emit(event: string | symbol, ...args: any[]): boolean;
        emit(event: "inspectorNotification", message: InspectorNotification<{}>): boolean;
        emit(event: "Runtime.executionContextCreated", message: InspectorNotification<Runtime.ExecutionContextCreatedEventDataType>): boolean;
        emit(event: "Runtime.executionContextDestroyed", message: InspectorNotification<Runtime.ExecutionContextDestroyedEventDataType>): boolean;
        emit(event: "Runtime.executionContextsCleared"): boolean;
        emit(event: "Runtime.exceptionThrown", message: InspectorNotification<Runtime.ExceptionThrownEventDataType>): boolean;
        emit(event: "Runtime.exceptionRevoked", message: InspectorNotification<Runtime.ExceptionRevokedEventDataType>): boolean;
        emit(event: "Runtime.consoleAPICalled", message: InspectorNotification<Runtime.ConsoleAPICalledEventDataType>): boolean;
        emit(event: "Runtime.inspectRequested", message: InspectorNotification<Runtime.InspectRequestedEventDataType>): boolean;
        emit(event: "Debugger.scriptParsed", message: InspectorNotification<Debugger.ScriptParsedEventDataType>): boolean;
        emit(event: "Debugger.scriptFailedToParse", message: InspectorNotification<Debugger.ScriptFailedToParseEventDataType>): boolean;
        emit(event: "Debugger.breakpointResolved", message: InspectorNotification<Debugger.BreakpointResolvedEventDataType>): boolean;
        emit(event: "Debugger.paused", message: InspectorNotification<Debugger.PausedEventDataType>): boolean;
        emit(event: "Debugger.resumed"): boolean;
        emit(event: "Console.messageAdded", message: InspectorNotification<Console.MessageAddedEventDataType>): boolean;
        emit(event: "Profiler.consoleProfileStarted", message: InspectorNotification<Profiler.ConsoleProfileStartedEventDataType>): boolean;
        emit(event: "Profiler.consoleProfileFinished", message: InspectorNotification<Profiler.ConsoleProfileFinishedEventDataType>): boolean;
        emit(event: "HeapProfiler.addHeapSnapshotChunk", message: InspectorNotification<HeapProfiler.AddHeapSnapshotChunkEventDataType>): boolean;
        emit(event: "HeapProfiler.resetProfiles"): boolean;
        emit(event: "HeapProfiler.reportHeapSnapshotProgress", message: InspectorNotification<HeapProfiler.ReportHeapSnapshotProgressEventDataType>): boolean;
        emit(event: "HeapProfiler.lastSeenObjectId", message: InspectorNotification<HeapProfiler.LastSeenObjectIdEventDataType>): boolean;
        emit(event: "HeapProfiler.heapStatsUpdate", message: InspectorNotification<HeapProfiler.HeapStatsUpdateEventDataType>): boolean;

        on(event: string, listener: (...args: any[]) => void): this;

        /**
         * Emitted when any notification from the V8 Inspector is received.
         */
        on(event: "inspectorNotification", listener: (message: InspectorNotification<{}>) => void): this;

        /**
         * Issued when new execution context is created.
         */
        on(event: "Runtime.executionContextCreated", listener: (message: InspectorNotification<Runtime.ExecutionContextCreatedEventDataType>) => void): this;

        /**
         * Issued when execution context is destroyed.
         */
        on(event: "Runtime.executionContextDestroyed", listener: (message: InspectorNotification<Runtime.ExecutionContextDestroyedEventDataType>) => void): this;

        /**
         * Issued when all executionContexts were cleared in browser
         */
        on(event: "Runtime.executionContextsCleared", listener: () => void): this;

        /**
         * Issued when exception was thrown and unhandled.
         */
        on(event: "Runtime.exceptionThrown", listener: (message: InspectorNotification<Runtime.ExceptionThrownEventDataType>) => void): this;

        /**
         * Issued when unhandled exception was revoked.
         */
        on(event: "Runtime.exceptionRevoked", listener: (message: InspectorNotification<Runtime.ExceptionRevokedEventDataType>) => void): this;

        /**
         * Issued when console API was called.
         */
        on(event: "Runtime.consoleAPICalled", listener: (message: InspectorNotification<Runtime.ConsoleAPICalledEventDataType>) => void): this;

        /**
         * Issued when object should be inspected (for example, as a result of inspect() command line API call).
         */
        on(event: "Runtime.inspectRequested", listener: (message: InspectorNotification<Runtime.InspectRequestedEventDataType>) => void): this;

        /**
         * Fired when virtual machine parses script. This event is also fired for all known and uncollected scripts upon enabling debugger.
         */
        on(event: "Debugger.scriptParsed", listener: (message: InspectorNotification<Debugger.ScriptParsedEventDataType>) => void): this;

        /**
         * Fired when virtual machine fails to parse the script.
         */
        on(event: "Debugger.scriptFailedToParse", listener: (message: InspectorNotification<Debugger.ScriptFailedToParseEventDataType>) => void): this;

        /**
         * Fired when breakpoint is resolved to an actual script and location.
         */
        on(event: "Debugger.breakpointResolved", listener: (message: InspectorNotification<Debugger.BreakpointResolvedEventDataType>) => void): this;

        /**
         * Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria.
         */
        on(event: "Debugger.paused", listener: (message: InspectorNotification<Debugger.PausedEventDataType>) => void): this;

        /**
         * Fired when the virtual machine resumed execution.
         */
        on(event: "Debugger.resumed", listener: () => void): this;

        /**
         * Issued when new console message is added.
         */
        on(event: "Console.messageAdded", listener: (message: InspectorNotification<Console.MessageAddedEventDataType>) => void): this;

        /**
         * Sent when new profile recording is started using console.profile() call.
         */
        on(event: "Profiler.consoleProfileStarted", listener: (message: InspectorNotification<Profiler.ConsoleProfileStartedEventDataType>) => void): this;

        on(event: "Profiler.consoleProfileFinished", listener: (message: InspectorNotification<Profiler.ConsoleProfileFinishedEventDataType>) => void): this;
        on(event: "HeapProfiler.addHeapSnapshotChunk", listener: (message: InspectorNotification<HeapProfiler.AddHeapSnapshotChunkEventDataType>) => void): this;
        on(event: "HeapProfiler.resetProfiles", listener: () => void): this;
        on(event: "HeapProfiler.reportHeapSnapshotProgress", listener: (message: InspectorNotification<HeapProfiler.ReportHeapSnapshotProgressEventDataType>) => void): this;

        /**
         * If heap objects tracking has been started then backend regularly sends a current value for last seen object id and corresponding timestamp. If the were changes in the heap since last event then one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event.
         */
        on(event: "HeapProfiler.lastSeenObjectId", listener: (message: InspectorNotification<HeapProfiler.LastSeenObjectIdEventDataType>) => void): this;

        /**
         * If heap objects tracking has been started then backend may send update for one or more fragments
         */
        on(event: "HeapProfiler.heapStatsUpdate", listener: (message: InspectorNotification<HeapProfiler.HeapStatsUpdateEventDataType>) => void): this;

        once(event: string, listener: (...args: any[]) => void): this;

        /**
         * Emitted when any notification from the V8 Inspector is received.
         */
        once(event: "inspectorNotification", listener: (message: InspectorNotification<{}>) => void): this;

        /**
         * Issued when new execution context is created.
         */
        once(event: "Runtime.executionContextCreated", listener: (message: InspectorNotification<Runtime.ExecutionContextCreatedEventDataType>) => void): this;

        /**
         * Issued when execution context is destroyed.
         */
        once(event: "Runtime.executionContextDestroyed", listener: (message: InspectorNotification<Runtime.ExecutionContextDestroyedEventDataType>) => void): this;

        /**
         * Issued when all executionContexts were cleared in browser
         */
        once(event: "Runtime.executionContextsCleared", listener: () => void): this;

        /**
         * Issued when exception was thrown and unhandled.
         */
        once(event: "Runtime.exceptionThrown", listener: (message: InspectorNotification<Runtime.ExceptionThrownEventDataType>) => void): this;

        /**
         * Issued when unhandled exception was revoked.
         */
        once(event: "Runtime.exceptionRevoked", listener: (message: InspectorNotification<Runtime.ExceptionRevokedEventDataType>) => void): this;

        /**
         * Issued when console API was called.
         */
        once(event: "Runtime.consoleAPICalled", listener: (message: InspectorNotification<Runtime.ConsoleAPICalledEventDataType>) => void): this;

        /**
         * Issued when object should be inspected (for example, as a result of inspect() command line API call).
         */
        once(event: "Runtime.inspectRequested", listener: (message: InspectorNotification<Runtime.InspectRequestedEventDataType>) => void): this;

        /**
         * Fired when virtual machine parses script. This event is also fired for all known and uncollected scripts upon enabling debugger.
         */
        once(event: "Debugger.scriptParsed", listener: (message: InspectorNotification<Debugger.ScriptParsedEventDataType>) => void): this;

        /**
         * Fired when virtual machine fails to parse the script.
         */
        once(event: "Debugger.scriptFailedToParse", listener: (message: InspectorNotification<Debugger.ScriptFailedToParseEventDataType>) => void): this;

        /**
         * Fired when breakpoint is resolved to an actual script and location.
         */
        once(event: "Debugger.breakpointResolved", listener: (message: InspectorNotification<Debugger.BreakpointResolvedEventDataType>) => void): this;

        /**
         * Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria.
         */
        once(event: "Debugger.paused", listener: (message: InspectorNotification<Debugger.PausedEventDataType>) => void): this;

        /**
         * Fired when the virtual machine resumed execution.
         */
        once(event: "Debugger.resumed", listener: () => void): this;

        /**
         * Issued when new console message is added.
         */
        once(event: "Console.messageAdded", listener: (message: InspectorNotification<Console.MessageAddedEventDataType>) => void): this;

        /**
         * Sent when new profile recording is started using console.profile() call.
         */
        once(event: "Profiler.consoleProfileStarted", listener: (message: InspectorNotification<Profiler.ConsoleProfileStartedEventDataType>) => void): this;

        once(event: "Profiler.consoleProfileFinished", listener: (message: InspectorNotification<Profiler.ConsoleProfileFinishedEventDataType>) => void): this;
        once(event: "HeapProfiler.addHeapSnapshotChunk", listener: (message: InspectorNotification<HeapProfiler.AddHeapSnapshotChunkEventDataType>) => void): this;
        once(event: "HeapProfiler.resetProfiles", listener: () => void): this;
        once(event: "HeapProfiler.reportHeapSnapshotProgress", listener: (message: InspectorNotification<HeapProfiler.ReportHeapSnapshotProgressEventDataType>) => void): this;

        /**
         * If heap objects tracking has been started then backend regularly sends a current value for last seen object id and corresponding timestamp. If the were changes in the heap since last event then one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event.
         */
        once(event: "HeapProfiler.lastSeenObjectId", listener: (message: InspectorNotification<HeapProfiler.LastSeenObjectIdEventDataType>) => void): this;

        /**
         * If heap objects tracking has been started then backend may send update for one or more fragments
         */
        once(event: "HeapProfiler.heapStatsUpdate", listener: (message: InspectorNotification<HeapProfiler.HeapStatsUpdateEventDataType>) => void): this;

        prependListener(event: string, listener: (...args: any[]) => void): this;

        /**
         * Emitted when any notification from the V8 Inspector is received.
         */
        prependListener(event: "inspectorNotification", listener: (message: InspectorNotification<{}>) => void): this;

        /**
         * Issued when new execution context is created.
         */
        prependListener(event: "Runtime.executionContextCreated", listener: (message: InspectorNotification<Runtime.ExecutionContextCreatedEventDataType>) => void): this;

        /**
         * Issued when execution context is destroyed.
         */
        prependListener(event: "Runtime.executionContextDestroyed", listener: (message: InspectorNotification<Runtime.ExecutionContextDestroyedEventDataType>) => void): this;

        /**
         * Issued when all executionContexts were cleared in browser
         */
        prependListener(event: "Runtime.executionContextsCleared", listener: () => void): this;

        /**
         * Issued when exception was thrown and unhandled.
         */
        prependListener(event: "Runtime.exceptionThrown", listener: (message: InspectorNotification<Runtime.ExceptionThrownEventDataType>) => void): this;

        /**
         * Issued when unhandled exception was revoked.
         */
        prependListener(event: "Runtime.exceptionRevoked", listener: (message: InspectorNotification<Runtime.ExceptionRevokedEventDataType>) => void): this;

        /**
         * Issued when console API was called.
         */
        prependListener(event: "Runtime.consoleAPICalled", listener: (message: InspectorNotification<Runtime.ConsoleAPICalledEventDataType>) => void): this;

        /**
         * Issued when object should be inspected (for example, as a result of inspect() command line API call).
         */
        prependListener(event: "Runtime.inspectRequested", listener: (message: InspectorNotification<Runtime.InspectRequestedEventDataType>) => void): this;

        /**
         * Fired when virtual machine parses script. This event is also fired for all known and uncollected scripts upon enabling debugger.
         */
        prependListener(event: "Debugger.scriptParsed", listener: (message: InspectorNotification<Debugger.ScriptParsedEventDataType>) => void): this;

        /**
         * Fired when virtual machine fails to parse the script.
         */
        prependListener(event: "Debugger.scriptFailedToParse", listener: (message: InspectorNotification<Debugger.ScriptFailedToParseEventDataType>) => void): this;

        /**
         * Fired when breakpoint is resolved to an actual script and location.
         */
        prependListener(event: "Debugger.breakpointResolved", listener: (message: InspectorNotification<Debugger.BreakpointResolvedEventDataType>) => void): this;

        /**
         * Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria.
         */
        prependListener(event: "Debugger.paused", listener: (message: InspectorNotification<Debugger.PausedEventDataType>) => void): this;

        /**
         * Fired when the virtual machine resumed execution.
         */
        prependListener(event: "Debugger.resumed", listener: () => void): this;

        /**
         * Issued when new console message is added.
         */
        prependListener(event: "Console.messageAdded", listener: (message: InspectorNotification<Console.MessageAddedEventDataType>) => void): this;

        /**
         * Sent when new profile recording is started using console.profile() call.
         */
        prependListener(event: "Profiler.consoleProfileStarted", listener: (message: InspectorNotification<Profiler.ConsoleProfileStartedEventDataType>) => void): this;

        prependListener(event: "Profiler.consoleProfileFinished", listener: (message: InspectorNotification<Profiler.ConsoleProfileFinishedEventDataType>) => void): this;
        prependListener(event: "HeapProfiler.addHeapSnapshotChunk", listener: (message: InspectorNotification<HeapProfiler.AddHeapSnapshotChunkEventDataType>) => void): this;
        prependListener(event: "HeapProfiler.resetProfiles", listener: () => void): this;
        prependListener(event: "HeapProfiler.reportHeapSnapshotProgress", listener: (message: InspectorNotification<HeapProfiler.ReportHeapSnapshotProgressEventDataType>) => void): this;

        /**
         * If heap objects tracking has been started then backend regularly sends a current value for last seen object id and corresponding timestamp. If the were changes in the heap since last event then one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event.
         */
        prependListener(event: "HeapProfiler.lastSeenObjectId", listener: (message: InspectorNotification<HeapProfiler.LastSeenObjectIdEventDataType>) => void): this;

        /**
         * If heap objects tracking has been started then backend may send update for one or more fragments
         */
        prependListener(event: "HeapProfiler.heapStatsUpdate", listener: (message: InspectorNotification<HeapProfiler.HeapStatsUpdateEventDataType>) => void): this;

        prependOnceListener(event: string, listener: (...args: any[]) => void): this;

        /**
         * Emitted when any notification from the V8 Inspector is received.
         */
        prependOnceListener(event: "inspectorNotification", listener: (message: InspectorNotification<{}>) => void): this;

        /**
         * Issued when new execution context is created.
         */
        prependOnceListener(event: "Runtime.executionContextCreated", listener: (message: InspectorNotification<Runtime.ExecutionContextCreatedEventDataType>) => void): this;

        /**
         * Issued when execution context is destroyed.
         */
        prependOnceListener(event: "Runtime.executionContextDestroyed", listener: (message: InspectorNotification<Runtime.ExecutionContextDestroyedEventDataType>) => void): this;

        /**
         * Issued when all executionContexts were cleared in browser
         */
        prependOnceListener(event: "Runtime.executionContextsCleared", listener: () => void): this;

        /**
         * Issued when exception was thrown and unhandled.
         */
        prependOnceListener(event: "Runtime.exceptionThrown", listener: (message: InspectorNotification<Runtime.ExceptionThrownEventDataType>) => void): this;

        /**
         * Issued when unhandled exception was revoked.
         */
        prependOnceListener(event: "Runtime.exceptionRevoked", listener: (message: InspectorNotification<Runtime.ExceptionRevokedEventDataType>) => void): this;

        /**
         * Issued when console API was called.
         */
        prependOnceListener(event: "Runtime.consoleAPICalled", listener: (message: InspectorNotification<Runtime.ConsoleAPICalledEventDataType>) => void): this;

        /**
         * Issued when object should be inspected (for example, as a result of inspect() command line API call).
         */
        prependOnceListener(event: "Runtime.inspectRequested", listener: (message: InspectorNotification<Runtime.InspectRequestedEventDataType>) => void): this;

        /**
         * Fired when virtual machine parses script. This event is also fired for all known and uncollected scripts upon enabling debugger.
         */
        prependOnceListener(event: "Debugger.scriptParsed", listener: (message: InspectorNotification<Debugger.ScriptParsedEventDataType>) => void): this;

        /**
         * Fired when virtual machine fails to parse the script.
         */
        prependOnceListener(event: "Debugger.scriptFailedToParse", listener: (message: InspectorNotification<Debugger.ScriptFailedToParseEventDataType>) => void): this;

        /**
         * Fired when breakpoint is resolved to an actual script and location.
         */
        prependOnceListener(event: "Debugger.breakpointResolved", listener: (message: InspectorNotification<Debugger.BreakpointResolvedEventDataType>) => void): this;

        /**
         * Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria.
         */
        prependOnceListener(event: "Debugger.paused", listener: (message: InspectorNotification<Debugger.PausedEventDataType>) => void): this;

        /**
         * Fired when the virtual machine resumed execution.
         */
        prependOnceListener(event: "Debugger.resumed", listener: () => void): this;

        /**
         * Issued when new console message is added.
         */
        prependOnceListener(event: "Console.messageAdded", listener: (message: InspectorNotification<Console.MessageAddedEventDataType>) => void): this;

        /**
         * Sent when new profile recording is started using console.profile() call.
         */
        prependOnceListener(event: "Profiler.consoleProfileStarted", listener: (message: InspectorNotification<Profiler.ConsoleProfileStartedEventDataType>) => void): this;

        prependOnceListener(event: "Profiler.consoleProfileFinished", listener: (message: InspectorNotification<Profiler.ConsoleProfileFinishedEventDataType>) => void): this;
        prependOnceListener(event: "HeapProfiler.addHeapSnapshotChunk", listener: (message: InspectorNotification<HeapProfiler.AddHeapSnapshotChunkEventDataType>) => void): this;
        prependOnceListener(event: "HeapProfiler.resetProfiles", listener: () => void): this;
        prependOnceListener(event: "HeapProfiler.reportHeapSnapshotProgress", listener: (message: InspectorNotification<HeapProfiler.ReportHeapSnapshotProgressEventDataType>) => void): this;

        /**
         * If heap objects tracking has been started then backend regularly sends a current value for last seen object id and corresponding timestamp. If the were changes in the heap since last event then one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event.
         */
        prependOnceListener(event: "HeapProfiler.lastSeenObjectId", listener: (message: InspectorNotification<HeapProfiler.LastSeenObjectIdEventDataType>) => void): this;

        /**
         * If heap objects tracking has been started then backend may send update for one or more fragments
         */
        prependOnceListener(event: "HeapProfiler.heapStatsUpdate", listener: (message: InspectorNotification<HeapProfiler.HeapStatsUpdateEventDataType>) => void): this;
    }

    // Top Level API

    /**
     * Activate inspector on host and port. Equivalent to node --inspect=[[host:]port], but can be done programatically after node has started.
     * If wait is true, will block until a client has connected to the inspect port and flow control has been passed to the debugger client.
     * @param port Port to listen on for inspector connections. Optional, defaults to what was specified on the CLI.
     * @param host Host to listen on for inspector connections. Optional, defaults to what was specified on the CLI.
     * @param wait Block until a client has connected. Optional, defaults to false.
     */
    export function open(port?: number, host?: string, wait?: boolean): void;

    /**
     * Deactivate the inspector. Blocks until there are no active connections.
     */
    export function close(): void;

    /**
     * Return the URL of the active inspector, or undefined if there is none.
     */
    export function url(): string;
}
