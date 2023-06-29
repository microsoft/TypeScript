import { equateStringsCaseInsensitive, map, forEach, startsWith, findIndex, arrayFrom, orderedRemoveItemAt, getEntries, hasProperty } from "../../compiler/lang-utils";
import { optionDeclarations } from "./options";
import { CompilerSettings } from "./test-file-parser";

interface FileBasedTestConfiguration {
    [key: string]: string;
}

const varyBy: readonly string[] = [
    "module",
    "moduleResolution",
    "moduleDetection",
    "target",
    "jsx",
    "removeComments",
    "importHelpers",
    "importHelpers",
    "downlevelIteration",
    "isolatedModules",
    "strict",
    "noImplicitAny",
    "strictNullChecks",
    "strictFunctionTypes",
    "strictBindCallApply",
    "strictPropertyInitialization",
    "noImplicitThis",
    "alwaysStrict",
    "allowSyntheticDefaultImports",
    "esModuleInterop",
    "emitDecoratorMetadata",
    "skipDefaultLibCheck",
    "preserveConstEnums",
    "skipLibCheck",
    "exactOptionalPropertyTypes",
    "useDefineForClassFields",
    "useUnknownInCatchVariables",
    "noUncheckedIndexedAccess",
    "noPropertyAccessFromIndexSignature",
];

/**
 * Compute FileBasedTestConfiguration variations based on a supplied list of variable settings.
 */
export function getFileBasedTestConfigurations(settings: CompilerSettings): FileBasedTestConfiguration[] | undefined {
    let varyByEntries: [string, string[]][] | undefined;
    let variationCount = 1;
    for (const varyByKey of varyBy) {
        if (hasProperty(settings, varyByKey)) {
            // we only consider variations when there are 2 or more variable entries.
            const entries = splitVaryBySettingValue(settings[varyByKey], varyByKey);
            if (entries) {
                if (!varyByEntries) varyByEntries = [];
                variationCount *= entries.length;
                if (variationCount > 25) throw new Error(`Provided test options exceeded the maximum number of variations: ${varyBy.map(v => `'@${v}'`).join(", ")}`);
                varyByEntries.push([varyByKey, entries]);
            }
        }
    }

    if (!varyByEntries) return undefined;

    const configurations: FileBasedTestConfiguration[] = [];
    computeFileBasedTestConfigurationVariations(configurations, /*variationState*/ {}, varyByEntries, /*offset*/ 0);
    return configurations;
}

function computeFileBasedTestConfigurationVariations(configurations: FileBasedTestConfiguration[], variationState: FileBasedTestConfiguration, varyByEntries: [string, string[]][], offset: number) {
    if (offset >= varyByEntries.length) {
        // make a copy of the current variation state
        configurations.push({ ...variationState });
        return;
    }

    const [varyBy, entries] = varyByEntries[offset];
    for (const entry of entries) {
        // set or overwrite the variation, then compute the next variation
        variationState[varyBy] = entry;
        computeFileBasedTestConfigurationVariations(configurations, variationState, varyByEntries, offset + 1);
    }
}

function splitVaryBySettingValue(text: string, varyBy: string): string[] | undefined {
    if (!text) return undefined;

    let star = false;
    const includes: string[] = [];
    const excludes: string[] = [];
    for (let s of text.split(/,/g)) {
        s = s.trim().toLowerCase();
        if (s.length === 0) continue;
        if (s === "*") {
            star = true;
        }
        else if (startsWith(s, "-") || startsWith(s, "!")) {
            excludes.push(s.slice(1));
        }
        else {
            includes.push(s);
        }
    }

    // do nothing if the setting has no variations
    if (includes.length <= 1 && !star && excludes.length === 0) {
        return undefined;
    }

    const variations: { key: string, value?: string | number }[] = [];
    const values = getVaryByStarSettingValues(varyBy);

    // add (and deduplicate) all included entries
    for (const include of includes) {
        const value = values?.get(include);
        if (findIndex(variations, v => v.key === include || value !== undefined && v.value === value) === -1) {
            variations.push({ key: include, value });
        }
    }

    if (star && values) {
        // add all entries
        for (const [key, value] of arrayFrom(values.entries())) {
            if (findIndex(variations, v => v.key === key || v.value === value) === -1) {
                variations.push({ key, value });
            }
        }
    }

    // remove all excluded entries
    for (const exclude of excludes) {
        const value = values?.get(exclude);
        let index: number;
        while ((index = findIndex(variations, v => v.key === exclude || value !== undefined && v.value === value)) >= 0) {
            orderedRemoveItemAt(variations, index);
        }
    }

    if (variations.length === 0) {
        throw new Error(`Variations in test option '@${varyBy}' resulted in an empty set.`);
    }

    return map(variations, v => v.key);
}

let booleanVaryByStarSettingValues: Map<string, string | number> | undefined;

function getVaryByStarSettingValues(varyBy: string): ReadonlyMap<string, string | number> | undefined {
    const option = forEach(optionDeclarations, decl => equateStringsCaseInsensitive(decl.name, varyBy) ? decl : undefined);
    if (option) {
        if (typeof option.type === "object") {
            return option.type;
        }
        if (option.type === "boolean") {
            return booleanVaryByStarSettingValues || (booleanVaryByStarSettingValues = new Map(getEntries({
                true: 1,
                false: 0
            })));
        }
    }
}

/**
 * Compute a description for this configuration based on its entries
 */
export function getFileBasedTestConfigurationDescription(configuration: FileBasedTestConfiguration) {
    let name = "";
    if (configuration) {
        const keys = Object.keys(configuration).sort();
        for (const key of keys) {
            if (name) name += ",";
            name += `${key}=${configuration[key]}`;
        }
    }
    return name;
}
