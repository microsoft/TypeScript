// @allowJs: true
// @checkJs: true
// @noEmit: true
// @filename: input.js

/** @typedef {{ color: "red" | "blue" }} MyComponentProps */

/**
 * @template P 
 * @typedef {{ (): any; defaultProps?: Partial<P> }} StatelessComponent */

 /**
  * @type {StatelessComponent<MyComponentProps>}
  */
const MyComponent = () => /* @type {any} */(null);

MyComponent.defaultProps = {
    color: "red"
};

const MyComponent2 = () => null;

/**
 * @type {MyComponentProps}
 */
MyComponent2.defaultProps = {
    color: "red"
}

/**
  * @type {StatelessComponent<MyComponentProps>}
 */
const check = MyComponent2;

/**
 * 
 * @param {{ props: MyComponentProps }} p 
 */
function expectLiteral(p) {}

function foo() {
    /**
     * @type {MyComponentProps}
     */
    this.props = { color: "red" };

    expectLiteral(this);
}

/**
 * @type {MyComponentProps}
 */
module.exports = {
    color: "red"
}

expectLiteral({ props: module.exports });
