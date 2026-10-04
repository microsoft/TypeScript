// @allowJs: true
// @checkJs: true
// @noEmit: true

// @filename: react.d.ts
declare namespace React {
    class Component { component: string }
    class PureComponent { pure: string }
}

// @filename: main.js
/**
 * @extends {React.Component}
 */
class C extends React.PureComponent {}

/**
 * @extends {React.Component}
 */
class D extends React.Component {}
