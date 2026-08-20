// @declaration: true
// @emitDeclarationOnly: true
// @strict: true
// @allowJs: true
// @checkJs: true
// @filename: mainTs.ts
declare function wrap<T>(component: T): T;

function FunctionComponent() { return null; }
FunctionComponent.propTypes = { num: 0 };

const ArrowComponent = () => null;
ArrowComponent.propTypes = { num: 0 };

function UnusedComponent() { return null; }
UnusedComponent.propTypes = { num: 0 };

export const WrappedFunction = wrap(FunctionComponent);
export const WrappedArrow = wrap(ArrowComponent);

// @filename: mainJs.js
/**
 * @template T
 * @param {T} component
 * @returns {T}
 */
function wrap(component) { return component; }

function FunctionComponent() { return null; }
FunctionComponent.propTypes = { num: 0 };

export const WrappedFunction = wrap(FunctionComponent);
