import * as vscode from "vscode";

export interface ContentMapperManifest {
    readonly name: string;
    readonly version?: string;
    readonly exec: readonly string[];
    readonly cwd?: vscode.Uri;
    readonly compilerOptions?: readonly string[];
    readonly dynamicConfig?: boolean;
    readonly outputExtensions?: Readonly<Record<string, string>>;
}

export interface ContentMapperContribution {
    readonly extensions: readonly string[];
    readonly inferredProjectContribution?: {
        readonly options?: Readonly<Record<string, unknown>>;
        readonly manifest: ContentMapperManifest;
    };
}

export interface SerializedContentMapperContribution {
    readonly contributorId: string;
    readonly extensions: readonly string[];
    readonly inferredProjectContribution?: {
        readonly options?: Readonly<Record<string, unknown>>;
        readonly manifest: {
            readonly name: string;
            readonly version?: string;
            readonly exec: readonly string[];
            readonly cwd?: string;
            readonly compilerOptions?: readonly string[];
            readonly dynamicConfig?: boolean;
            readonly outputExtensions?: Readonly<Record<string, string>>;
        };
    };
}

export function serializeContentMapperContributions(
    registrations: ReadonlyMap<string, readonly ContentMapperContribution[]>,
): readonly SerializedContentMapperContribution[] {
    const result: SerializedContentMapperContribution[] = [];
    for (const [contributorId, contributions] of registrations) {
        contributions.forEach(contribution => {
            result.push({
                contributorId,
                extensions: [...contribution.extensions],
                inferredProjectContribution: contribution.inferredProjectContribution && {
                    options: contribution.inferredProjectContribution.options,
                    manifest: {
                        ...contribution.inferredProjectContribution.manifest,
                        exec: [...contribution.inferredProjectContribution.manifest.exec],
                        cwd: contribution.inferredProjectContribution.manifest.cwd?.fsPath,
                        compilerOptions: contribution.inferredProjectContribution.manifest.compilerOptions && [...contribution.inferredProjectContribution.manifest.compilerOptions],
                        ...(contribution.inferredProjectContribution.manifest.outputExtensions && {
                            outputExtensions: { ...contribution.inferredProjectContribution.manifest.outputExtensions },
                        }),
                    },
                },
            });
        });
    }
    return result;
}

export function validateContentMapperRegistration(contributorId: string, contributions: readonly ContentMapperContribution[]): void {
    if (!contributorId) {
        throw new TypeError("Content mapper contributor ID must not be empty.");
    }
    for (const contribution of contributions) {
        if (contribution.extensions.length === 0 || contribution.extensions.some(extension => !isExtension(extension))) {
            throw new TypeError("Content mapper contributions require non-empty extensions beginning with '.' and containing no path separators.");
        }
        if (contribution.extensions.some(extension => /\.(?:[cm]?[jt]s|[jt]sx|json)$/i.test(extension))) {
            throw new TypeError("Content mapper extensions must not end in a built-in extension.");
        }
        const inferredProjectContribution = contribution.inferredProjectContribution;
        if (inferredProjectContribution?.options === null || Array.isArray(inferredProjectContribution?.options) || inferredProjectContribution?.options !== undefined && typeof inferredProjectContribution.options !== "object") {
            throw new TypeError("Content mapper contribution options must be an object.");
        }
        if (inferredProjectContribution && (!inferredProjectContribution.manifest.name || inferredProjectContribution.manifest.exec.length === 0)) {
            throw new TypeError("Content mapper contribution manifests require a name and non-empty exec.");
        }
        if (inferredProjectContribution?.manifest.cwd && inferredProjectContribution.manifest.cwd.scheme !== "file") {
            throw new TypeError("Content mapper contribution cwd must be a file URI.");
        }
        if (inferredProjectContribution?.manifest.outputExtensions && Object.entries(inferredProjectContribution.manifest.outputExtensions).some(([source, output]) => !isExtension(source) || !isExtension(output))) {
            throw new TypeError("Content mapper output extensions must be non-empty, begin with '.', and contain no path separators.");
        }
    }
}

function isExtension(value: string): boolean {
    return value.length > 1 && value.startsWith(".") && !/[\\/]/.test(value);
}

export function documentMatchesContentMapperContributions(
    document: { readonly uri: { readonly path: string; }; },
    registrations: ReadonlyMap<string, readonly ContentMapperContribution[]>,
): boolean {
    const documentPath = document.uri.path.toLowerCase();
    for (const contributions of registrations.values()) {
        for (const contribution of contributions) {
            if (contribution.extensions.some(extension => documentPath.endsWith(extension.toLowerCase()))) {
                return true;
            }
        }
    }
    return false;
}
