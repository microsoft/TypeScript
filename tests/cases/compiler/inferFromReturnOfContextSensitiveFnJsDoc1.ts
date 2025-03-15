// @strict: true
// @noEmit: true
// @checkJs: true
// @allowJs: true

// @filename: index.js

/**
 * @template S
 * @param {(arg0: { observer: EO }) => S} callback
 * @param {Options} [options]
 * @returns {VC<S>}
 */
/*
 * @type { <S>(fn: (arg0: { observer: EO; }) => S, options?: Options) => VC<S> }
 */
function define(callback, options) {
  const { name } = options ?? {};
  const observer = new EO();
  const state = callback({ observer });
  return new VC(state);
}

/**
 * @template S
 */
class VC {
  /** @type {S} */
  state;
  /**
   * @param {S} state
   */
  constructor(state) {
    this.state = state;
  }
}

/** @typedef {{ name?: string }} Options */

class EO {}

const v1 = define((arg0) => true, { name: "default" });