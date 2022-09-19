// @target: es6
// @checkJs: true
// @allowJs: true
// @noEmit: true
// @strict: false
// @filename: file.js

// reduced a bit from Webpack

const EMPTY_MAP = new Map();

class HarmonyExportInitFragment {
    /**
     * @param {Map<string, string>} exportMap mapping from used name to exposed variable name
     */
    constructor(
        exportMap = EMPTY_MAP,
    ) {
        this.exportMap = exportMap;
    }

    /**
     * @param {HarmonyExportInitFragment[]} fragments all fragments to merge
     */
    mergeAll(fragments) {
        let exportMap;
        let exportMapOwned = false;

        for (const fragment of fragments) {
            if (fragment.exportMap.size !== 0) {
                if (exportMap === undefined) {
                    exportMap = fragment.exportMap;
                    exportMapOwned = false;
                } else {
                    if (!exportMapOwned) {
                        exportMap = new Map(exportMap);
                        exportMapOwned = true;
                    }
                }
            }
        }
    }
}