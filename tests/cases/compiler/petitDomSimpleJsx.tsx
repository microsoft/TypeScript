// @jsx: react
// @strict: true
// @lib: dom, es6
// @filename: node_modules/petit-dom/index.d.ts
// Modified type definitions for Petit-Dom 0.2
// Project: https://github.com/yelouafi/petit-dom
// Definitions by: James Messinger <https://github.com/JamesMessinger>, modified by @weswigham for testing
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.4

/**
 * Creates a VNode of the specified HTML Element type and with the
 * specified properties and contents.
 *
 * @param type - The tag name of element to create
 * @param props - Properties to set on the element
 * @param ...children - Child nodes
 * @returns A new VNode object
 */
export function h<T extends keyof ElementTagNameMap, E extends ElementTagNameMap[T]>(
    type: T,
    props?: PetitDom.Props<E> | null,
    ...children: ReadonlyArray<PetitDom.Content>
): PetitDom.ElementNode<T, E>;

/**
 * Creates a VNode using a PetitDom component object.
 *
 * @param type - A PetitDom component object
 * @param props - Properties to set on the component
 * @param ...children - Child nodes
 * @returns A new VNode object
 */
export function h<P extends PetitDom.ComponentProps = PetitDom.ComponentProps>(
    type: PetitDom.Component<P>,
    props?: (P & PetitDom.IntrinsicProps) | null,
    ...children: ReadonlyArray<PetitDom.Content>
): PetitDom.ComponentNode<P>;

/**
 * Creates a VNode using a PetitDom component class.
 *
 * @param type - A PetitDom component class
 * @param props - Properties to set on the component
 * @param ...children - Child nodes
 * @returns A new VNode object
 */
export function h<P extends PetitDom.ComponentProps = PetitDom.ComponentProps>(
    type: PetitDom.ComponentClass<P>,
    props?: (P & PetitDom.IntrinsicProps) | null,
    ...children: ReadonlyArray<PetitDom.Content>
): PetitDom.ComponentClassNode<P>;

/**
 * Creates a VNode using a PetitDom function component.
 *
 * This function is compatible with both JSX and HyperScript syntax.
 *
 * @param type - A PetitDom function component
 * @param props - Properties to set on the component
 * @param ...children - Child nodes
 * @returns A new VNode object
 */
export function h<P extends PetitDom.ComponentProps = PetitDom.ComponentProps>(
    type: PetitDom.FunctionComponent<P>,
    props?: (P & PetitDom.IntrinsicProps) | null,
    ...children: ReadonlyArray<PetitDom.Content>
): PetitDom.FunctionComponentNode<P>;

/**
 * Creates actual DOM Elements for the given VNode and its children.
 *
 * @param vnode - The VNode object to mount
 * @returns The newly-created DOM element
 */
export function mount(vnode: PetitDom.VNode): Element;

/**
 * Diffs two VNodes and applies the necessary DOM changes
 *
 * @param newVNode - The new VNode object, which will be mounted to the DOM element of oldVNode
 * @param oldVNode - The old VNode object to diff against
 * @param parent - The parent DOM element. Used internally by PetitDom to recursively patch child nodes
 * @returns The updated DOM element. This element is also moved from oldVNode to newVNode
 */
export function patch(newVNode: PetitDom.VNode, oldVNode: PetitDom.VNode, parent?: Element): Element;

/**
 * Removes the given VNode from the actual DOM
 *
 * @param vnode - The VNode object to unmount
 */
export function unmount(vnode: PetitDom.VNode): void;

export namespace PetitDom {
    type Key = string | number;
    type ComponentProps = object;
    interface ContentArray extends ReadonlyArray<Content> {}
    type Content = string | VNode | ContentArray;

    type DOMElementProps<E extends Element> = {
        [P in keyof E]?: E[P];
    };

    interface IntrinsicProps {
        content?: Content | ReadonlyArray<Content>;
        key?: Key;
    }

    type Props<E extends Element = Element> = IntrinsicProps & DOMElementProps<E>;

    type ShouldUpdate<P extends ComponentProps> = (
        newProps: P,
        oldProps: P,
        newContent: ReadonlyArray<VNode>,
        oldContent: ReadonlyArray<VNode>
    ) => boolean;

    interface FunctionComponent<P extends ComponentProps> {
        (props: P, content: ReadonlyArray<Content>): FunctionComponentNode<P>;
        shouldUpdate?: ShouldUpdate<P>;
    }

    interface ComponentClass<P extends ComponentProps> {
        new(props: P, content: ReadonlyArray<Content>): Component<P>;
    }

    interface Component<P extends ComponentProps> {
        mount(props: P, content: ReadonlyArray<VNode>): Element;
        patch(element: Element, newProps: P, oldProps: P, newContent: ReadonlyArray<VNode>, oldContent: ReadonlyArray<VNode>): Element;
        unmount(element: Element): void;
    }

    interface VNode {
        readonly isSVG: boolean;
        readonly type: any;
        readonly key: Key | null;
        readonly props: any;
        readonly content: ReadonlyArray<VNode>;
    }

    interface ElementNode<T extends keyof DomElements, E extends DomElements[T]> extends VNode {
        readonly type: T;
        readonly props: Props<E>;
    }

    interface ComponentNode<P extends ComponentProps> extends VNode {
        readonly type: Component<P>;
        readonly props: P & IntrinsicProps;
    }

    interface ComponentClassNode<P extends ComponentProps> extends VNode {
        readonly type: ComponentClass<P>;
        readonly props: P & IntrinsicProps;
    }

    interface FunctionComponentNode<P extends ComponentProps> extends VNode {
        readonly type: FunctionComponent<P>;
        readonly props: P & IntrinsicProps;
    }

    interface DomElements extends HTMLElementTagNameMap, SVGElementTagNameMap {
        "main": HTMLMainElement;
    }
}

declare global {
    namespace JSX {
        // tslint:disable-next-line:no-empty-interface
        interface Element extends PetitDom.VNode { }

        // tslint:disable-next-line:no-empty-interface
        interface ElementClass extends PetitDom.Component<PetitDom.ComponentProps> { }

        // tslint:disable-next-line:no-empty-interface
        interface IntrinsicClassAttributes<T> extends PetitDom.Props { }

        // tslint:disable-next-line:no-empty-interface
        interface IntrinsicAttributes extends PetitDom.IntrinsicProps { }

        interface ElementAttributesProperty { props: PetitDom.Props; }

        interface ElementChildrenAttribute { content: PetitDom.VNode[]; }

        type IntrinsicElements = {
            [P in keyof PetitDom.DomElements]:
            PetitDom.Props<PetitDom.DomElements[P]> &
            {
                content?: PetitDom.Content | ReadonlyArray<PetitDom.Content>;
            };
        };
    }
}

// @filename: petit-dom-tests.tsx
/* @jsx h */
// tslint:disable:no-empty
// tslint:disable:no-null-keyword

import { h, mount, patch, PetitDom, unmount } from "petit-dom";

function assertEqual<T>(a: T, b: T) { }

function eventHandler(event: Event): void { }

interface CustomProps {
    name: string;
    count: number;
    onSomeEvent(event: Event): void;
}

/**
 * Create an <a> element with text content, using HyperScript syntax and JSX syntax
 */
export function testHtmlElementWithTextContent() {
    // HyperScript syntax returns an ElementNode<T> object, with typed properties
    const aNode = h("a", { href: "link", onclick: eventHandler }, "click here");

    assertEqual(aNode.isSVG, false);
    assertEqual(aNode.type, "a");
    assertEqual(aNode.key, null);
    assertEqual(aNode.props.href, "link");
    assertEqual(aNode.props.onclick, eventHandler);
    assertEqual(aNode.content.length, 1);

    // JSX syntax returns a VNode object, so the "type" and "props" properties are "any"
    const jsxNode = <a href="link" onclick={eventHandler}>click here</a>;
    const jsxNodeType = jsxNode.type as string;
    const jsxNodeProps = jsxNode.props as PetitDom.Props<HTMLAnchorElement>;

    assertEqual(jsxNode.isSVG, false);
    assertEqual(jsxNodeType, "a");
    assertEqual(jsxNode.key, null);
    assertEqual(jsxNodeProps.href, "link");
    assertEqual(jsxNodeProps.onclick, eventHandler);
    assertEqual(jsxNode.content.length, 1);
}

/**
 * Create a <form> element with both text content and child elements, using HyperScript syntax and JSX syntax
 */
export function testHtmlElementWithMixedContent() {
    // HyperScript syntax returns an ElementNode<T> object, with typed properties
    const formNode = h(
        "form",
        { key: 1, method: "POST", onsubmit: eventHandler },
        "Hello ", h("span", null, "World")
    );

    assertEqual(formNode.isSVG, false);
    assertEqual(formNode.type, "form");
    assertEqual(formNode.key, 1);
    assertEqual(formNode.props.method, "POST");
    assertEqual(formNode.props.onsubmit, eventHandler);
    assertEqual(formNode.content.length, 2);

    // JSX syntax returns a VNode object, so the "type" and "props" properties are "any"
    const jsxNode = <form key={1} method="POST" onsubmit={eventHandler}>Hello <span>World</span></form>;
    const jsxNodeType = jsxNode.type as string;
    const jsxNodeProps = jsxNode.props as PetitDom.Props<HTMLFormElement>;

    assertEqual(jsxNode.isSVG, false);
    assertEqual(jsxNodeType, "form");
    assertEqual(jsxNode.key, 1);
    assertEqual(jsxNodeProps.method, "POST");
    assertEqual(jsxNodeProps.onsubmit, eventHandler);
    assertEqual(jsxNode.content.length, 2);
}

/**
 * Create an <svg> element with a child element, using HyperScript syntax and JSX syntax
 */
export function testSvgElementWithChild() {
    // HyperScript syntax returns an ElementNode<T> object, with typed properties
    const svgNode = h("svg", { key: 2, currentScale: 1 }, h("path"));

    assertEqual(svgNode.isSVG, true);
    assertEqual(svgNode.type, "svg");
    assertEqual(svgNode.key, 2);
    assertEqual(svgNode.props.currentScale, 1);
    assertEqual(svgNode.content.length, 1);

    // JSX syntax returns a VNode object, so the "type" and "props" properties are "any"
    const jsxNode = <svg key={2} currentScale={1}><path /></svg>;
    const jsxNodeType = jsxNode.type as string;
    const jsxNodeProps = jsxNode.props as PetitDom.Props<SVGSVGElement>;

    assertEqual(jsxNode.isSVG, true);
    assertEqual(jsxNodeType, "svg");
    assertEqual(jsxNode.key, 2);
    assertEqual(jsxNodeProps.currentScale, 1);
    assertEqual(jsxNode.content.length, 1);
}

/**
 * Create a function component, using HyperScript syntax and JSX syntax
 */
export function testFunctionComponent() {
    function FunctionComponent(): JSX.Element {
        return <div>Hello World</div>;
    }

    // HyperScript syntax returns a FunctionComponentNode<T> object, with typed properties
    const node = h(FunctionComponent, { key: "1" });

    assertEqual(node.isSVG, false);
    assertEqual(node.type, FunctionComponent);
    assertEqual(node.key, "1");
    assertEqual(node.props.key, "1");
    assertEqual(node.content.length, 0);

    // JSX syntax returns a VNode object, so the "type" and "props" properties are "any"
    const jsxNode = <FunctionComponent key="1" />;
    const jsxNodeType = jsxNode.type as PetitDom.FunctionComponent<{}>;
    const jsxNodeProps = jsxNode.props as PetitDom.IntrinsicProps;

    assertEqual(jsxNode.isSVG, false);
    assertEqual(jsxNodeType, FunctionComponent);
    assertEqual(jsxNode.key, "1");
    assertEqual(jsxNodeProps.key, "1");
    assertEqual(jsxNode.content.length, 0);
}

/**
 * Create a function component with props, using HyperScript syntax and JSX syntax
 */
export function testFunctionComponentWithProps() {
    function FunctionComponentWithProps(props: CustomProps): JSX.Element {
        const { name, count, onSomeEvent } = props;
        return <div className={name} tabIndex={count} onclick={onSomeEvent}></div>;
    }

    // HyperScript syntax returns a FunctionComponentNode<T> object, with typed properties
    const node = h(FunctionComponentWithProps, { name: "xyz", count: 123, onSomeEvent: eventHandler });

    assertEqual(node.isSVG, false);
    assertEqual(node.type, FunctionComponentWithProps);
    assertEqual(node.key, null);
    assertEqual(node.props.name, "xyz");
    assertEqual(node.props.count, 123);
    assertEqual(node.props.onSomeEvent, eventHandler);
    assertEqual(node.content.length, 0);

    // JSX syntax returns a VNode object, so the "type" and "props" properties are "any"
    const jsxNode = <FunctionComponentWithProps name="xyz" count={123} onSomeEvent={eventHandler} />;
    const jsxNodeType = jsxNode.type as PetitDom.FunctionComponent<CustomProps>;
    const jsxNodeProps = jsxNode.props as CustomProps;

    assertEqual(jsxNode.isSVG, false);
    assertEqual(jsxNodeType, FunctionComponentWithProps);
    assertEqual(jsxNode.key, null);
    assertEqual(jsxNodeProps.name, "xyz");
    assertEqual(jsxNodeProps.count, 123);
    assertEqual(jsxNodeProps.onSomeEvent, eventHandler);
    assertEqual(jsxNode.content.length, 0);
}

/**
 * Create a function component with child content, using HyperScript syntax and JSX syntax
 */
export function testFunctionComponentWithChildren() {
    function FunctionComponentWithChildren(props: CustomProps, content: ReadonlyArray<PetitDom.Content>): JSX.Element {
        const { name, count, onSomeEvent } = props;
        return <div className={name} tabIndex={count} onclick={onSomeEvent}>{content}</div>;
    }

    // HyperScript syntax returns a FunctionComponentNode<T> object, with typed properties
    const node = h(
        FunctionComponentWithChildren,
        { name: "xyz", count: 123, onSomeEvent: eventHandler },
        "Hello",
        h("span", null, "World")
    );

    assertEqual(node.isSVG, false);
    assertEqual(node.type, FunctionComponentWithChildren);
    assertEqual(node.key, null);
    assertEqual(node.props.name, "xyz");
    assertEqual(node.props.count, 123);
    assertEqual(node.props.onSomeEvent, eventHandler);
    assertEqual(node.content.length, 2);

    // JSX syntax returns a VNode object, so the "type" and "props" properties are "any"
    const jsxNode = (
        <FunctionComponentWithChildren name="xyz" count={123} onSomeEvent={eventHandler}>
            Hello <span>World</span>
        </FunctionComponentWithChildren>
    );
    const jsxNodeType = jsxNode.type as PetitDom.FunctionComponent<CustomProps>;
    const jsxNodeProps = jsxNode.props as CustomProps;

    assertEqual(jsxNode.isSVG, false);
    assertEqual(jsxNodeType, FunctionComponentWithChildren);
    assertEqual(jsxNode.key, null);
    assertEqual(jsxNodeProps.name, "xyz");
    assertEqual(jsxNodeProps.count, 123);
    assertEqual(jsxNodeProps.onSomeEvent, eventHandler);
    assertEqual(jsxNode.content.length, 2);
}

/**
 * Create a component class, using HyperScript syntax and JSX syntax
 */
export function testComponentClass() {
    class ComponentClass {
        props = {};

        mount(): Element {
            return mount(<div className="some-class"></div>);
        }

        patch(element: Element, newProps: object, oldProps: object, newContent: ReadonlyArray<PetitDom.VNode>, oldContent: ReadonlyArray<PetitDom.VNode>): Element {
            patch(
                <div {...oldProps}>{oldContent}</div>,
                <div {...newProps}>{newContent}</div>
            );
            return element;
        }

        unmount(element: Element): void {
            unmount(<div>Hello World</div>);
        }
    }

    // HyperScript syntax returns a ComponentClassNode<T> object, with typed properties
    const node = h(ComponentClass, { key: "1" });

    assertEqual(node.isSVG, false);
    assertEqual(node.type, ComponentClass);
    assertEqual(node.key, "1");
    assertEqual(node.props.key, "1");
    assertEqual(node.content.length, 0);

    // JSX syntax returns a VNode object, so the "type" and "props" properties are "any"
    const jsxNode = <ComponentClass key="1" />;
    const jsxNodeType = jsxNode.type as PetitDom.ComponentClass<{}>;
    const jsxNodeProps = jsxNode.props as PetitDom.IntrinsicProps;

    assertEqual(jsxNode.isSVG, false);
    assertEqual(jsxNodeType, ComponentClass);
    assertEqual(jsxNode.key, "1");
    assertEqual(jsxNodeProps.key, "1");
    assertEqual(jsxNode.content.length, 0);
}

/**
 * Create a component class with props, using HyperScript syntax and JSX syntax
 */
export function testComponentClassWithProps() {
    class ComponentClassWithProps {
        props: CustomProps;

        constructor(props: CustomProps) {
            this.props = props;
        }

        mount(props: CustomProps): Element {
            const { name, count, onSomeEvent } = props;
            return mount(<div className={name} tabIndex={count} onclick={onSomeEvent} />);
        }

        patch(element: Element, newProps: CustomProps, oldProps: CustomProps, newContent: ReadonlyArray<PetitDom.VNode>, oldContent: ReadonlyArray<PetitDom.VNode>): Element {
            patch(
                <div {...oldProps}>{oldContent}</div>,
                <div {...newProps}>{newContent}</div>
            );
            return element;
        }

        unmount(element: Element): void {
            unmount(<div> Hello World</div >);
        }
    }

    // HyperScript syntax returns a ComponentClassNode<T> object, with typed properties
    const node = h(ComponentClassWithProps, { name: "xyz", count: 123, onSomeEvent: eventHandler });

    assertEqual(node.isSVG, false);
    assertEqual(node.type, ComponentClassWithProps);
    assertEqual(node.key, null);
    assertEqual(node.props.name, "xyz");
    assertEqual(node.props.count, 123);
    assertEqual(node.props.onSomeEvent, eventHandler);
    assertEqual(node.content.length, 0);

    // JSX syntax returns a VNode object, so the "type" and "props" properties are "any"
    const jsxNode = <ComponentClassWithProps name="xyz" count={123} onSomeEvent={eventHandler} />;
    const jsxNodeType = jsxNode.type as PetitDom.ComponentClass<CustomProps>;
    const jsxNodeProps = jsxNode.props as CustomProps;

    assertEqual(jsxNode.isSVG, false);
    assertEqual(jsxNodeType, ComponentClassWithProps);
    assertEqual(jsxNode.key, null);
    assertEqual(jsxNodeProps.name, "xyz");
    assertEqual(jsxNodeProps.count, 123);
    assertEqual(jsxNodeProps.onSomeEvent, eventHandler);
    assertEqual(jsxNode.content.length, 0);
}

/**
 * Create a component class with child content, using HyperScript syntax and JSX syntax
 */
export function testComponentClassWithChildren() {
    class ComponentClassWithChildren {
        props: CustomProps;

        constructor(props: CustomProps) {
            this.props = props;
        }

        mount(props: CustomProps, content: ReadonlyArray<PetitDom.Content>): Element {
            const { name, count, onSomeEvent } = props;
            return mount(
                <div className={name} tabIndex={count} onclick={onSomeEvent}>{content}</div>
            );
        }

        patch(element: Element, newProps: CustomProps, oldProps: CustomProps, newContent: ReadonlyArray<PetitDom.VNode>, oldContent: ReadonlyArray<PetitDom.VNode>): Element {
            patch(
                <div {...oldProps}>{oldContent}</div>,
                <div {...newProps}>{newContent}</div>
            );
            return element;
        }

        unmount(element: Element): void {
            unmount(<div> Hello World</div >);
        }
    }

    // HyperScript syntax returns a ComponentClassNode<T> object, with typed properties
    const node = h(
        ComponentClassWithChildren,
        { name: "xyz", count: 123, onSomeEvent: eventHandler },
        "Hello",
        h("span", null, "World")
    );

    assertEqual(node.isSVG, false);
    assertEqual(node.type, ComponentClassWithChildren);
    assertEqual(node.key, null);
    assertEqual(node.props.name, "xyz");
    assertEqual(node.props.count, 123);
    assertEqual(node.props.onSomeEvent, eventHandler);
    assertEqual(node.content.length, 2);

    // JSX syntax returns a VNode object, so the "type" and "props" properties are "any"
    const jsxNode = (
        <ComponentClassWithChildren name="xyz" count={123} onSomeEvent={eventHandler}>
            Hello <span>World</span>
        </ComponentClassWithChildren>
    );
    const jsxNodeType = jsxNode.type as PetitDom.ComponentClass<CustomProps>;
    const jsxNodeProps = jsxNode.props as CustomProps;

    assertEqual(jsxNode.isSVG, false);
    assertEqual(jsxNodeType, ComponentClassWithChildren);
    assertEqual(jsxNode.key, null);
    assertEqual(jsxNodeProps.name, "xyz");
    assertEqual(jsxNodeProps.count, 123);
    assertEqual(jsxNodeProps.onSomeEvent, eventHandler);
    assertEqual(jsxNode.content.length, 2);
}
