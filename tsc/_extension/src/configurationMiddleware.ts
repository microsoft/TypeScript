import * as vscode from "vscode";

import type { ConfigurationMiddleware } from "vscode-languageclient/node";
import type { MessageSignature } from "vscode-languageserver-protocol";

/**
 * Configuration middleware for the TypeScript language server.
 *
 * The default vscode-languageclient handler uses `getConfiguration().get()`, which
 * returns "fully resolved" values including VS Code defaults. This is problematic
 * because the server has its own defaults, and receiving VS Code's prevents the
 * server from distinguishing user-set values from defaults.
 *
 * This module instead uses `inspect()` to retrieve both explicitly-set values (user/
 * workspace/workspace-folder settings) and VS Code default values from all three
 * configuration sections, then merges them with the correct precedence:
 *   sections: js/ts > typescript > javascript
 *   values:   explicit > default
 *
 * Both the `workspace/configuration` (pull) and `workspace/didChangeConfiguration`
 * (push) middlewares return/send the same merged object for every requested section.
 */

// Sections merged together. Earlier sections take precedence over later ones.
const configSections = ["js/ts", "typescript", "javascript"];

/**
 * Build a single merged configuration object from all config sections.
 *
 * For each key, the value is chosen with this precedence (highest first):
 *   1. js/ts explicit  2. typescript explicit  3. javascript explicit
 *   4. js/ts default   5. typescript default   6. javascript default
 *
 * This ensures user-set values always win, and declared-but-unset settings
 * still get their default with the right section precedence.
 */
function getMergedConfiguration(resource: vscode.Uri | undefined): Record<string, any> {
    const configs = configSections.map(section => getInspectedConfiguration(section, resource));

    // Layer from lowest to highest precedence.
    // Use Object.create(null) so the object has no prototype to pollute.
    let merged: Record<string, any> = Object.create(null);

    // Defaults: javascript < typescript < js/ts
    for (let i = configs.length - 1; i >= 0; i--) {
        if (configs[i].defaults !== null) {
            merged = deepMerge(merged, configs[i].defaults!);
        }
    }

    // Explicit values: javascript < typescript < js/ts
    for (let i = configs.length - 1; i >= 0; i--) {
        if (configs[i].explicit !== null) {
            merged = deepMerge(merged, configs[i].explicit!);
        }
    }

    return merged;
}

/**
 * Given a configuration section name (e.g., "typescript"), use vscode's
 * inspect API to collect both explicitly-set values and default values,
 * returning them as separate nested objects.
 */
function getInspectedConfiguration(
    section: string,
    resource: vscode.Uri | undefined,
): { explicit: Record<string, any> | null; defaults: Record<string, any> | null; } {
    const config = vscode.workspace.getConfiguration(section, resource);
    // Use Object.create(null) so these objects have no prototype to pollute.
    const explicit: Record<string, any> = Object.create(null);
    const defaults: Record<string, any> = Object.create(null);
    let hasExplicit = false;
    let hasDefaults = false;

    const allKeys = collectConfigurationKeys(config);

    for (const key of allKeys) {
        const inspection = config.inspect(key);
        if (!inspection) {
            continue;
        }

        // Pick the most specific explicitly-set value.
        // Language-specific overrides (e.g. [typescript]) take precedence
        // over non-language values at the same scope.
        const explicitValue = inspection.workspaceFolderLanguageValue
            ?? inspection.workspaceFolderValue
            ?? inspection.workspaceLanguageValue
            ?? inspection.workspaceValue
            ?? inspection.globalLanguageValue
            ?? inspection.globalValue;

        if (explicitValue !== undefined) {
            setNestedValue(explicit, key, toJSONObject(explicitValue));
            hasExplicit = true;
        }
        else if (inspection.defaultValue !== undefined) {
            setNestedValue(defaults, key, toJSONObject(inspection.defaultValue));
            hasDefaults = true;
        }
    }

    return {
        explicit: hasExplicit ? explicit : null,
        defaults: hasDefaults ? defaults : null,
    };
}

/**
 * Collect all leaf key paths from a workspace configuration section.
 */
function collectConfigurationKeys(config: vscode.WorkspaceConfiguration): string[] {
    const keys: string[] = [];
    const configMethods = new Set(["get", "has", "inspect", "update"]);

    function walk(obj: any, prefix: string) {
        if (obj === null || obj === undefined || typeof obj !== "object" || Array.isArray(obj)) {
            return;
        }
        for (const key of Object.keys(obj)) {
            if (configMethods.has(key)) {
                continue;
            }
            const fullKey = prefix ? `${prefix}.${key}` : key;
            const value = obj[key];
            if (value !== null && typeof value === "object" && !Array.isArray(value)) {
                walk(value, fullKey);
            }
            else {
                keys.push(fullKey);
            }
        }
    }

    walk(config, "");
    return keys;
}

const prototypeKeys = new Set(["__proto__", "constructor", "prototype"]);

function setNestedValue(obj: Record<string, any>, dottedKey: string, value: any): void {
    const parts = dottedKey.split(".");
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (prototypeKeys.has(part)) {
            return;
        }
        if (!(part in current) || typeof current[part] !== "object" || current[part] === null) {
            current[part] = Object.create(null);
        }
        current = current[part];
    }
    const lastPart = parts[parts.length - 1];
    if (!prototypeKeys.has(lastPart)) {
        current[lastPart] = value;
    }
}

/**
 * Deep merge b into a. Values in b take precedence over values in a.
 * Returns a new object; does not mutate inputs.
 */
function deepMerge(a: Record<string, any>, b: Record<string, any>): Record<string, any> {
    // Use Object.create(null) so the result has no prototype to pollute.
    const result: Record<string, any> = Object.create(null);
    Object.assign(result, a);
    for (const key of Object.keys(b)) {
        if (prototypeKeys.has(key)) {
            continue;
        }
        if (
            key in result
            && result[key] !== null && typeof result[key] === "object" && !Array.isArray(result[key])
            && b[key] !== null && typeof b[key] === "object" && !Array.isArray(b[key])
        ) {
            result[key] = deepMerge(result[key], b[key]);
        }
        else {
            result[key] = b[key];
        }
    }
    return result;
}

function toJSONObject(obj: any): any {
    if (obj === null || obj === undefined) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(toJSONObject);
    }
    if (typeof obj === "object") {
        const res: Record<string, any> = Object.create(null);
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                res[key] = toJSONObject(obj[key]);
            }
        }
        return res;
    }
    return obj;
}

const configSectionsSet: ReadonlySet<string> = new Set<string>(configSections);

/**
 * Intercepts workspace/configuration requests. For items requesting one of
 * the JS/TS config sections, returns the merged explicit configuration
 * (js/ts > typescript > javascript). For any other section, delegates to
 * the default handler via `next`.
 */
export const configurationMiddleware: ConfigurationMiddleware = {
    async configuration(params, token, next) {
        const hasNonJsTs = params.items.some(
            item => item.section === undefined || !configSectionsSet.has(item.section),
        );

        // If all items are JS/TS sections, no need to call next.
        let defaultResults: any[] | undefined;
        if (hasNonJsTs) {
            const res = await next(params, token);
            if (Array.isArray(res)) {
                defaultResults = res;
            }
        }

        // Cache merged config per resource URI to avoid redundant recalculation.
        const mergedCache = new Map<string, Record<string, any>>();
        function getMergedCached(resource: vscode.Uri | undefined): Record<string, any> {
            const key = resource?.toString() ?? "";
            let cached = mergedCache.get(key);
            if (cached === undefined) {
                cached = getMergedConfiguration(resource);
                mergedCache.set(key, cached);
            }
            return cached;
        }

        const result: any[] = params.items.map((item, i) => {
            if (item.section !== undefined && configSectionsSet.has(item.section)) {
                const resource = item.scopeUri ? vscode.Uri.parse(item.scopeUri) : undefined;
                return getMergedCached(resource);
            }
            return defaultResults?.[i] ?? null;
        });

        return result;
    },
};

/**
 * Intercepts outgoing workspace/didChangeConfiguration notifications.
 * Replaces the default settings (which include VS Code defaults) with
 * the merged configuration, keyed by section name.
 *
 * This is typed as returning `Promise<void>` rather than `void` because the
 * `didChangeConfiguration` notification is misannotated in vscode-languageclient
 * as returning void, so we must go through `sendNotification` instead.
 */
export function sendNotificationMiddleware(
    type: string | MessageSignature,
    next: (type: string | MessageSignature, params?: any) => Promise<void>,
    params: any,
): Promise<void> {
    const method = typeof type === "string" ? type : type.method;
    if (method === "workspace/didChangeConfiguration") {
        const merged = getMergedConfiguration(undefined);
        const settings: Record<string, any> = {};
        for (const section of configSections) {
            settings[section] = merged;
        }
        return next(type, { settings });
    }
    return next(type, params);
}
