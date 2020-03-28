// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: functions.js

/**
 * @template T
 * @param {T} c
 * @return {(v: any) => any}
 */
function func(c) {
    return v => c
}

/** 
 * @function
 * @param {number} v first number
 * @returns {number} result
 */
const thisDoesNot = func(1)
