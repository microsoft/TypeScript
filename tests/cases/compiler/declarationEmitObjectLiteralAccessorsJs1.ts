// @strict: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @filename: index.js

// same type accessors
export const obj1 = {
  /**
   * my awesome getter (first in source order)
   * @returns {string}
   */
  get x() {
    return "";
  },
  /** 
   * my awesome setter (second in source order)
   * @param {string} a
   */
  set x(a) {},
};

// divergent accessors
export const obj2 = {
  /** 
   * my awesome getter
   * @returns {string}
   */
  get x() {
    return "";
  },
  /** 
   * my awesome setter
   * @param {number} a
   */
  set x(a) {},
};

export const obj3 = {
  /**
   * my awesome getter
   * @returns {string}
   */
  get x() {
    return "";
  },
};

export const obj4 = {
  /**
   * my awesome setter
   * @param {number} a
   */
  set x(a) {},
};
