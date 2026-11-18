// @strict: true
// @jsx: preserve
// @noEmit: true

declare namespace JSX {
    interface Element {}
    interface ElementAttributesProperty { props: {}; }
    interface ElementChildrenAttribute { children: {}; }
    interface IntrinsicAttributes { key?: string; }
}

class Component {
    props: Readonly<{}> = {};
}
<Component>content</Component>;
