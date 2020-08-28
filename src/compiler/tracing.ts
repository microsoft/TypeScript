/*@internal*/
/** Tracing events for the compiler. */
namespace ts.tracing {
    let fs: typeof import("fs") | false | undefined;

    let traceCount = 0;
    let traceFd: number | undefined;

    let legendPath: string | undefined;
    const legend: TraceRecord[] = [];

    /** Starts tracing for the given project (unless the `fs` module is unavailable). */
    export function startTracing(configFilePath: string | undefined, traceDir: string, isBuildMode: boolean) {
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

        if (legendPath === undefined) {
            legendPath = combinePaths(traceDir, "legend.json");
        }

        // Note that writing will fail later on if it exists and is not a directory
        if (!fs.existsSync(traceDir)) {
            fs.mkdirSync(traceDir, { recursive: true });
        }

        const countPart = isBuildMode ? `.${++traceCount}` : ``;
        const tracePath = combinePaths(traceDir, `trace${countPart}.json`);
        const typesPath = combinePaths(traceDir, `types${countPart}.json`);

        legend.push({
            configFilePath,
            tracePath,
            typesPath,
        });

        traceFd = fs.openSync(tracePath, "w");
        fs.writeSync(traceFd, `[\n`);
    }

    /** Stops tracing for the in-progress project and dumps the type catalog (unless the `fs` module is unavailable). */
    export function stopTracing(typeCatalog: readonly Type[]) {
        if (!traceFd) {
            Debug.assert(!fs, "Tracing is not in progress");
            return;
        }

        Debug.assert(fs);

        // This both indicates that the trace is untruncated and conveniently
        // ensures that the last array element won't have a trailing comma.
        fs.writeSync(traceFd, `{"pid":1,"tid":1,"ph":"i","ts":${1000 * timestamp()},"name":"done","s":"g"}\n`);
        fs.writeSync(traceFd, `]\n`);

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
        Check = "check",
        Emit = "emit",
    }

    export function begin(phase: Phase, name: string, args: object) {
        if (!traceFd) {
            return;
        }
        Debug.assert(fs);

        performance.mark("beginTracing");
        fs.writeSync(traceFd, `{"pid":1,"tid":1,"ph":"B","cat":"${phase}","ts":${1000 * timestamp()},"name":"${name}","args":{ "ts": ${JSON.stringify(args)} }},\n`);
        performance.mark("endTracing");
        performance.measure("Tracing", "beginTracing", "endTracing");
    }

    export function end() {
        if (!traceFd) {
            return;
        }
        Debug.assert(fs);

        performance.mark("beginTracing");
        fs.writeSync(traceFd, `{"pid":1,"tid":1,"ph":"E","ts":${1000 * timestamp()}},\n`);
        performance.mark("endTracing");
        performance.measure("Tracing", "beginTracing", "endTracing");
    }

    export function instant(phase: Phase, name: string, args: object) {
        if (!traceFd) {
            return;
        }
        Debug.assert(fs);

        performance.mark("beginTracing");
        fs.writeSync(traceFd, `{"pid":1,"tid":1,"ph":"i","cat":"${phase}","ts":${1000 * timestamp()},"name":"${name}","s":"g","args":{ "ts": ${JSON.stringify(args)} }},\n`);
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
