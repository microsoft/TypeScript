import {
    Debug,
    DeprecationOptions,
    formatStringFromArgs,
    noop,
    Version,
    version,
} from "./_namespaces/ts.js";

export let enableDeprecationWarnings = true;

export function setEnableDeprecationWarnings(value: boolean): void {
    enableDeprecationWarnings = value;
}

let typeScriptVersion: Version | undefined;

function getTypeScriptVersion() {
    return typeScriptVersion ?? (typeScriptVersion = new Version(version));
}

function formatDeprecationMessage(name: string, error: boolean | undefined, errorAfter: Version | undefined, since: Version | undefined, message: string | undefined) {
    let deprecationMessage = error ? "DeprecationError: " : "DeprecationWarning: ";
    deprecationMessage += `'${name}' `;
    deprecationMessage += since ? `has been deprecated since v${since}` : "is deprecated";
    deprecationMessage += error ? " and can no longer be used." : errorAfter ? ` and will no longer be usable after v${errorAfter}.` : ".";
    deprecationMessage += message ? ` ${formatStringFromArgs(message, [name])}` : "";
    return deprecationMessage;
}

function createErrorDeprecation(name: string, errorAfter: Version | undefined, since: Version | undefined, message: string | undefined) {
    const deprecationMessage = formatDeprecationMessage(name, /*error*/ true, errorAfter, since, message);
    return () => {
        throw new TypeError(deprecationMessage);
    };
}

function createWarningDeprecation(name: string, errorAfter: Version | undefined, since: Version | undefined, message: string | undefined) {
    let hasWrittenDeprecation = false;
    return () => {
        if (enableDeprecationWarnings && !hasWrittenDeprecation) {
            Debug.log.warn(formatDeprecationMessage(name, /*error*/ false, errorAfter, since, message));
            hasWrittenDeprecation = true;
        }
    };
}

export function createDeprecation(name: string, options: DeprecationOptions & { error: true; }): () => never;
export function createDeprecation(name: string, options?: DeprecationOptions): () => void;
export function createDeprecation(name: string, options: DeprecationOptions = {}) {
    const version = typeof options.typeScriptVersion === "string" ? new Version(options.typeScriptVersion) : options.typeScriptVersion ?? getTypeScriptVersion();
    const errorAfter = typeof options.errorAfter === "string" ? new Version(options.errorAfter) : options.errorAfter;
    const warnAfter = typeof options.warnAfter === "string" ? new Version(options.warnAfter) : options.warnAfter;
    const since = typeof options.since === "string" ? new Version(options.since) : options.since ?? warnAfter;
    const error = options.error || errorAfter && version.compareTo(errorAfter) >= 0;
    const warn = !warnAfter || version.compareTo(warnAfter) >= 0;
    return error ? createErrorDeprecation(name, errorAfter, since, options.message) :
        warn ? createWarningDeprecation(name, errorAfter, since, options.message) :
        noop;
}

function wrapFunction<F extends (...args: any[]) => any>(deprecation: () => void, func: F): F {
    return function (this: unknown) {
        deprecation();
        // eslint-disable-next-line prefer-rest-params
        return func.apply(this, arguments);
    } as F;
}

export function deprecate<F extends (...args: any[]) => any>(func: F, options?: DeprecationOptions): F {
    const deprecation = createDeprecation(options?.name ?? Debug.getFunctionName(func), options);
    return wrapFunction(deprecation, func);
}
