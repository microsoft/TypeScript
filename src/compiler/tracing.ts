/*@internal*/
/** Tracing events for the compiler. */
namespace ts.tracing {
    export const enum Mode {
        Project,
        Build,
        Server,
    }

    let fs: typeof import("fs") | false | undefined;

    let traceCount = 0;
    let traceFd: number | undefined;

    let mode: Mode;

    let legendPath: string | undefined;
    const legend: TraceRecord[] = [];

    /** Starts tracing for the given project (unless the `fs` module is unavailable). */
    export function startTracing(tracingMode: Mode, traceDir: string, configFilePath?: string) {
        Debug.assert(!traceFd, "Tracing already started");

        if (fs === undefined) {
            try {
                fs = require("fs");
            }
            catch {
                fs = false;
            }
        }

        if (!fs) {
            return;
        }

        mode = tracingMode;

        if (legendPath === undefined) {
            legendPath = combinePaths(traceDir, "legend.json");
        }

        // Note that writing will fail later on if it exists and is not a directory
        if (!fs.existsSync(traceDir)) {
            fs.mkdirSync(traceDir, { recursive: true });
        }

        const countPart =
            mode === Mode.Build ? `.${process.pid}-${++traceCount}` :
            mode === Mode.Server ? `.${process.pid}` :
            ``;
        const tracePath = combinePaths(traceDir, `trace${countPart}.json`);
        const typesPath = combinePaths(traceDir, `types${countPart}.json`);

        legend.push({
            configFilePath,
            tracePath,
            typesPath,
        });

        traceFd = fs.openSync(tracePath, "w");

        // Start with a prefix that contains some metadata that the devtools profiler expects (also avoids a warning on import)
        const meta = { cat: "__metadata", ph: "M", ts: 1000 * timestamp(), pid: 1, tid: 1 };
        fs.writeSync(traceFd,
                     "[\n"
                     + [{ name: "process_name", args: { name: "tsc" }, ...meta },
                        { name: "thread_name", args: { name: "Main" }, ...meta },
                        { name: "TracingStartedInBrowser", ...meta, cat: "disabled-by-default-devtools.timeline" }]
                       .map(v => JSON.stringify(v)).join(",\n"));
    }

    /** Stops tracing for the in-progress project and dumps the type catalog (unless the `fs` module is unavailable). */
    export function stopTracing(typeCatalog?: readonly Type[]) {
        if (!traceFd) {
            Debug.assert(!fs, "Tracing is not in progress");
            return;
        }

        Debug.assert(fs);
        Debug.assert(!!typeCatalog === (mode !== Mode.Server)); // Have a type catalog iff not in server mode

        fs.writeSync(traceFd, `\n]\n`);
        fs.closeSync(traceFd);
        traceFd = undefined;

        if (typeCatalog) {
            dumpTypes(typeCatalog);
        }
        else {
            // We pre-computed this path for convenience, but clear it
            // now that the file won't be created.
            legend[legend.length - 1].typesPath = undefined;
        }
    }

    export function isTracing() {
        return !!traceFd;
    }

    export const enum Phase {
        Parse = "parse",
        Program = "program",
        Bind = "bind",
        Check = "check", // Before we get into checking types (e.g. checkSourceFile)
        CheckTypes = "checkTypes",
        Emit = "emit",
        Session = "session",
    }

    export function instant(phase: Phase, name: string, args?: object) {
        if (!traceFd) return;
        writeEvent("I", phase, name, args, `"s":"g"`);
    }

    const eventStack: { phase: Phase, name: string, args?: object, time: number, separateBeginAndEnd: boolean }[] = [];

    /**
     * @param separateBeginAndEnd - used for special cases where we need the trace point even if the event
     * never terminates (typically for reducing a scenario too big to trace to one that can be completed).
     * In the future we might implement an exit handler to dump unfinished events which would deprecate
     * these operations.
     */
    export function push(phase: Phase, name: string, args?: object, separateBeginAndEnd = false) {
        if (!traceFd) return;
        if (separateBeginAndEnd) {
            writeEvent("B", phase, name, args);
        }
        eventStack.push({ phase, name, args, time: 1000 * timestamp(), separateBeginAndEnd });
    }
    export function pop() {
        if (!traceFd) return;
        Debug.assert(eventStack.length > 0);
        writeStackEvent(eventStack.length - 1, 1000 * timestamp());
        eventStack.length--;
    }
    export function popAll() {
        if (!traceFd) return;
        const endTime = 1000 * timestamp();
        for (let i = eventStack.length - 1; i >= 0; i--) {
            writeStackEvent(i, endTime);
        }
        eventStack.length = 0;
    }
    function writeStackEvent(index: number, endTime: number) {
        const { phase, name, args, time, separateBeginAndEnd } = eventStack[index];
        if (separateBeginAndEnd) {
            writeEvent("E", phase, name, args, /*extras*/ undefined, endTime);
        }
        else {
            writeEvent("X", phase, name, args, `"dur":${endTime - time}`, time);
        }
    }

    function writeEvent(eventType: string, phase: Phase, name: string, args: object | undefined, extras?: string,
                       time: number = 1000 * timestamp()) {
        Debug.assert(traceFd);
        Debug.assert(fs);

        // In server mode, there's no easy way to dump type information, so we drop events that would require it.
        if (mode === Mode.Server && phase === Phase.CheckTypes) return;

        performance.mark("beginTracing");
        fs.writeSync(traceFd, `,\n{"pid":1,"tid":1,"ph":"${eventType}","cat":"${phase}","ts":${time},"name":"${name}"`);
        if (extras) fs.writeSync(traceFd, `,${extras}`);
        if (args) fs.writeSync(traceFd, `,"args":${JSON.stringify(args)}`);
        fs.writeSync(traceFd, `}`);
        performance.mark("endTracing");
        performance.measure("Tracing", "beginTracing", "endTracing");
    }

    function indexFromOne(lc: LineAndCharacter): LineAndCharacter {
        return {
            line: lc.line + 1,
            character: lc.character + 1,
        };
    }

    function dumpTypes(types: readonly Type[]) {
        Debug.assert(fs);

        performance.mark("beginDumpTypes");

        const typesPath = legend[legend.length - 1].typesPath!;
        const typesFd = fs.openSync(typesPath, "w");

        const recursionIdentityMap = new Map<object, number>();

        // Cleverness: no line break here so that the type ID will match the line number
        fs.writeSync(typesFd, "[");

        const numTypes = types.length;
        for (let i = 0; i < numTypes; i++) {
            const type = types[i];
            const objectFlags = (type as any).objectFlags;
            const symbol = type.aliasSymbol ?? type.symbol;
            const firstDeclaration = symbol?.declarations?.[0];
            const firstFile = firstDeclaration && getSourceFileOfNode(firstDeclaration);

            // It's slow to compute the display text, so skip it unless it's really valuable (or cheap)
            let display: string | undefined;
            if ((objectFlags & ObjectFlags.Anonymous) | (type.flags & TypeFlags.Literal)) {
                try {
                    display = type.checker?.typeToString(type);
                }
                catch {
                    display = undefined;
                }
            }

            let indexedAccessProperties: object = {};
            if (type.flags & TypeFlags.IndexedAccess) {
                const indexedAccessType = type as IndexedAccessType;
                indexedAccessProperties = {
                    indexedAccessObjectType: indexedAccessType.objectType?.id,
                    indexedAccessIndexType: indexedAccessType.indexType?.id,
                };
            }

            let referenceProperties: object = {};
            if (objectFlags & ObjectFlags.Reference) {
                const referenceType = type as TypeReference;
                referenceProperties = {
                    instantiatedType: referenceType.target?.id,
                    typeArguments: referenceType.resolvedTypeArguments?.map(t => t.id),
                };
            }

            let conditionalProperties: object = {};
            if (type.flags & TypeFlags.Conditional) {
                const conditionalType = type as ConditionalType;
                conditionalProperties = {
                    conditionalCheckType: conditionalType.checkType?.id,
                    conditionalExtendsType: conditionalType.extendsType?.id,
                    conditionalTrueType: conditionalType.resolvedTrueType?.id ?? -1,
                    conditionalFalseType: conditionalType.resolvedFalseType?.id ?? -1,
                };
            }

            // We can't print out an arbitrary object, so just assign each one a unique number.
            // Don't call it an "id" so people don't treat it as a type id.
            let recursionToken: number | undefined;
            const recursionIdentity = type.checker.getRecursionIdentity(type);
            if (recursionIdentity) {
                recursionToken = recursionIdentityMap.get(recursionIdentity);
                if (!recursionToken) {
                    recursionToken = recursionIdentityMap.size;
                    recursionIdentityMap.set(recursionIdentity, recursionToken);
                }
            }

            const descriptor = {
                id: type.id,
                intrinsicName: (type as any).intrinsicName,
                symbolName: symbol?.escapedName && unescapeLeadingUnderscores(symbol.escapedName),
                recursionId: recursionToken,
                unionTypes: (type.flags & TypeFlags.Union) ? (type as UnionType).types?.map(t => t.id) : undefined,
                intersectionTypes: (type.flags & TypeFlags.Intersection) ? (type as IntersectionType).types.map(t => t.id) : undefined,
                aliasTypeArguments: type.aliasTypeArguments?.map(t => t.id),
                keyofType: (type.flags & TypeFlags.Index) ? (type as IndexType).type?.id : undefined,
                ...indexedAccessProperties,
                ...referenceProperties,
                ...conditionalProperties,
                firstDeclaration: firstDeclaration && {
                    path: firstFile.path,
                    start: indexFromOne(getLineAndCharacterOfPosition(firstFile, firstDeclaration.pos)),
                    end: indexFromOne(getLineAndCharacterOfPosition(getSourceFileOfNode(firstDeclaration), firstDeclaration.end)),
                },
                flags: Debug.formatTypeFlags(type.flags).split("|"),
                display,
            };

            fs.writeSync(typesFd, JSON.stringify(descriptor));
            if (i < numTypes - 1) {
                fs.writeSync(typesFd, ",\n");
            }
        }

        fs.writeSync(typesFd, "]\n");

        fs.closeSync(typesFd);

        performance.mark("endDumpTypes");
        performance.measure("Dump types", "beginDumpTypes", "endDumpTypes");
    }

    export function dumpLegend() {
        if (!legendPath) {
            return;
        }
        Debug.assert(fs);

        fs.writeFileSync(legendPath, JSON.stringify(legend));
    }

    interface TraceRecord {
        configFilePath?: string;
        tracePath: string;
        typesPath?: string;
    }
}
