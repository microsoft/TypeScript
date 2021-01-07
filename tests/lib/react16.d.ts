// Type definitions for React 16.4
// Project: http://facebook.github.io/react/
// Definitions by: Asana <https://asana.com>
//                 AssureSign <http://www.assuresign.com>
//                 Microsoft <https://microsoft.com>
//                 John Reilly <https://github.com/johnnyreilly>
//                 Benoit Benezech <https://github.com/bbenezech>
//                 Patricio Zavolinsky <https://github.com/pzavolinsky>
//                 Digiguru <https://github.com/digiguru>
//                 Eric Anderson <https://github.com/ericanderson>
//                 Albert Kurniawan <https://github.com/morcerf>
//                 Tanguy Krotoff <https://github.com/tkrotoff>
//                 Dovydas Navickas <https://github.com/DovydasNavickas>
//                 Stéphane Goetz <https://github.com/onigoetz>
//                 Josh Rutherford <https://github.com/theruther4d>
//                 Guilherme Hübner <https://github.com/guilhermehubner>
//                 Ferdy Budhidharma <https://github.com/ferdaber>
//                 Johann Rakotoharisoa <https://github.com/jrakotoharisoa>
//                 Olivier Pascal <https://github.com/pascaloliv>
//                 Martin Hochel <https://github.com/hotell>
//                 Frank Li <https://github.com/franklixuefei>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

interface HTMLWebViewElement extends HTMLElement {}

declare module "prop-types" {
    // Type definitions for prop-types 15.5
    // Project: https://github.com/reactjs/prop-types
    // Definitions by: DovydasNavickas <https://github.com/DovydasNavickas>
    //                 Ferdy Budhidharma <https://github.com/ferdaber>
    // Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
    // TypeScript Version: 2.8

    import { ReactNode, ReactElement } from 'react';

    export const nominalTypeHack: unique symbol;

    export type IsOptional<T> = undefined | null extends T ? true : undefined extends T ? true : null extends T ? true : false;

    export type RequiredKeys<V> = { [K in keyof V]: V[K] extends Validator<infer T> ? IsOptional<T> extends true ? never : K : never }[keyof V];
    export type OptionalKeys<V> = Exclude<keyof V, RequiredKeys<V>>;
    export type InferPropsInner<V> = { [K in keyof V]: InferType<V[K]>; };

    export interface Validator<T> {
        (props: object, propName: string, componentName: string, location: string, propFullName: string): Error | null;
        [nominalTypeHack]?: T;
    }

    export interface Requireable<T> extends Validator<T | undefined | null> {
        isRequired: Validator<NonNullable<T>>;
    }

    export type ValidationMap<T> = { [K in keyof T]-?: Validator<T[K]> };

    export type InferType<V> = V extends Validator<infer T> ? T : any;
    export type InferProps<V> =
        & InferPropsInner<Pick<V, RequiredKeys<V>>>
        & Partial<InferPropsInner<Pick<V, OptionalKeys<V>>>>;

    export const any: Requireable<any>;
    export const array: Requireable<any[]>;
    export const bool: Requireable<boolean>;
    export const func: Requireable<(...args: any[]) => any>;
    export const number: Requireable<number>;
    export const object: Requireable<object>;
    export const string: Requireable<string>;
    export const node: Requireable<ReactNode>;
    export const element: Requireable<ReactElement<any>>;
    export const symbol: Requireable<symbol>;
    export function instanceOf<T>(expectedClass: new (...args: any[]) => T): Requireable<T>;
    export function oneOf<T>(types: T[]): Requireable<T>;
    export function oneOfType<T extends Validator<any>>(types: T[]): Requireable<NonNullable<InferType<T>>>;
    export function arrayOf<T>(type: Validator<T>): Requireable<T[]>;
    export function objectOf<T>(type: Validator<T>): Requireable<{ [K in keyof any]: T; }>;
    export function shape<P extends ValidationMap<any>>(type: P): Requireable<InferProps<P>>;
    export function exact<P extends ValidationMap<any>>(type: P): Requireable<Required<InferProps<P>>>;

    /**
     * Assert that the values match with the type specs.
     * Error messages are memorized and will only be shown once.
     *
     * @param typeSpecs Map of name to a ReactPropType
     * @param values Runtime values that need to be type-checked
     * @param location e.g. "prop", "context", "child context"
     * @param componentName Name of the component for error messages.
     * @param getStack Returns the component stack.
     */
    export function checkPropTypes(typeSpecs: any, values: any, location: string, componentName: string, getStack?: () => any): void;

}

declare module "react" {

    import * as PropTypes from 'prop-types';

    type NativeAnimationEvent = AnimationEvent;
    type NativeClipboardEvent = ClipboardEvent;
    type NativeCompositionEvent = CompositionEvent;
    type NativeDragEvent = DragEvent;
    type NativeFocusEvent = FocusEvent;
    type NativeKeyboardEvent = KeyboardEvent;
    type NativeMouseEvent = MouseEvent;
    type NativeTouchEvent = TouchEvent;
    type NativePointerEvent = PointerEvent;
    type NativeTransitionEvent = TransitionEvent;
    type NativeUIEvent = UIEvent;
    type NativeWheelEvent = WheelEvent;

    // tslint:disable-next-line:export-just-namespace
    export = React;

    namespace React {
        //
        // React Elements
        // ----------------------------------------------------------------------

        type ReactType<P = any> = string | ComponentType<P>;
        type ComponentType<P = {}> = ComponentClass<P> | StatelessComponent<P>;

        type Key = string | number;

        interface RefObject<T> {
            readonly current: T | null;
        }

        type Ref<T> = string | { bivarianceHack(instance: T | null): any }["bivarianceHack"] | RefObject<T>;

        type ComponentState = any;

        interface Attributes {
            key?: Key;
        }
        interface ClassAttributes<T> extends Attributes {
            ref?: Ref<T>;
        }

        interface ReactElement<P> {
            type: string | ComponentClass<P> | SFC<P>;
            props: P;
            key: Key | null;
        }

        interface SFCElement<P> extends ReactElement<P> {
            type: SFC<P>;
        }

        type CElement<P, T extends Component<P, ComponentState>> = ComponentElement<P, T>;
        interface ComponentElement<P, T extends Component<P, ComponentState>> extends ReactElement<P> {
            type: ComponentClass<P>;
            ref?: Ref<T>;
        }

        type ClassicElement<P> = CElement<P, ClassicComponent<P, ComponentState>>;

        // string fallback for custom web-components
        interface DOMElement<P extends HTMLAttributes<T> | SVGAttributes<T>, T extends Element> extends ReactElement<P> {
            type: string;
            ref: Ref<T>;
        }

        // ReactHTML for ReactHTMLElement
        // tslint:disable-next-line:no-empty-interface
        interface ReactHTMLElement<T extends HTMLElement> extends DetailedReactHTMLElement<AllHTMLAttributes<T>, T> { }

        interface DetailedReactHTMLElement<P extends HTMLAttributes<T>, T extends HTMLElement> extends DOMElement<P, T> {
            type: keyof ReactHTML;
        }

        // ReactSVG for ReactSVGElement
        interface ReactSVGElement extends DOMElement<SVGAttributes<SVGElement>, SVGElement> {
            type: keyof ReactSVG;
        }

        interface ReactPortal extends ReactElement<any> {
            key: Key | null;
            children: ReactNode;
        }

        //
        // Factories
        // ----------------------------------------------------------------------

        type Factory<P> = (props?: Attributes & P, ...children: ReactNode[]) => ReactElement<P>;

        type SFCFactory<P> = (props?: Attributes & P, ...children: ReactNode[]) => SFCElement<P>;

        type ComponentFactory<P, T extends Component<P, ComponentState>> =
            (props?: ClassAttributes<T> & P, ...children: ReactNode[]) => CElement<P, T>;

        type CFactory<P, T extends Component<P, ComponentState>> = ComponentFactory<P, T>;
        type ClassicFactory<P> = CFactory<P, ClassicComponent<P, ComponentState>>;

        type DOMFactory<P extends DOMAttributes<T>, T extends Element> =
            (props?: ClassAttributes<T> & P | null, ...children: ReactNode[]) => DOMElement<P, T>;

        // tslint:disable-next-line:no-empty-interface
        interface HTMLFactory<T extends HTMLElement> extends DetailedHTMLFactory<AllHTMLAttributes<T>, T> { }

        interface DetailedHTMLFactory<P extends HTMLAttributes<T>, T extends HTMLElement> extends DOMFactory<P, T> {
            (props?: ClassAttributes<T> & P | null, ...children: ReactNode[]): DetailedReactHTMLElement<P, T>;
        }

        interface SVGFactory extends DOMFactory<SVGAttributes<SVGElement>, SVGElement> {
            (props?: ClassAttributes<SVGElement> & SVGAttributes<SVGElement> | null, ...children: ReactNode[]): ReactSVGElement;
        }

        //
        // React Nodes
        // http://facebook.github.io/react/docs/glossary.html
        // ----------------------------------------------------------------------

        type ReactText = string | number;
        type ReactChild = ReactElement<any> | ReactText;

        interface ReactNodeArray extends Array<ReactNode> { }
        type ReactFragment = {} | ReactNodeArray;
        type ReactNode = ReactChild | ReactFragment | ReactPortal | string | number | boolean | null | undefined;

        //
        // Top Level API
        // ----------------------------------------------------------------------

        // DOM Elements
        function createFactory<T extends HTMLElement>(
            type: keyof ReactHTML): HTMLFactory<T>;
        function createFactory(
            type: keyof ReactSVG): SVGFactory;
        function createFactory<P extends DOMAttributes<T>, T extends Element>(
            type: string): DOMFactory<P, T>;

        // Custom components
        function createFactory<P>(type: SFC<P>): SFCFactory<P>;
        function createFactory<P>(
            type: ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>>): CFactory<P, ClassicComponent<P, ComponentState>>;
        function createFactory<P, T extends Component<P, ComponentState>, C extends ComponentClass<P>>(
            type: ClassType<P, T, C>): CFactory<P, T>;
        function createFactory<P>(type: ComponentClass<P>): Factory<P>;

        // DOM Elements
        // TODO: generalize this to everything in `keyof ReactHTML`, not just "input"
        function createElement(
            type: "input",
            props?: InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement> | null,
            ...children: ReactNode[]): DetailedReactHTMLElement<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
        function createElement<P extends HTMLAttributes<T>, T extends HTMLElement>(
            type: keyof ReactHTML,
            props?: ClassAttributes<T> & P | null,
            ...children: ReactNode[]): DetailedReactHTMLElement<P, T>;
        function createElement<P extends SVGAttributes<T>, T extends SVGElement>(
            type: keyof ReactSVG,
            props?: ClassAttributes<T> & P | null,
            ...children: ReactNode[]): ReactSVGElement;
        function createElement<P extends DOMAttributes<T>, T extends Element>(
            type: string,
            props?: ClassAttributes<T> & P | null,
            ...children: ReactNode[]): DOMElement<P, T>;

        // Custom components
        function createElement<P>(
            type: SFC<P>,
            props?: Attributes & P | null,
            ...children: ReactNode[]): SFCElement<P>;
        function createElement<P>(
            type: ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>>,
            props?: ClassAttributes<ClassicComponent<P, ComponentState>> & P | null,
            ...children: ReactNode[]): CElement<P, ClassicComponent<P, ComponentState>>;
        function createElement<P, T extends Component<P, ComponentState>, C extends ComponentClass<P>>(
            type: ClassType<P, T, C>,
            props?: ClassAttributes<T> & P | null,
            ...children: ReactNode[]): CElement<P, T>;
        function createElement<P>(
            type: SFC<P> | ComponentClass<P> | string,
            props?: Attributes & P | null,
            ...children: ReactNode[]): ReactElement<P>;

        // DOM Elements
        // ReactHTMLElement
        function cloneElement<P extends HTMLAttributes<T>, T extends HTMLElement>(
            element: DetailedReactHTMLElement<P, T>,
            props?: P,
            ...children: ReactNode[]): DetailedReactHTMLElement<P, T>;
        // ReactHTMLElement, less specific
        function cloneElement<P extends HTMLAttributes<T>, T extends HTMLElement>(
            element: ReactHTMLElement<T>,
            props?: P,
            ...children: ReactNode[]): ReactHTMLElement<T>;
        // SVGElement
        function cloneElement<P extends SVGAttributes<T>, T extends SVGElement>(
            element: ReactSVGElement,
            props?: P,
            ...children: ReactNode[]): ReactSVGElement;
        // DOM Element (has to be the last, because type checking stops at first overload that fits)
        function cloneElement<P extends DOMAttributes<T>, T extends Element>(
            element: DOMElement<P, T>,
            props?: DOMAttributes<T> & P,
            ...children: ReactNode[]): DOMElement<P, T>;

        // Custom components
        function cloneElement<P>(
            element: SFCElement<P>,
            props?: Partial<P> & Attributes,
            ...children: ReactNode[]): SFCElement<P>;
        function cloneElement<P, T extends Component<P, ComponentState>>(
            element: CElement<P, T>,
            props?: Partial<P> & ClassAttributes<T>,
            ...children: ReactNode[]): CElement<P, T>;
        function cloneElement<P>(
            element: ReactElement<P>,
            props?: Partial<P> & Attributes,
            ...children: ReactNode[]): ReactElement<P>;

        // Context via RenderProps
        interface ProviderProps<T> {
            value: T;
            children?: ReactNode;
        }

        interface ConsumerProps<T> {
            children: (value: T) => ReactNode;
            unstable_observedBits?: number;
        }

        type Provider<T> = ComponentType<ProviderProps<T>>;
        type Consumer<T> = ComponentType<ConsumerProps<T>>;
        interface Context<T> {
            Provider: Provider<T>;
            Consumer: Consumer<T>;
        }
        function createContext<T>(
            defaultValue: T,
            calculateChangedBits?: (prev: T, next: T) => number
        ): Context<T>;

        function isValidElement<P>(object: {} | null | undefined): object is ReactElement<P>;

        const Children: ReactChildren;
        const Fragment: ComponentType;
        const StrictMode: ComponentType;
        const version: string;

        //
        // Component API
        // ----------------------------------------------------------------------

        type ReactInstance = Component<any> | Element;

        // Base component for plain JS classes
        // tslint:disable-next-line:no-empty-interface
        interface Component<P = {}, S = {}, SS = any> extends ComponentLifecycle<P, S, SS> { }
        class Component<P, S> {
            constructor(props: Readonly<P>);
            /**
             * @deprecated
             * https://reactjs.org/docs/legacy-context.html
             */
            constructor(props: P, context?: any);

            // We MUST keep setState() as a unified signature because it allows proper checking of the method return type.
            // See: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18365#issuecomment-351013257
            // Also, the ` | S` allows intellisense to not be dumbisense
            setState<K extends keyof S>(
                state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
                callback?: () => void
            ): void;

            forceUpdate(callBack?: () => void): void;
            render(): ReactNode;

            // React.Props<T> is now deprecated, which means that the `children`
            // property is not available on `P` by default, even though you can
            // always pass children as variadic arguments to `createElement`.
            // In the future, if we can define its call signature conditionally
            // on the existence of `children` in `P`, then we should remove this.
            readonly props: Readonly<{ children?: ReactNode }> & Readonly<P>;
            state: Readonly<S>;
            /**
             * @deprecated
             * https://reactjs.org/docs/legacy-context.html
             */
            context: any;
            /**
             * @deprecated
             * https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs
             */
            refs: {
                [key: string]: ReactInstance
            };
        }

        class PureComponent<P = {}, S = {}, SS = any> extends Component<P, S, SS> { }

        interface ClassicComponent<P = {}, S = {}> extends Component<P, S> {
            replaceState(nextState: S, callback?: () => void): void;
            isMounted(): boolean;
            getInitialState?(): S;
        }

        interface ChildContextProvider<CC> {
            getChildContext(): CC;
        }

        //
        // Class Interfaces
        // ----------------------------------------------------------------------

        type SFC<P = {}> = StatelessComponent<P>;
        interface StatelessComponent<P = {}> {
            (props: P & { children?: ReactNode }, context?: any): ReactElement<any> | null;
            propTypes?: ValidationMap<P>;
            contextTypes?: ValidationMap<any>;
            defaultProps?: Partial<P>;
            displayName?: string;
        }

        interface RefForwardingComponent<T, P = {}> {
            (props: P & { children?: ReactNode }, ref?: Ref<T>): ReactElement<any> | null;
            propTypes?: ValidationMap<P>;
            contextTypes?: ValidationMap<any>;
            defaultProps?: Partial<P>;
            displayName?: string;
        }

        interface ComponentClass<P = {}, S = ComponentState> extends StaticLifecycle<P, S> {
            new(props: P, context?: any): Component<P, S>;
            propTypes?: ValidationMap<P>;
            contextTypes?: ValidationMap<any>;
            childContextTypes?: ValidationMap<any>;
            defaultProps?: Partial<P>;
            displayName?: string;
        }

        interface ClassicComponentClass<P = {}> extends ComponentClass<P> {
            new(props: P, context?: any): ClassicComponent<P, ComponentState>;
            getDefaultProps?(): P;
        }

        /**
         * We use an intersection type to infer multiple type parameters from
         * a single argument, which is useful for many top-level API defs.
         * See https://github.com/Microsoft/TypeScript/issues/7234 for more info.
         */
        type ClassType<P, T extends Component<P, ComponentState>, C extends ComponentClass<P>> =
            C &
            (new (props: P, context?: any) => T) &
            (new (props: P, context?: any) => { props: P });

        //
        // Component Specs and Lifecycle
        // ----------------------------------------------------------------------

        // This should actually be something like `Lifecycle<P, S> | DeprecatedLifecycle<P, S>`,
        // as React will _not_ call the deprecated lifecycle methods if any of the new lifecycle
        // methods are present.
        interface ComponentLifecycle<P, S, SS = any> extends NewLifecycle<P, S, SS>, DeprecatedLifecycle<P, S> {
            /**
             * Called immediately after a component is mounted. Setting state here will trigger re-rendering.
             */
            componentDidMount?(): void;
            /**
             * Called to determine whether the change in props and state should trigger a re-render.
             *
             * `Component` always returns true.
             * `PureComponent` implements a shallow comparison on props and state and returns true if any
             * props or states have changed.
             *
             * If false is returned, `Component#render`, `componentWillUpdate`
             * and `componentDidUpdate` will not be called.
             */
            shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean;
            /**
             * Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
             * cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.
             */
            componentWillUnmount?(): void;
            /**
             * Catches exceptions generated in descendant components. Unhandled exceptions will cause
             * the entire component tree to unmount.
             */
            componentDidCatch?(error: Error, errorInfo: ErrorInfo): void;
        }

        // Unfortunately, we have no way of declaring that the component constructor must implement this
        interface StaticLifecycle<P, S> {
            getDerivedStateFromProps?: GetDerivedStateFromProps<P, S>;
        }

        type GetDerivedStateFromProps<P, S> =
            /**
             * Returns an update to a component's state based on its new props and old state.
             *
             * Note: its presence prevents any of the deprecated lifecycle methods from being invoked
             */
            (nextProps: Readonly<P>, prevState: S) => Partial<S> | null;

        // This should be "infer SS" but can't use it yet
        interface NewLifecycle<P, S, SS> {
            /**
             * Runs before React applies the result of `render` to the document, and
             * returns an object to be given to componentDidUpdate. Useful for saving
             * things such as scroll position before `render` causes changes to it.
             *
             * Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
             * lifecycle events from running.
             */
            getSnapshotBeforeUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>): SS | null;
            /**
             * Called immediately after updating occurs. Not called for the initial render.
             *
             * The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.
             */
            componentDidUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: SS): void;
        }

        interface DeprecatedLifecycle<P, S> {
            /**
             * Called immediately before mounting occurs, and before `Component#render`.
             * Avoid introducing any side-effects or subscriptions in this method.
             *
             * Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
             * prevents this from being invoked.
             *
             * @deprecated 16.3, use componentDidMount or the constructor instead; will stop working in React 17
             * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state
             * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path
             */
            componentWillMount?(): void;
            /**
             * Called immediately before mounting occurs, and before `Component#render`.
             * Avoid introducing any side-effects or subscriptions in this method.
             *
             * This method will not stop working in React 17.
             *
             * Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
             * prevents this from being invoked.
             *
             * @deprecated 16.3, use componentDidMount or the constructor instead
             * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state
             * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path
             */
            UNSAFE_componentWillMount?(): void;
            /**
             * Called when the component may be receiving new props.
             * React may call this even if props have not changed, so be sure to compare new and existing
             * props if you only want to handle changes.
             *
             * Calling `Component#setState` generally does not trigger this method.
             *
             * Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
             * prevents this from being invoked.
             *
             * @deprecated 16.3, use static getDerivedStateFromProps instead; will stop working in React 17
             * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
             * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path
             */
            componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
            /**
             * Called when the component may be receiving new props.
             * React may call this even if props have not changed, so be sure to compare new and existing
             * props if you only want to handle changes.
             *
             * Calling `Component#setState` generally does not trigger this method.
             *
             * This method will not stop working in React 17.
             *
             * Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
             * prevents this from being invoked.
             *
             * @deprecated 16.3, use static getDerivedStateFromProps instead
             * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
             * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path
             */
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
            /**
             * Called immediately before rendering when new props or state is received. Not called for the initial render.
             *
             * Note: You cannot call `Component#setState` here.
             *
             * Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
             * prevents this from being invoked.
             *
             * @deprecated 16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17
             * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
             * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path
             */
            componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
            /**
             * Called immediately before rendering when new props or state is received. Not called for the initial render.
             *
             * Note: You cannot call `Component#setState` here.
             *
             * This method will not stop working in React 17.
             *
             * Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
             * prevents this from being invoked.
             *
             * @deprecated 16.3, use getSnapshotBeforeUpdate instead
             * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
             * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path
             */
            UNSAFE_componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
        }

        interface Mixin<P, S> extends ComponentLifecycle<P, S> {
            mixins?: Array<Mixin<P, S>>;
            statics?: {
                [key: string]: any;
            };

            displayName?: string;
            propTypes?: ValidationMap<any>;
            contextTypes?: ValidationMap<any>;
            childContextTypes?: ValidationMap<any>;

            getDefaultProps?(): P;
            getInitialState?(): S;
        }

        interface ComponentSpec<P, S> extends Mixin<P, S> {
            render(): ReactNode;

            [propertyName: string]: any;
        }

        function createRef<T>(): RefObject<T>;

        function forwardRef<T, P = {}>(Component: RefForwardingComponent<T, P>): ComponentType<P & ClassAttributes<T>>;

        //
        // Event System
        // ----------------------------------------------------------------------

        interface SyntheticEvent<T = Element> {
            bubbles: boolean;
            /**
             * A reference to the element on which the event listener is registered.
             */
            currentTarget: EventTarget & T;
            cancelable: boolean;
            defaultPrevented: boolean;
            eventPhase: number;
            isTrusted: boolean;
            nativeEvent: Event;
            preventDefault(): void;
            isDefaultPrevented(): boolean;
            stopPropagation(): void;
            isPropagationStopped(): boolean;
            persist(): void;
            // If you thought this should be `EventTarget & T`, see https://github.com/DefinitelyTyped/DefinitelyTyped/pull/12239
            /**
             * A reference to the element from which the event was originally dispatched.
             * This might be a child element to the element on which the event listener is registered.
             *
             * @see currentTarget
             */
            target: EventTarget;
            timeStamp: number;
            type: string;
        }

        interface ClipboardEvent<T = Element> extends SyntheticEvent<T> {
            clipboardData: DataTransfer;
            nativeEvent: NativeClipboardEvent;
        }

        interface CompositionEvent<T = Element> extends SyntheticEvent<T> {
            data: string;
            nativeEvent: NativeCompositionEvent;
        }

        interface DragEvent<T = Element> extends MouseEvent<T> {
            dataTransfer: DataTransfer;
            nativeEvent: NativeDragEvent;
        }

        interface PointerEvent<T = Element> extends MouseEvent<T> {
            pointerId: number;
            pressure: number;
            tiltX: number;
            tiltY: number;
            width: number;
            height: number;
            pointerType: 'mouse' | 'pen' | 'touch';
            isPrimary: boolean;
            nativeEvent: NativePointerEvent;
        }

        interface FocusEvent<T = Element> extends SyntheticEvent<T> {
            nativeEvent: NativeFocusEvent;
            relatedTarget: EventTarget;
            target: EventTarget & T;
        }

        // tslint:disable-next-line:no-empty-interface
        interface FormEvent<T = Element> extends SyntheticEvent<T> {
        }

        interface InvalidEvent<T = Element> extends SyntheticEvent<T> {
            target: EventTarget & T;
        }

        interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
            target: EventTarget & T;
        }

        interface KeyboardEvent<T = Element> extends SyntheticEvent<T> {
            altKey: boolean;
            charCode: number;
            ctrlKey: boolean;
            /**
             * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
             */
            getModifierState(key: string): boolean;
            /**
             * See the [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#named-key-attribute-values). for possible values
             */
            key: string;
            keyCode: number;
            locale: string;
            location: number;
            metaKey: boolean;
            nativeEvent: NativeKeyboardEvent;
            repeat: boolean;
            shiftKey: boolean;
            which: number;
        }

        interface MouseEvent<T = Element> extends SyntheticEvent<T> {
            altKey: boolean;
            button: number;
            buttons: number;
            clientX: number;
            clientY: number;
            ctrlKey: boolean;
            /**
             * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
             */
            getModifierState(key: string): boolean;
            metaKey: boolean;
            nativeEvent: NativeMouseEvent;
            pageX: number;
            pageY: number;
            relatedTarget: EventTarget;
            screenX: number;
            screenY: number;
            shiftKey: boolean;
        }

        interface TouchEvent<T = Element> extends SyntheticEvent<T> {
            altKey: boolean;
            changedTouches: TouchList;
            ctrlKey: boolean;
            /**
             * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
             */
            getModifierState(key: string): boolean;
            metaKey: boolean;
            nativeEvent: NativeTouchEvent;
            shiftKey: boolean;
            targetTouches: TouchList;
            touches: TouchList;
        }

        interface UIEvent<T = Element> extends SyntheticEvent<T> {
            detail: number;
            nativeEvent: NativeUIEvent;
            view: AbstractView;
        }

        interface WheelEvent<T = Element> extends MouseEvent<T> {
            deltaMode: number;
            deltaX: number;
            deltaY: number;
            deltaZ: number;
            nativeEvent: NativeWheelEvent;
        }

        interface AnimationEvent<T = Element> extends SyntheticEvent<T> {
            animationName: string;
            elapsedTime: number;
            nativeEvent: NativeAnimationEvent;
            pseudoElement: string;
        }

        interface TransitionEvent<T = Element> extends SyntheticEvent<T> {
            elapsedTime: number;
            nativeEvent: NativeTransitionEvent;
            propertyName: string;
            pseudoElement: string;
        }

        //
        // Event Handler Types
        // ----------------------------------------------------------------------

        type EventHandler<E extends SyntheticEvent<any>> = { bivarianceHack(event: E): void }["bivarianceHack"];

        type ReactEventHandler<T = Element> = EventHandler<SyntheticEvent<T>>;

        type ClipboardEventHandler<T = Element> = EventHandler<ClipboardEvent<T>>;
        type CompositionEventHandler<T = Element> = EventHandler<CompositionEvent<T>>;
        type DragEventHandler<T = Element> = EventHandler<DragEvent<T>>;
        type FocusEventHandler<T = Element> = EventHandler<FocusEvent<T>>;
        type FormEventHandler<T = Element> = EventHandler<FormEvent<T>>;
        type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent<T>>;
        type KeyboardEventHandler<T = Element> = EventHandler<KeyboardEvent<T>>;
        type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>;
        type TouchEventHandler<T = Element> = EventHandler<TouchEvent<T>>;
        type PointerEventHandler<T = Element> = EventHandler<PointerEvent<T>>;
        type UIEventHandler<T = Element> = EventHandler<UIEvent<T>>;
        type WheelEventHandler<T = Element> = EventHandler<WheelEvent<T>>;
        type AnimationEventHandler<T = Element> = EventHandler<AnimationEvent<T>>;
        type TransitionEventHandler<T = Element> = EventHandler<TransitionEvent<T>>;

        //
        // Props / DOM Attributes
        // ----------------------------------------------------------------------

        /**
         * @deprecated. This was used to allow clients to pass `ref` and `key`
         * to `createElement`, which is no longer necessary due to intersection
         * types. If you need to declare a props object before passing it to
         * `createElement` or a factory, use `ClassAttributes<T>`:
         *
         * ```ts
         * var b: Button | null;
         * var props: ButtonProps & ClassAttributes<Button> = {
         *     ref: b => button = b, // ok!
         *     label: "I'm a Button"
         * };
         * ```
         */
        interface Props<T> {
            children?: ReactNode;
            key?: Key;
            ref?: Ref<T>;
        }

        interface HTMLProps<T> extends AllHTMLAttributes<T>, ClassAttributes<T> {
        }

        type DetailedHTMLProps<E extends HTMLAttributes<T>, T> = ClassAttributes<T> & E;

        interface SVGProps<T> extends SVGAttributes<T>, ClassAttributes<T> {
        }

        interface DOMAttributes<T> {
            children?: ReactNode;
            dangerouslySetInnerHTML?: {
                __html: string;
            };

            // Clipboard Events
            onCopy?: ClipboardEventHandler<T>;
            onCopyCapture?: ClipboardEventHandler<T>;
            onCut?: ClipboardEventHandler<T>;
            onCutCapture?: ClipboardEventHandler<T>;
            onPaste?: ClipboardEventHandler<T>;
            onPasteCapture?: ClipboardEventHandler<T>;

            // Composition Events
            onCompositionEnd?: CompositionEventHandler<T>;
            onCompositionEndCapture?: CompositionEventHandler<T>;
            onCompositionStart?: CompositionEventHandler<T>;
            onCompositionStartCapture?: CompositionEventHandler<T>;
            onCompositionUpdate?: CompositionEventHandler<T>;
            onCompositionUpdateCapture?: CompositionEventHandler<T>;

            // Focus Events
            onFocus?: FocusEventHandler<T>;
            onFocusCapture?: FocusEventHandler<T>;
            onBlur?: FocusEventHandler<T>;
            onBlurCapture?: FocusEventHandler<T>;

            // Form Events
            onChange?: FormEventHandler<T>;
            onChangeCapture?: FormEventHandler<T>;
            onInput?: FormEventHandler<T>;
            onInputCapture?: FormEventHandler<T>;
            onReset?: FormEventHandler<T>;
            onResetCapture?: FormEventHandler<T>;
            onSubmit?: FormEventHandler<T>;
            onSubmitCapture?: FormEventHandler<T>;
            onInvalid?: FormEventHandler<T>;
            onInvalidCapture?: FormEventHandler<T>;

            // Image Events
            onLoad?: ReactEventHandler<T>;
            onLoadCapture?: ReactEventHandler<T>;
            onError?: ReactEventHandler<T>; // also a Media Event
            onErrorCapture?: ReactEventHandler<T>; // also a Media Event

            // Keyboard Events
            onKeyDown?: KeyboardEventHandler<T>;
            onKeyDownCapture?: KeyboardEventHandler<T>;
            onKeyPress?: KeyboardEventHandler<T>;
            onKeyPressCapture?: KeyboardEventHandler<T>;
            onKeyUp?: KeyboardEventHandler<T>;
            onKeyUpCapture?: KeyboardEventHandler<T>;

            // Media Events
            onAbort?: ReactEventHandler<T>;
            onAbortCapture?: ReactEventHandler<T>;
            onCanPlay?: ReactEventHandler<T>;
            onCanPlayCapture?: ReactEventHandler<T>;
            onCanPlayThrough?: ReactEventHandler<T>;
            onCanPlayThroughCapture?: ReactEventHandler<T>;
            onDurationChange?: ReactEventHandler<T>;
            onDurationChangeCapture?: ReactEventHandler<T>;
            onEmptied?: ReactEventHandler<T>;
            onEmptiedCapture?: ReactEventHandler<T>;
            onEncrypted?: ReactEventHandler<T>;
            onEncryptedCapture?: ReactEventHandler<T>;
            onEnded?: ReactEventHandler<T>;
            onEndedCapture?: ReactEventHandler<T>;
            onLoadedData?: ReactEventHandler<T>;
            onLoadedDataCapture?: ReactEventHandler<T>;
            onLoadedMetadata?: ReactEventHandler<T>;
            onLoadedMetadataCapture?: ReactEventHandler<T>;
            onLoadStart?: ReactEventHandler<T>;
            onLoadStartCapture?: ReactEventHandler<T>;
            onPause?: ReactEventHandler<T>;
            onPauseCapture?: ReactEventHandler<T>;
            onPlay?: ReactEventHandler<T>;
            onPlayCapture?: ReactEventHandler<T>;
            onPlaying?: ReactEventHandler<T>;
            onPlayingCapture?: ReactEventHandler<T>;
            onProgress?: ReactEventHandler<T>;
            onProgressCapture?: ReactEventHandler<T>;
            onRateChange?: ReactEventHandler<T>;
            onRateChangeCapture?: ReactEventHandler<T>;
            onSeeked?: ReactEventHandler<T>;
            onSeekedCapture?: ReactEventHandler<T>;
            onSeeking?: ReactEventHandler<T>;
            onSeekingCapture?: ReactEventHandler<T>;
            onStalled?: ReactEventHandler<T>;
            onStalledCapture?: ReactEventHandler<T>;
            onSuspend?: ReactEventHandler<T>;
            onSuspendCapture?: ReactEventHandler<T>;
            onTimeUpdate?: ReactEventHandler<T>;
            onTimeUpdateCapture?: ReactEventHandler<T>;
            onVolumeChange?: ReactEventHandler<T>;
            onVolumeChangeCapture?: ReactEventHandler<T>;
            onWaiting?: ReactEventHandler<T>;
            onWaitingCapture?: ReactEventHandler<T>;

            // MouseEvents
            onClick?: MouseEventHandler<T>;
            onClickCapture?: MouseEventHandler<T>;
            onContextMenu?: MouseEventHandler<T>;
            onContextMenuCapture?: MouseEventHandler<T>;
            onDoubleClick?: MouseEventHandler<T>;
            onDoubleClickCapture?: MouseEventHandler<T>;
            onDrag?: DragEventHandler<T>;
            onDragCapture?: DragEventHandler<T>;
            onDragEnd?: DragEventHandler<T>;
            onDragEndCapture?: DragEventHandler<T>;
            onDragEnter?: DragEventHandler<T>;
            onDragEnterCapture?: DragEventHandler<T>;
            onDragExit?: DragEventHandler<T>;
            onDragExitCapture?: DragEventHandler<T>;
            onDragLeave?: DragEventHandler<T>;
            onDragLeaveCapture?: DragEventHandler<T>;
            onDragOver?: DragEventHandler<T>;
            onDragOverCapture?: DragEventHandler<T>;
            onDragStart?: DragEventHandler<T>;
            onDragStartCapture?: DragEventHandler<T>;
            onDrop?: DragEventHandler<T>;
            onDropCapture?: DragEventHandler<T>;
            onMouseDown?: MouseEventHandler<T>;
            onMouseDownCapture?: MouseEventHandler<T>;
            onMouseEnter?: MouseEventHandler<T>;
            onMouseLeave?: MouseEventHandler<T>;
            onMouseMove?: MouseEventHandler<T>;
            onMouseMoveCapture?: MouseEventHandler<T>;
            onMouseOut?: MouseEventHandler<T>;
            onMouseOutCapture?: MouseEventHandler<T>;
            onMouseOver?: MouseEventHandler<T>;
            onMouseOverCapture?: MouseEventHandler<T>;
            onMouseUp?: MouseEventHandler<T>;
            onMouseUpCapture?: MouseEventHandler<T>;

            // Selection Events
            onSelect?: ReactEventHandler<T>;
            onSelectCapture?: ReactEventHandler<T>;

            // Touch Events
            onTouchCancel?: TouchEventHandler<T>;
            onTouchCancelCapture?: TouchEventHandler<T>;
            onTouchEnd?: TouchEventHandler<T>;
            onTouchEndCapture?: TouchEventHandler<T>;
            onTouchMove?: TouchEventHandler<T>;
            onTouchMoveCapture?: TouchEventHandler<T>;
            onTouchStart?: TouchEventHandler<T>;
            onTouchStartCapture?: TouchEventHandler<T>;

            // Pointer Events
            onPointerDown?: PointerEventHandler<T>;
            onPointerDownCapture?: PointerEventHandler<T>;
            onPointerMove?: PointerEventHandler<T>;
            onPointerMoveCapture?: PointerEventHandler<T>;
            onPointerUp?: PointerEventHandler<T>;
            onPointerUpCapture?: PointerEventHandler<T>;
            onPointerCancel?: PointerEventHandler<T>;
            onPointerCancelCapture?: PointerEventHandler<T>;
            onPointerEnter?: PointerEventHandler<T>;
            onPointerEnterCapture?: PointerEventHandler<T>;
            onPointerLeave?: PointerEventHandler<T>;
            onPointerLeaveCapture?: PointerEventHandler<T>;
            onPointerOver?: PointerEventHandler<T>;
            onPointerOverCapture?: PointerEventHandler<T>;
            onPointerOut?: PointerEventHandler<T>;
            onPointerOutCapture?: PointerEventHandler<T>;
            onGotPointerCapture?: PointerEventHandler<T>;
            onGotPointerCaptureCapture?: PointerEventHandler<T>;
            onLostPointerCapture?: PointerEventHandler<T>;
            onLostPointerCaptureCapture?: PointerEventHandler<T>;

            // UI Events
            onScroll?: UIEventHandler<T>;
            onScrollCapture?: UIEventHandler<T>;

            // Wheel Events
            onWheel?: WheelEventHandler<T>;
            onWheelCapture?: WheelEventHandler<T>;

            // Animation Events
            onAnimationStart?: AnimationEventHandler<T>;
            onAnimationStartCapture?: AnimationEventHandler<T>;
            onAnimationEnd?: AnimationEventHandler<T>;
            onAnimationEndCapture?: AnimationEventHandler<T>;
            onAnimationIteration?: AnimationEventHandler<T>;
            onAnimationIterationCapture?: AnimationEventHandler<T>;

            // Transition Events
            onTransitionEnd?: TransitionEventHandler<T>;
            onTransitionEndCapture?: TransitionEventHandler<T>;
        }

        export interface CSSProperties {
            /**
             * The index signature was removed to enable closed typing for style
             * using CSSType. You're able to use type assertion or module augmentation
             * to add properties or an index signature of your own.
             *
             * For examples and more information, visit:
             * https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
             */
        }

        interface HTMLAttributes<T> extends DOMAttributes<T> {
            // React-specific Attributes
            defaultChecked?: boolean;
            defaultValue?: string | string[];
            suppressContentEditableWarning?: boolean;
            suppressHydrationWarning?: boolean;

            // Standard HTML Attributes
            accessKey?: string;
            className?: string;
            contentEditable?: boolean;
            contextMenu?: string;
            dir?: string;
            draggable?: boolean;
            hidden?: boolean;
            id?: string;
            lang?: string;
            placeholder?: string;
            slot?: string;
            spellCheck?: boolean;
            style?: CSSProperties;
            tabIndex?: number;
            title?: string;

            // Unknown
            inputMode?: string;
            is?: string;
            radioGroup?: string; // <command>, <menuitem>

            // WAI-ARIA
            role?: string;

            // RDFa Attributes
            about?: string;
            datatype?: string;
            inlist?: any;
            prefix?: string;
            property?: string;
            resource?: string;
            typeof?: string;
            vocab?: string;

            // Non-standard Attributes
            autoCapitalize?: string;
            autoCorrect?: string;
            autoSave?: string;
            color?: string;
            itemProp?: string;
            itemScope?: boolean;
            itemType?: string;
            itemID?: string;
            itemRef?: string;
            results?: number;
            security?: string;
            unselectable?: 'on' | 'off';
        }

        // All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
        interface HTMLAttributes<T> extends DOMAttributes<T> {
            /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
            'aria-activedescendant'?: string;
            /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
            'aria-atomic'?: boolean | 'false' | 'true';
            /**
             * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
             * presented if they are made.
             */
            'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
            /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
            'aria-busy'?: boolean | 'false' | 'true';
            /**
             * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
             * @see aria-pressed @see aria-selected.
             */
            'aria-checked'?: boolean | 'false' | 'mixed' | 'true';
            /**
             * Defines the total number of columns in a table, grid, or treegrid.
             * @see aria-colindex.
             */
            'aria-colcount'?: number;
            /**
             * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
             * @see aria-colcount @see aria-colspan.
             */
            'aria-colindex'?: number;
            /**
             * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
             * @see aria-colindex @see aria-rowspan.
             */
            'aria-colspan'?: number;
            /**
             * Identifies the element (or elements) whose contents or presence are controlled by the current element.
             * @see aria-owns.
             */
            'aria-controls'?: string;
            /** Indicates the element that represents the current item within a container or set of related elements. */
            'aria-current'?: boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time';
            /**
             * Identifies the element (or elements) that describes the object.
             * @see aria-labelledby
             */
            'aria-describedby'?: string;
            /**
             * Identifies the element that provides a detailed, extended description for the object.
             * @see aria-describedby.
             */
            'aria-details'?: string;
            /**
             * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
             * @see aria-hidden @see aria-readonly.
             */
            'aria-disabled'?: boolean | 'false' | 'true';
            /**
             * Indicates what functions can be performed when a dragged object is released on the drop target.
             * @deprecated in ARIA 1.1
             */
            'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup';
            /**
             * Identifies the element that provides an error message for the object.
             * @see aria-invalid @see aria-describedby.
             */
            'aria-errormessage'?: string;
            /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
            'aria-expanded'?: boolean | 'false' | 'true';
            /**
             * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
             * allows assistive technology to override the general default of reading in document source order.
             */
            'aria-flowto'?: string;
            /**
             * Indicates an element's "grabbed" state in a drag-and-drop operation.
             * @deprecated in ARIA 1.1
             */
            'aria-grabbed'?: boolean | 'false' | 'true';
            /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
            'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
            /**
             * Indicates whether the element is exposed to an accessibility API.
             * @see aria-disabled.
             */
            'aria-hidden'?: boolean | 'false' | 'true';
            /**
             * Indicates the entered value does not conform to the format expected by the application.
             * @see aria-errormessage.
             */
            'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling';
            /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
            'aria-keyshortcuts'?: string;
            /**
             * Defines a string value that labels the current element.
             * @see aria-labelledby.
             */
            'aria-label'?: string;
            /**
             * Identifies the element (or elements) that labels the current element.
             * @see aria-describedby.
             */
            'aria-labelledby'?: string;
            /** Defines the hierarchical level of an element within a structure. */
            'aria-level'?: number;
            /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
            'aria-live'?: 'off' | 'assertive' | 'polite';
            /** Indicates whether an element is modal when displayed. */
            'aria-modal'?: boolean | 'false' | 'true';
            /** Indicates whether a text box accepts multiple lines of input or only a single line. */
            'aria-multiline'?: boolean | 'false' | 'true';
            /** Indicates that the user may select more than one item from the current selectable descendants. */
            'aria-multiselectable'?: boolean | 'false' | 'true';
            /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
            'aria-orientation'?: 'horizontal' | 'vertical';
            /**
             * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
             * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
             * @see aria-controls.
             */
            'aria-owns'?: string;
            /**
             * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
             * A hint could be a sample value or a brief description of the expected format.
             */
            'aria-placeholder'?: string;
            /**
             * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
             * @see aria-setsize.
             */
            'aria-posinset'?: number;
            /**
             * Indicates the current "pressed" state of toggle buttons.
             * @see aria-checked @see aria-selected.
             */
            'aria-pressed'?: boolean | 'false' | 'mixed' | 'true';
            /**
             * Indicates that the element is not editable, but is otherwise operable.
             * @see aria-disabled.
             */
            'aria-readonly'?: boolean | 'false' | 'true';
            /**
             * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
             * @see aria-atomic.
             */
            'aria-relevant'?: 'additions' | 'additions text' | 'all' | 'removals' | 'text';
            /** Indicates that user input is required on the element before a form may be submitted. */
            'aria-required'?: boolean | 'false' | 'true';
            /** Defines a human-readable, author-localized description for the role of an element. */
            'aria-roledescription'?: string;
            /**
             * Defines the total number of rows in a table, grid, or treegrid.
             * @see aria-rowindex.
             */
            'aria-rowcount'?: number;
            /**
             * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
             * @see aria-rowcount @see aria-rowspan.
             */
            'aria-rowindex'?: number;
            /**
             * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
             * @see aria-rowindex @see aria-colspan.
             */
            'aria-rowspan'?: number;
            /**
             * Indicates the current "selected" state of various widgets.
             * @see aria-checked @see aria-pressed.
             */
            'aria-selected'?: boolean | 'false' | 'true';
            /**
             * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
             * @see aria-posinset.
             */
            'aria-setsize'?: number;
            /** Indicates if items in a table or grid are sorted in ascending or descending order. */
            'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other';
            /** Defines the maximum allowed value for a range widget. */
            'aria-valuemax'?: number;
            /** Defines the minimum allowed value for a range widget. */
            'aria-valuemin'?: number;
            /**
             * Defines the current value for a range widget.
             * @see aria-valuetext.
             */
            'aria-valuenow'?: number;
            /** Defines the human readable text alternative of aria-valuenow for a range widget. */
            'aria-valuetext'?: string;
        }

        interface AllHTMLAttributes<T> extends HTMLAttributes<T> {
            // Standard HTML Attributes
            accept?: string;
            acceptCharset?: string;
            action?: string;
            allowFullScreen?: boolean;
            allowTransparency?: boolean;
            alt?: string;
            as?: string;
            async?: boolean;
            autoComplete?: string;
            autoFocus?: boolean;
            autoPlay?: boolean;
            capture?: boolean | string;
            cellPadding?: number | string;
            cellSpacing?: number | string;
            charSet?: string;
            challenge?: string;
            checked?: boolean;
            cite?: string;
            classID?: string;
            cols?: number;
            colSpan?: number;
            content?: string;
            controls?: boolean;
            coords?: string;
            crossOrigin?: string;
            data?: string;
            dateTime?: string;
            default?: boolean;
            defer?: boolean;
            disabled?: boolean;
            download?: any;
            encType?: string;
            form?: string;
            formAction?: string;
            formEncType?: string;
            formMethod?: string;
            formNoValidate?: boolean;
            formTarget?: string;
            frameBorder?: number | string;
            headers?: string;
            height?: number | string;
            high?: number;
            href?: string;
            hrefLang?: string;
            htmlFor?: string;
            httpEquiv?: string;
            integrity?: string;
            keyParams?: string;
            keyType?: string;
            kind?: string;
            label?: string;
            list?: string;
            loop?: boolean;
            low?: number;
            manifest?: string;
            marginHeight?: number;
            marginWidth?: number;
            max?: number | string;
            maxLength?: number;
            media?: string;
            mediaGroup?: string;
            method?: string;
            min?: number | string;
            minLength?: number;
            multiple?: boolean;
            muted?: boolean;
            name?: string;
            nonce?: string;
            noValidate?: boolean;
            open?: boolean;
            optimum?: number;
            pattern?: string;
            placeholder?: string;
            playsInline?: boolean;
            poster?: string;
            preload?: string;
            readOnly?: boolean;
            rel?: string;
            required?: boolean;
            reversed?: boolean;
            rows?: number;
            rowSpan?: number;
            sandbox?: string;
            scope?: string;
            scoped?: boolean;
            scrolling?: string;
            seamless?: boolean;
            selected?: boolean;
            shape?: string;
            size?: number;
            sizes?: string;
            span?: number;
            src?: string;
            srcDoc?: string;
            srcLang?: string;
            srcSet?: string;
            start?: number;
            step?: number | string;
            summary?: string;
            target?: string;
            type?: string;
            useMap?: string;
            value?: string | string[] | number;
            width?: number | string;
            wmode?: string;
            wrap?: string;
        }

        interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
            download?: any;
            href?: string;
            hrefLang?: string;
            media?: string;
            rel?: string;
            target?: string;
            type?: string;
        }

        // tslint:disable-next-line:no-empty-interface
        interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> { }

        interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
            alt?: string;
            coords?: string;
            download?: any;
            href?: string;
            hrefLang?: string;
            media?: string;
            rel?: string;
            shape?: string;
            target?: string;
        }

        interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
            href?: string;
            target?: string;
        }

        interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
            cite?: string;
        }

        interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
            autoFocus?: boolean;
            disabled?: boolean;
            form?: string;
            formAction?: string;
            formEncType?: string;
            formMethod?: string;
            formNoValidate?: boolean;
            formTarget?: string;
            name?: string;
            type?: string;
            value?: string | string[] | number;
        }

        interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
            height?: number | string;
            width?: number | string;
        }

        interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
            span?: number;
            width?: number | string;
        }

        interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
            span?: number;
        }

        interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
            open?: boolean;
        }

        interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
            cite?: string;
            dateTime?: string;
        }

        interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
            open?: boolean;
        }

        interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
            height?: number | string;
            src?: string;
            type?: string;
            width?: number | string;
        }

        interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
            disabled?: boolean;
            form?: string;
            name?: string;
        }

        interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
            acceptCharset?: string;
            action?: string;
            autoComplete?: string;
            encType?: string;
            method?: string;
            name?: string;
            noValidate?: boolean;
            target?: string;
        }

        interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {
            manifest?: string;
        }

        interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
            allow?: string;
            allowFullScreen?: boolean;
            allowTransparency?: boolean;
            frameBorder?: number | string;
            height?: number | string;
            marginHeight?: number;
            marginWidth?: number;
            name?: string;
            sandbox?: string;
            scrolling?: string;
            seamless?: boolean;
            src?: string;
            srcDoc?: string;
            width?: number | string;
        }

        interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
            alt?: string;
            crossOrigin?: "anonymous" | "use-credentials" | "";
            decoding?: "async" | "auto" | "sync";
            height?: number | string;
            sizes?: string;
            src?: string;
            srcSet?: string;
            useMap?: string;
            width?: number | string;
        }

        interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
            cite?: string;
            dateTime?: string;
        }

        interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
            accept?: string;
            alt?: string;
            autoComplete?: string;
            autoFocus?: boolean;
            capture?: boolean | string; // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
            checked?: boolean;
            crossOrigin?: string;
            disabled?: boolean;
            form?: string;
            formAction?: string;
            formEncType?: string;
            formMethod?: string;
            formNoValidate?: boolean;
            formTarget?: string;
            height?: number | string;
            list?: string;
            max?: number | string;
            maxLength?: number;
            min?: number | string;
            minLength?: number;
            multiple?: boolean;
            name?: string;
            pattern?: string;
            placeholder?: string;
            readOnly?: boolean;
            required?: boolean;
            size?: number;
            src?: string;
            step?: number | string;
            type?: string;
            value?: string | string[] | number;
            width?: number | string;

            onChange?: ChangeEventHandler<T>;
        }

        interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
            autoFocus?: boolean;
            challenge?: string;
            disabled?: boolean;
            form?: string;
            keyType?: string;
            keyParams?: string;
            name?: string;
        }

        interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
            form?: string;
            htmlFor?: string;
        }

        interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
            value?: string | string[] | number;
        }

        interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
            as?: string;
            crossOrigin?: string;
            href?: string;
            hrefLang?: string;
            integrity?: string;
            media?: string;
            rel?: string;
            sizes?: string;
            type?: string;
        }

        interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
            name?: string;
        }

        interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
            type?: string;
        }

        interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
            autoPlay?: boolean;
            controls?: boolean;
            controlsList?: string;
            crossOrigin?: string;
            loop?: boolean;
            mediaGroup?: string;
            muted?: boolean;
            playsinline?: boolean;
            preload?: string;
            src?: string;
        }

        interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
            charSet?: string;
            content?: string;
            httpEquiv?: string;
            name?: string;
        }

        interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
            form?: string;
            high?: number;
            low?: number;
            max?: number | string;
            min?: number | string;
            optimum?: number;
            value?: string | string[] | number;
        }

        interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
            cite?: string;
        }

        interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
            classID?: string;
            data?: string;
            form?: string;
            height?: number | string;
            name?: string;
            type?: string;
            useMap?: string;
            width?: number | string;
            wmode?: string;
        }

        interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
            reversed?: boolean;
            start?: number;
            type?: '1' | 'a' | 'A' | 'i' | 'I';
        }

        interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
            disabled?: boolean;
            label?: string;
        }

        interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
            disabled?: boolean;
            label?: string;
            selected?: boolean;
            value?: string | string[] | number;
        }

        interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
            form?: string;
            htmlFor?: string;
            name?: string;
        }

        interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
            name?: string;
            value?: string | string[] | number;
        }

        interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
            max?: number | string;
            value?: string | string[] | number;
        }

        interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
            async?: boolean;
            charSet?: string;
            crossOrigin?: string;
            defer?: boolean;
            integrity?: string;
            noModule?: boolean;
            nonce?: string;
            src?: string;
            type?: string;
        }

        interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
            autoComplete?: string;
            autoFocus?: boolean;
            disabled?: boolean;
            form?: string;
            multiple?: boolean;
            name?: string;
            required?: boolean;
            size?: number;
            value?: string | string[] | number;
            onChange?: ChangeEventHandler<T>;
        }

        interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
            media?: string;
            sizes?: string;
            src?: string;
            srcSet?: string;
            type?: string;
        }

        interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
            media?: string;
            nonce?: string;
            scoped?: boolean;
            type?: string;
        }

        interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
            cellPadding?: number | string;
            cellSpacing?: number | string;
            summary?: string;
        }

        interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
            autoComplete?: string;
            autoFocus?: boolean;
            cols?: number;
            dirName?: string;
            disabled?: boolean;
            form?: string;
            maxLength?: number;
            minLength?: number;
            name?: string;
            placeholder?: string;
            readOnly?: boolean;
            required?: boolean;
            rows?: number;
            value?: string | string[] | number;
            wrap?: string;

            onChange?: ChangeEventHandler<T>;
        }

        interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
            colSpan?: number;
            headers?: string;
            rowSpan?: number;
            scope?: string;
        }

        interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
            colSpan?: number;
            headers?: string;
            rowSpan?: number;
            scope?: string;
        }

        interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
            dateTime?: string;
        }

        interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
            default?: boolean;
            kind?: string;
            label?: string;
            src?: string;
            srcLang?: string;
        }

        interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
            height?: number | string;
            playsInline?: boolean;
            poster?: string;
            width?: number | string;
        }

        // this list is "complete" in that it contains every SVG attribute
        // that React supports, but the types can be improved.
        // Full list here: https://facebook.github.io/react/docs/dom-elements.html
        //
        // The three broad type categories are (in order of restrictiveness):
        //   - "number | string"
        //   - "string"
        //   - union of string literals
        interface SVGAttributes<T> extends DOMAttributes<T> {
            // Attributes which also defined in HTMLAttributes
            // See comment in SVGDOMPropertyConfig.js
            className?: string;
            color?: string;
            height?: number | string;
            id?: string;
            lang?: string;
            max?: number | string;
            media?: string;
            method?: string;
            min?: number | string;
            name?: string;
            style?: CSSProperties;
            target?: string;
            type?: string;
            width?: number | string;

            // Other HTML properties supported by SVG elements in browsers
            role?: string;
            tabIndex?: number;

            // SVG Specific attributes
            accentHeight?: number | string;
            accumulate?: "none" | "sum";
            additive?: "replace" | "sum";
            alignmentBaseline?: "auto" | "baseline" | "before-edge" | "text-before-edge" | "middle" | "central" | "after-edge" |
            "text-after-edge" | "ideographic" | "alphabetic" | "hanging" | "mathematical" | "inherit";
            allowReorder?: "no" | "yes";
            alphabetic?: number | string;
            amplitude?: number | string;
            arabicForm?: "initial" | "medial" | "terminal" | "isolated";
            ascent?: number | string;
            attributeName?: string;
            attributeType?: string;
            autoReverse?: number | string;
            azimuth?: number | string;
            baseFrequency?: number | string;
            baselineShift?: number | string;
            baseProfile?: number | string;
            bbox?: number | string;
            begin?: number | string;
            bias?: number | string;
            by?: number | string;
            calcMode?: number | string;
            capHeight?: number | string;
            clip?: number | string;
            clipPath?: string;
            clipPathUnits?: number | string;
            clipRule?: number | string;
            colorInterpolation?: number | string;
            colorInterpolationFilters?: "auto" | "sRGB" | "linearRGB" | "inherit";
            colorProfile?: number | string;
            colorRendering?: number | string;
            contentScriptType?: number | string;
            contentStyleType?: number | string;
            cursor?: number | string;
            cx?: number | string;
            cy?: number | string;
            d?: string;
            decelerate?: number | string;
            descent?: number | string;
            diffuseConstant?: number | string;
            direction?: number | string;
            display?: number | string;
            divisor?: number | string;
            dominantBaseline?: number | string;
            dur?: number | string;
            dx?: number | string;
            dy?: number | string;
            edgeMode?: number | string;
            elevation?: number | string;
            enableBackground?: number | string;
            end?: number | string;
            exponent?: number | string;
            externalResourcesRequired?: number | string;
            fill?: string;
            fillOpacity?: number | string;
            fillRule?: "nonzero" | "evenodd" | "inherit";
            filter?: string;
            filterRes?: number | string;
            filterUnits?: number | string;
            floodColor?: number | string;
            floodOpacity?: number | string;
            focusable?: number | string;
            fontFamily?: string;
            fontSize?: number | string;
            fontSizeAdjust?: number | string;
            fontStretch?: number | string;
            fontStyle?: number | string;
            fontVariant?: number | string;
            fontWeight?: number | string;
            format?: number | string;
            from?: number | string;
            fx?: number | string;
            fy?: number | string;
            g1?: number | string;
            g2?: number | string;
            glyphName?: number | string;
            glyphOrientationHorizontal?: number | string;
            glyphOrientationVertical?: number | string;
            glyphRef?: number | string;
            gradientTransform?: string;
            gradientUnits?: string;
            hanging?: number | string;
            horizAdvX?: number | string;
            horizOriginX?: number | string;
            href?: string;
            ideographic?: number | string;
            imageRendering?: number | string;
            in2?: number | string;
            in?: string;
            intercept?: number | string;
            k1?: number | string;
            k2?: number | string;
            k3?: number | string;
            k4?: number | string;
            k?: number | string;
            kernelMatrix?: number | string;
            kernelUnitLength?: number | string;
            kerning?: number | string;
            keyPoints?: number | string;
            keySplines?: number | string;
            keyTimes?: number | string;
            lengthAdjust?: number | string;
            letterSpacing?: number | string;
            lightingColor?: number | string;
            limitingConeAngle?: number | string;
            local?: number | string;
            markerEnd?: string;
            markerHeight?: number | string;
            markerMid?: string;
            markerStart?: string;
            markerUnits?: number | string;
            markerWidth?: number | string;
            mask?: string;
            maskContentUnits?: number | string;
            maskUnits?: number | string;
            mathematical?: number | string;
            mode?: number | string;
            numOctaves?: number | string;
            offset?: number | string;
            opacity?: number | string;
            operator?: number | string;
            order?: number | string;
            orient?: number | string;
            orientation?: number | string;
            origin?: number | string;
            overflow?: number | string;
            overlinePosition?: number | string;
            overlineThickness?: number | string;
            paintOrder?: number | string;
            panose1?: number | string;
            pathLength?: number | string;
            patternContentUnits?: string;
            patternTransform?: number | string;
            patternUnits?: string;
            pointerEvents?: number | string;
            points?: string;
            pointsAtX?: number | string;
            pointsAtY?: number | string;
            pointsAtZ?: number | string;
            preserveAlpha?: number | string;
            preserveAspectRatio?: string;
            primitiveUnits?: number | string;
            r?: number | string;
            radius?: number | string;
            refX?: number | string;
            refY?: number | string;
            renderingIntent?: number | string;
            repeatCount?: number | string;
            repeatDur?: number | string;
            requiredExtensions?: number | string;
            requiredFeatures?: number | string;
            restart?: number | string;
            result?: string;
            rotate?: number | string;
            rx?: number | string;
            ry?: number | string;
            scale?: number | string;
            seed?: number | string;
            shapeRendering?: number | string;
            slope?: number | string;
            spacing?: number | string;
            specularConstant?: number | string;
            specularExponent?: number | string;
            speed?: number | string;
            spreadMethod?: string;
            startOffset?: number | string;
            stdDeviation?: number | string;
            stemh?: number | string;
            stemv?: number | string;
            stitchTiles?: number | string;
            stopColor?: string;
            stopOpacity?: number | string;
            strikethroughPosition?: number | string;
            strikethroughThickness?: number | string;
            string?: number | string;
            stroke?: string;
            strokeDasharray?: string | number;
            strokeDashoffset?: string | number;
            strokeLinecap?: "butt" | "round" | "square" | "inherit";
            strokeLinejoin?: "miter" | "round" | "bevel" | "inherit";
            strokeMiterlimit?: number | string;
            strokeOpacity?: number | string;
            strokeWidth?: number | string;
            surfaceScale?: number | string;
            systemLanguage?: number | string;
            tableValues?: number | string;
            targetX?: number | string;
            targetY?: number | string;
            textAnchor?: string;
            textDecoration?: number | string;
            textLength?: number | string;
            textRendering?: number | string;
            to?: number | string;
            transform?: string;
            u1?: number | string;
            u2?: number | string;
            underlinePosition?: number | string;
            underlineThickness?: number | string;
            unicode?: number | string;
            unicodeBidi?: number | string;
            unicodeRange?: number | string;
            unitsPerEm?: number | string;
            vAlphabetic?: number | string;
            values?: string;
            vectorEffect?: number | string;
            version?: string;
            vertAdvY?: number | string;
            vertOriginX?: number | string;
            vertOriginY?: number | string;
            vHanging?: number | string;
            vIdeographic?: number | string;
            viewBox?: string;
            viewTarget?: number | string;
            visibility?: number | string;
            vMathematical?: number | string;
            widths?: number | string;
            wordSpacing?: number | string;
            writingMode?: number | string;
            x1?: number | string;
            x2?: number | string;
            x?: number | string;
            xChannelSelector?: string;
            xHeight?: number | string;
            xlinkActuate?: string;
            xlinkArcrole?: string;
            xlinkHref?: string;
            xlinkRole?: string;
            xlinkShow?: string;
            xlinkTitle?: string;
            xlinkType?: string;
            xmlBase?: string;
            xmlLang?: string;
            xmlns?: string;
            xmlnsXlink?: string;
            xmlSpace?: string;
            y1?: number | string;
            y2?: number | string;
            y?: number | string;
            yChannelSelector?: string;
            z?: number | string;
            zoomAndPan?: string;
        }

        interface WebViewHTMLAttributes<T> extends HTMLAttributes<T> {
            allowFullScreen?: boolean;
            allowpopups?: boolean;
            autoFocus?: boolean;
            autosize?: boolean;
            blinkfeatures?: string;
            disableblinkfeatures?: string;
            disableguestresize?: boolean;
            disablewebsecurity?: boolean;
            guestinstance?: string;
            httpreferrer?: string;
            nodeintegration?: boolean;
            partition?: string;
            plugins?: boolean;
            preload?: string;
            src?: string;
            useragent?: string;
            webpreferences?: string;
        }

        //
        // React.DOM
        // ----------------------------------------------------------------------

        interface ReactHTML {
            a: DetailedHTMLFactory<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
            abbr: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            address: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            area: DetailedHTMLFactory<AreaHTMLAttributes<HTMLAreaElement>, HTMLAreaElement>;
            article: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            aside: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            audio: DetailedHTMLFactory<AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>;
            b: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            base: DetailedHTMLFactory<BaseHTMLAttributes<HTMLBaseElement>, HTMLBaseElement>;
            bdi: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            bdo: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            big: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            blockquote: DetailedHTMLFactory<BlockquoteHTMLAttributes<HTMLElement>, HTMLElement>;
            body: DetailedHTMLFactory<HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>;
            br: DetailedHTMLFactory<HTMLAttributes<HTMLBRElement>, HTMLBRElement>;
            button: DetailedHTMLFactory<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
            canvas: DetailedHTMLFactory<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>;
            caption: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            cite: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            code: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            col: DetailedHTMLFactory<ColHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>;
            colgroup: DetailedHTMLFactory<ColgroupHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>;
            data: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            datalist: DetailedHTMLFactory<HTMLAttributes<HTMLDataListElement>, HTMLDataListElement>;
            dd: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            del: DetailedHTMLFactory<DelHTMLAttributes<HTMLElement>, HTMLElement>;
            details: DetailedHTMLFactory<DetailsHTMLAttributes<HTMLElement>, HTMLElement>;
            dfn: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            dialog: DetailedHTMLFactory<DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>;
            div: DetailedHTMLFactory<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
            dl: DetailedHTMLFactory<HTMLAttributes<HTMLDListElement>, HTMLDListElement>;
            dt: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            em: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            embed: DetailedHTMLFactory<EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>;
            fieldset: DetailedHTMLFactory<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>;
            figcaption: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            figure: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            footer: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            form: DetailedHTMLFactory<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
            h1: DetailedHTMLFactory<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            h2: DetailedHTMLFactory<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            h3: DetailedHTMLFactory<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            h4: DetailedHTMLFactory<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            h5: DetailedHTMLFactory<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            h6: DetailedHTMLFactory<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            head: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLHeadElement>;
            header: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            hgroup: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            hr: DetailedHTMLFactory<HTMLAttributes<HTMLHRElement>, HTMLHRElement>;
            html: DetailedHTMLFactory<HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement>;
            i: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            iframe: DetailedHTMLFactory<IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>;
            img: DetailedHTMLFactory<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
            input: DetailedHTMLFactory<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
            ins: DetailedHTMLFactory<InsHTMLAttributes<HTMLModElement>, HTMLModElement>;
            kbd: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            keygen: DetailedHTMLFactory<KeygenHTMLAttributes<HTMLElement>, HTMLElement>;
            label: DetailedHTMLFactory<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
            legend: DetailedHTMLFactory<HTMLAttributes<HTMLLegendElement>, HTMLLegendElement>;
            li: DetailedHTMLFactory<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
            link: DetailedHTMLFactory<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>;
            main: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            map: DetailedHTMLFactory<MapHTMLAttributes<HTMLMapElement>, HTMLMapElement>;
            mark: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            menu: DetailedHTMLFactory<MenuHTMLAttributes<HTMLElement>, HTMLElement>;
            menuitem: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            meta: DetailedHTMLFactory<MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>;
            meter: DetailedHTMLFactory<MeterHTMLAttributes<HTMLElement>, HTMLElement>;
            nav: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            noscript: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            object: DetailedHTMLFactory<ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>;
            ol: DetailedHTMLFactory<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>;
            optgroup: DetailedHTMLFactory<OptgroupHTMLAttributes<HTMLOptGroupElement>, HTMLOptGroupElement>;
            option: DetailedHTMLFactory<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
            output: DetailedHTMLFactory<OutputHTMLAttributes<HTMLElement>, HTMLElement>;
            p: DetailedHTMLFactory<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
            param: DetailedHTMLFactory<ParamHTMLAttributes<HTMLParamElement>, HTMLParamElement>;
            picture: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            pre: DetailedHTMLFactory<HTMLAttributes<HTMLPreElement>, HTMLPreElement>;
            progress: DetailedHTMLFactory<ProgressHTMLAttributes<HTMLProgressElement>, HTMLProgressElement>;
            q: DetailedHTMLFactory<QuoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>;
            rp: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            rt: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            ruby: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            s: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            samp: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            script: DetailedHTMLFactory<ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement>;
            section: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            select: DetailedHTMLFactory<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
            small: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            source: DetailedHTMLFactory<SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>;
            span: DetailedHTMLFactory<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
            strong: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            style: DetailedHTMLFactory<StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>;
            sub: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            summary: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            sup: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            table: DetailedHTMLFactory<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>;
            tbody: DetailedHTMLFactory<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
            td: DetailedHTMLFactory<TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>;
            textarea: DetailedHTMLFactory<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
            tfoot: DetailedHTMLFactory<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
            th: DetailedHTMLFactory<ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>;
            thead: DetailedHTMLFactory<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
            time: DetailedHTMLFactory<TimeHTMLAttributes<HTMLElement>, HTMLElement>;
            title: DetailedHTMLFactory<HTMLAttributes<HTMLTitleElement>, HTMLTitleElement>;
            tr: DetailedHTMLFactory<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;
            track: DetailedHTMLFactory<TrackHTMLAttributes<HTMLTrackElement>, HTMLTrackElement>;
            u: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            ul: DetailedHTMLFactory<HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
            "var": DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            video: DetailedHTMLFactory<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
            wbr: DetailedHTMLFactory<HTMLAttributes<HTMLElement>, HTMLElement>;
            webview: DetailedHTMLFactory<WebViewHTMLAttributes<HTMLWebViewElement>, HTMLWebViewElement>;
        }

        interface ReactSVG {
            animate: SVGFactory;
            circle: SVGFactory;
            clipPath: SVGFactory;
            defs: SVGFactory;
            desc: SVGFactory;
            ellipse: SVGFactory;
            feBlend: SVGFactory;
            feColorMatrix: SVGFactory;
            feComponentTransfer: SVGFactory;
            feComposite: SVGFactory;
            feConvolveMatrix: SVGFactory;
            feDiffuseLighting: SVGFactory;
            feDisplacementMap: SVGFactory;
            feDistantLight: SVGFactory;
            feDropShadow: SVGFactory;
            feFlood: SVGFactory;
            feFuncA: SVGFactory;
            feFuncB: SVGFactory;
            feFuncG: SVGFactory;
            feFuncR: SVGFactory;
            feGaussianBlur: SVGFactory;
            feImage: SVGFactory;
            feMerge: SVGFactory;
            feMergeNode: SVGFactory;
            feMorphology: SVGFactory;
            feOffset: SVGFactory;
            fePointLight: SVGFactory;
            feSpecularLighting: SVGFactory;
            feSpotLight: SVGFactory;
            feTile: SVGFactory;
            feTurbulence: SVGFactory;
            filter: SVGFactory;
            foreignObject: SVGFactory;
            g: SVGFactory;
            image: SVGFactory;
            line: SVGFactory;
            linearGradient: SVGFactory;
            marker: SVGFactory;
            mask: SVGFactory;
            metadata: SVGFactory;
            path: SVGFactory;
            pattern: SVGFactory;
            polygon: SVGFactory;
            polyline: SVGFactory;
            radialGradient: SVGFactory;
            rect: SVGFactory;
            stop: SVGFactory;
            svg: SVGFactory;
            switch: SVGFactory;
            symbol: SVGFactory;
            text: SVGFactory;
            textPath: SVGFactory;
            tspan: SVGFactory;
            use: SVGFactory;
            view: SVGFactory;
        }

        interface ReactDOM extends ReactHTML, ReactSVG { }

        //
        // React.PropTypes
        // ----------------------------------------------------------------------

        type Validator<T> = PropTypes.Validator<T>;

        type Requireable<T> = PropTypes.Requireable<T>;

        type ValidationMap<T> = PropTypes.ValidationMap<T>;

        interface ReactPropTypes {
            any: typeof PropTypes.any;
            array: typeof PropTypes.array;
            bool: typeof PropTypes.bool;
            func: typeof PropTypes.func;
            number: typeof PropTypes.number;
            object: typeof PropTypes.object;
            string: typeof PropTypes.string;
            node: typeof PropTypes.node;
            element: typeof PropTypes.element;
            instanceOf: typeof PropTypes.instanceOf;
            oneOf: typeof PropTypes.oneOf;
            oneOfType: typeof PropTypes.oneOfType;
            arrayOf: typeof PropTypes.arrayOf;
            objectOf: typeof PropTypes.objectOf;
            shape: typeof PropTypes.shape;
            exact: typeof PropTypes.exact;
        }

        //
        // React.Children
        // ----------------------------------------------------------------------

        interface ReactChildren {
            map<T>(children: ReactNode, fn: (child: ReactChild, index: number) => T): T[];
            forEach(children: ReactNode, fn: (child: ReactChild, index: number) => void): void;
            count(children: ReactNode): number;
            only(children: ReactNode): ReactElement<any>;
            toArray(children: ReactNode): ReactChild[];
        }

        //
        // Browser Interfaces
        // https://github.com/nikeee/2048-typescript/blob/master/2048/js/touch.d.ts
        // ----------------------------------------------------------------------

        interface AbstractView {
            styleMedia: StyleMedia;
            document: Document;
        }

        interface Touch {
            identifier: number;
            target: EventTarget;
            screenX: number;
            screenY: number;
            clientX: number;
            clientY: number;
            pageX: number;
            pageY: number;
        }

        interface TouchList {
            [index: number]: Touch;
            length: number;
            item(index: number): Touch;
            identifiedTouch(identifier: number): Touch;
        }

        //
        // Error Interfaces
        // ----------------------------------------------------------------------
        interface ErrorInfo {
            /**
             * Captures which component contained the exception, and its ancestors.
             */
            componentStack: string;
        }
    }

    // Declared props take priority over inferred props
    // If declared props have indexed properties, ignore inferred props entirely as keyof gets widened
    type MergePropTypes<P, T> = P & Pick<T, Exclude<keyof T, keyof P>>;

    // Any prop that has a default prop becomes optional, but its type is unchanged
    // Undeclared default props are augmented into the resulting allowable attributes
    // If declared props have indexed properties, ignore default props entirely as keyof gets widened
    // Wrap in an outer-level conditional type to allow distribution over props that are unions
    type Defaultize<P, D> = P extends any
        ? string extends keyof P ? P :
        & Pick<P, Exclude<keyof P, keyof D>>
        & Partial<Pick<P, Extract<keyof P, keyof D>>>
        & Partial<Pick<D, Exclude<keyof D, keyof P>>>
        : never;

    global {
        namespace JSX {
            // tslint:disable-next-line:no-empty-interface
            interface Element extends React.ReactElement<any> { }
            interface ElementClass extends React.Component<any> {
                render(): React.ReactNode;
            }
            interface ElementAttributesProperty { props: {}; }
            interface ElementChildrenAttribute { children: {}; }

            type LibraryManagedAttributes<C, P> = C extends { propTypes: infer T; defaultProps: infer D; }
                ? Defaultize<MergePropTypes<P, PropTypes.InferProps<T>>, D>
                : C extends { propTypes: infer T; }
                ? MergePropTypes<P, PropTypes.InferProps<T>>
                : C extends { defaultProps: infer D; }
                ? Defaultize<P, D>
                : P;

            // tslint:disable-next-line:no-empty-interface
            interface IntrinsicAttributes extends React.Attributes { }
            // tslint:disable-next-line:no-empty-interface
            interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> { }

            interface IntrinsicElements {
                // HTML
                a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
                abbr: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                address: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                area: React.DetailedHTMLProps<React.AreaHTMLAttributes<HTMLAreaElement>, HTMLAreaElement>;
                article: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                aside: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                audio: React.DetailedHTMLProps<React.AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>;
                b: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                base: React.DetailedHTMLProps<React.BaseHTMLAttributes<HTMLBaseElement>, HTMLBaseElement>;
                bdi: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                bdo: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                big: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                blockquote: React.DetailedHTMLProps<React.BlockquoteHTMLAttributes<HTMLElement>, HTMLElement>;
                body: React.DetailedHTMLProps<React.HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>;
                br: React.DetailedHTMLProps<React.HTMLAttributes<HTMLBRElement>, HTMLBRElement>;
                button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
                canvas: React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>;
                caption: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                cite: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                code: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                col: React.DetailedHTMLProps<React.ColHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>;
                colgroup: React.DetailedHTMLProps<React.ColgroupHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>;
                data: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                datalist: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDataListElement>, HTMLDataListElement>;
                dd: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                del: React.DetailedHTMLProps<React.DelHTMLAttributes<HTMLElement>, HTMLElement>;
                details: React.DetailedHTMLProps<React.DetailsHTMLAttributes<HTMLElement>, HTMLElement>;
                dfn: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                dialog: React.DetailedHTMLProps<React.DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>;
                div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
                dl: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDListElement>, HTMLDListElement>;
                dt: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                em: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                embed: React.DetailedHTMLProps<React.EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>;
                fieldset: React.DetailedHTMLProps<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>;
                figcaption: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                figure: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                footer: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                form: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
                h1: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
                h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
                h3: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
                h4: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
                h5: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
                h6: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
                head: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadElement>, HTMLHeadElement>;
                header: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                hgroup: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                hr: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHRElement>, HTMLHRElement>;
                html: React.DetailedHTMLProps<React.HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement>;
                i: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                iframe: React.DetailedHTMLProps<React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>;
                img: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
                input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
                ins: React.DetailedHTMLProps<React.InsHTMLAttributes<HTMLModElement>, HTMLModElement>;
                kbd: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                keygen: React.DetailedHTMLProps<React.KeygenHTMLAttributes<HTMLElement>, HTMLElement>;
                label: React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
                legend: React.DetailedHTMLProps<React.HTMLAttributes<HTMLLegendElement>, HTMLLegendElement>;
                li: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
                link: React.DetailedHTMLProps<React.LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>;
                main: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                map: React.DetailedHTMLProps<React.MapHTMLAttributes<HTMLMapElement>, HTMLMapElement>;
                mark: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                menu: React.DetailedHTMLProps<React.MenuHTMLAttributes<HTMLElement>, HTMLElement>;
                menuitem: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                meta: React.DetailedHTMLProps<React.MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>;
                meter: React.DetailedHTMLProps<React.MeterHTMLAttributes<HTMLElement>, HTMLElement>;
                nav: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                noindex: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                noscript: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                object: React.DetailedHTMLProps<React.ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>;
                ol: React.DetailedHTMLProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>;
                optgroup: React.DetailedHTMLProps<React.OptgroupHTMLAttributes<HTMLOptGroupElement>, HTMLOptGroupElement>;
                option: React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
                output: React.DetailedHTMLProps<React.OutputHTMLAttributes<HTMLElement>, HTMLElement>;
                p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
                param: React.DetailedHTMLProps<React.ParamHTMLAttributes<HTMLParamElement>, HTMLParamElement>;
                picture: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                pre: React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>;
                progress: React.DetailedHTMLProps<React.ProgressHTMLAttributes<HTMLProgressElement>, HTMLProgressElement>;
                q: React.DetailedHTMLProps<React.QuoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>;
                rp: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                rt: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                ruby: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                s: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                samp: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                script: React.DetailedHTMLProps<React.ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement>;
                section: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                select: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
                small: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                source: React.DetailedHTMLProps<React.SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>;
                span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
                strong: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                style: React.DetailedHTMLProps<React.StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>;
                sub: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                summary: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                sup: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                table: React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>;
                tbody: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
                td: React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>;
                textarea: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
                tfoot: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
                th: React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>;
                thead: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
                time: React.DetailedHTMLProps<React.TimeHTMLAttributes<HTMLElement>, HTMLElement>;
                title: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTitleElement>, HTMLTitleElement>;
                tr: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;
                track: React.DetailedHTMLProps<React.TrackHTMLAttributes<HTMLTrackElement>, HTMLTrackElement>;
                u: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                ul: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
                "var": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                video: React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
                wbr: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
                webview: React.DetailedHTMLProps<React.WebViewHTMLAttributes<HTMLWebViewElement>, HTMLWebViewElement>;

                // SVG
                svg: React.SVGProps<SVGSVGElement>;

                animate: React.SVGProps<SVGElement>; // TODO: It is SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
                animateTransform: React.SVGProps<SVGElement>; // TODO: It is SVGAnimateTransformElement but is not in TypeScript's lib.dom.d.ts for now.
                circle: React.SVGProps<SVGCircleElement>;
                clipPath: React.SVGProps<SVGClipPathElement>;
                defs: React.SVGProps<SVGDefsElement>;
                desc: React.SVGProps<SVGDescElement>;
                ellipse: React.SVGProps<SVGEllipseElement>;
                feBlend: React.SVGProps<SVGFEBlendElement>;
                feColorMatrix: React.SVGProps<SVGFEColorMatrixElement>;
                feComponentTransfer: React.SVGProps<SVGFEComponentTransferElement>;
                feComposite: React.SVGProps<SVGFECompositeElement>;
                feConvolveMatrix: React.SVGProps<SVGFEConvolveMatrixElement>;
                feDiffuseLighting: React.SVGProps<SVGFEDiffuseLightingElement>;
                feDisplacementMap: React.SVGProps<SVGFEDisplacementMapElement>;
                feDistantLight: React.SVGProps<SVGFEDistantLightElement>;
                feFlood: React.SVGProps<SVGFEFloodElement>;
                feFuncA: React.SVGProps<SVGFEFuncAElement>;
                feFuncB: React.SVGProps<SVGFEFuncBElement>;
                feFuncG: React.SVGProps<SVGFEFuncGElement>;
                feFuncR: React.SVGProps<SVGFEFuncRElement>;
                feGaussianBlur: React.SVGProps<SVGFEGaussianBlurElement>;
                feImage: React.SVGProps<SVGFEImageElement>;
                feMerge: React.SVGProps<SVGFEMergeElement>;
                feMergeNode: React.SVGProps<SVGFEMergeNodeElement>;
                feMorphology: React.SVGProps<SVGFEMorphologyElement>;
                feOffset: React.SVGProps<SVGFEOffsetElement>;
                fePointLight: React.SVGProps<SVGFEPointLightElement>;
                feSpecularLighting: React.SVGProps<SVGFESpecularLightingElement>;
                feSpotLight: React.SVGProps<SVGFESpotLightElement>;
                feTile: React.SVGProps<SVGFETileElement>;
                feTurbulence: React.SVGProps<SVGFETurbulenceElement>;
                filter: React.SVGProps<SVGFilterElement>;
                foreignObject: React.SVGProps<SVGForeignObjectElement>;
                g: React.SVGProps<SVGGElement>;
                image: React.SVGProps<SVGImageElement>;
                line: React.SVGProps<SVGLineElement>;
                linearGradient: React.SVGProps<SVGLinearGradientElement>;
                marker: React.SVGProps<SVGMarkerElement>;
                mask: React.SVGProps<SVGMaskElement>;
                metadata: React.SVGProps<SVGMetadataElement>;
                path: React.SVGProps<SVGPathElement>;
                pattern: React.SVGProps<SVGPatternElement>;
                polygon: React.SVGProps<SVGPolygonElement>;
                polyline: React.SVGProps<SVGPolylineElement>;
                radialGradient: React.SVGProps<SVGRadialGradientElement>;
                rect: React.SVGProps<SVGRectElement>;
                stop: React.SVGProps<SVGStopElement>;
                switch: React.SVGProps<SVGSwitchElement>;
                symbol: React.SVGProps<SVGSymbolElement>;
                text: React.SVGProps<SVGTextElement>;
                textPath: React.SVGProps<SVGTextPathElement>;
                tspan: React.SVGProps<SVGTSpanElement>;
                use: React.SVGProps<SVGUseElement>;
                view: React.SVGProps<SVGViewElement>;
            }
        }
    }
}

declare module "react/jsx-runtime" {
    import * as React from "react";
    export function jsx(...args: any): React.ReactElement<any>;
    export function jsxs(...args: any): React.ReactElement<any>;
    export import Fragment = React.Fragment;
}


declare module "react/jsx-dev-runtime" {
    import * as React from "react";
    export function jsxDEV(...args: any): React.ReactElement<any>;
    export import Fragment = React.Fragment;
}
