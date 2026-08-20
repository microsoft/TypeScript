// @checkJs: true
// @allowJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @filename: index.js
/**
 * @typedef {Object} ButtonProps
 * @property {string} label The button label
 * @property {string | null | undefined} [data-test-name] Test automation attribute
 * @property {string | null | undefined} [aria-label] Accessibility label
 */

/**
 * @param {ButtonProps} props
 * @returns {ButtonProps}
 */
export function Button(props) {
    return { ...props }
}

/**
 * @callback ButtonPropsCallback
 * @param {ButtonProps} [props-like]
 * @returns {ButtonProps}
 */
