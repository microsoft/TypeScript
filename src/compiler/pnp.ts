import {
    getDirectoryPath,
    resolvePath,
} from "./path";

export function getPnpApi(path: string) {
    if (typeof process.versions.pnp === "undefined") {
        return;
    }

    const { findPnpApi } = require("module");
    if (findPnpApi) {
        return findPnpApi(`${path}/`);
    }
}

export function getPnpApiPath(path: string): string | undefined {
    // eslint-disable-next-line no-null/no-null
    return getPnpApi(path)?.resolveRequest("pnpapi", /*issuer*/ null);
}

export function getPnpTypeRoots(currentDirectory: string) {
    const pnpApi = getPnpApi(currentDirectory);
    if (!pnpApi) {
        return [];
    }

    // Some TS consumers pass relative paths that aren't normalized
    currentDirectory = resolvePath(currentDirectory);

    const currentPackage = pnpApi.findPackageLocator(`${currentDirectory}/`);
    if (!currentPackage) {
        return [];
    }

    const { packageDependencies } = pnpApi.getPackageInformation(currentPackage);

    const typeRoots: string[] = [];
    for (const [name, referencish] of Array.from<any>(packageDependencies.entries())) {
        // eslint-disable-next-line no-null/no-null
        if (name.startsWith(`@types/`) && referencish !== null) {
            const dependencyLocator = pnpApi.getLocator(name, referencish);
            const { packageLocation } = pnpApi.getPackageInformation(dependencyLocator);

            typeRoots.push(getDirectoryPath(packageLocation));
        }
    }

    return typeRoots;
}

export function isImportablePathPnp(fromPath: string, toPath: string): boolean {
    const pnpApi = getPnpApi(fromPath);

    const fromLocator = pnpApi.findPackageLocator(fromPath);
    const toLocator = pnpApi.findPackageLocator(toPath);

    // eslint-disable-next-line no-null/no-null
    if (toLocator === null) {
        return false;
    }

    const fromInfo = pnpApi.getPackageInformation(fromLocator);
    const toReference = fromInfo.packageDependencies.get(toLocator.name);

    if (toReference) {
        return toReference === toLocator.reference;
    }

    // Aliased dependencies
    for (const reference of fromInfo.packageDependencies.values()) {
        if (Array.isArray(reference)) {
            if (reference[0] === toLocator.name && reference[1] === toLocator.reference) {
                return true;
            }
        }
    }

    return false;
}
