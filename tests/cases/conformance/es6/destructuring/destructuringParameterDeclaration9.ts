// @strict: true, false
// @noEmit: true
// @allowJs: true
// @checkJs: true

// https://github.com/microsoft/TypeScript/issues/59936

// @filename: index.js

/**
 * @param {Object} [config]
 * @param {Partial<Record<'json' | 'jsonc' | 'json5', string[]>>} [config.additionalFiles]
 */
export function prepareConfig({
    additionalFiles: {
        json = []
    } = {}
} = {}) {
    json // string[]
}

export function prepareConfigWithoutAnnotation({
    additionalFiles: {
        json = []
    } = {}
} = {}) {
    json
}

/** @type {(param: {
  additionalFiles?: Partial<Record<"json" | "jsonc" | "json5", string[]>>;
}) => void} */
export const prepareConfigWithContextualSignature = ({
    additionalFiles: {
        json = []
    } = {}
} = {})=>  {
    json // string[]
}

// Additional repros from https://github.com/microsoft/TypeScript/issues/59936

/**
 * @param {{ a?: { json?: string[] }}} [config]
 */
function f1({ a: { json = [] } = {} } = {}) { return json }

/**
 * @param {[[string[]?]?]} [x]
 */
function f2([[json = []] = []] = []) { return json }
