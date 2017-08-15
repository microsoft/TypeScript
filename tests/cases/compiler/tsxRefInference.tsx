// @jsx: react
// @moduleResolution: node
// @noImplicitAny: true
// @lib: dom,es6
// @filename: node_modules/react/index.d.ts
export as namespace React;
export = React;

declare namespace React {
    interface SyntheticEvent<T> {
        bubbles: boolean;
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
        target: EventTarget;
        timeStamp: number;
        type: string;
    }

    interface ChangeEvent<T> extends SyntheticEvent<T> {
        target: EventTarget & T;
    }

    interface FormEvent<T> extends SyntheticEvent<T> {
    }

    interface DOMAttributes<T> {
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
    }

    interface HTMLAttributes<T> extends DOMAttributes<T> {}

    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
        onChange?: ChangeEventHandler<T>;
    }

    type FormEventHandler<T> = EventHandler<FormEvent<T>>;
    type ChangeEventHandler<T> = EventHandler<ChangeEvent<T>>;
    type EventHandler<E extends SyntheticEvent<any>> = (event: E) => void;
    type DetailedHTMLProps<E extends HTMLAttributes<T>, T> = ClassAttributes<T> & E;

    interface Attributes {
        key?: Key;
    }
    interface ClassAttributes<T> extends Attributes {
        ref?: Ref<T>;
    }

    type Key = string | number;
    type Ref<T> = string | ((instance: T | null) => any);

    interface Component<P = {}, S = {}> extends ComponentLifecycle<P, S> {}

    interface ComponentLifecycle<P, S> {
        componentWillMount?(): void;
        componentDidMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
        shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean;
        componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
        componentDidUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>, prevContext: any): void;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: ErrorInfo): void;
    }

    interface ErrorInfo {
        componentStack: string;
    }

    interface ReactElement<P> {
        type: string | ComponentClass<P> | SFC<P>;
        props: P;
        key: Key | null;
    }

    interface SFCElement<P> extends ReactElement<P> {
        type: SFC<P>;
    }

    type ComponentState = {};
    type ClassType<P, T extends Component<P, ComponentState>, C extends ComponentClass<P>> =
        & C
        & (new (props?: P, context?: any) => T)
        & (new (props?: P, context?: any) => { props: P });

    type CElement<P, T extends Component<P, ComponentState>> = ComponentElement<P, T>;
    interface ComponentElement<P, T extends Component<P, ComponentState>> extends ReactElement<P> {
        type: ComponentClass<P>;
        ref?: Ref<T>;
    }

    interface ClassicComponent<P = {}, S = {}> extends Component<P, S> {
        replaceState(nextState: S, callback?: () => any): void;
        isMounted(): boolean;
        getInitialState?(): S;
    }

    interface ClassicComponentClass<P = {}> extends ComponentClass<P> {
        new (props?: P, context?: any): ClassicComponent<P, ComponentState>;
        getDefaultProps?(): P;
    }

    type SFC<P = {}> = StatelessComponent<P>;
    interface StatelessComponent<P = {}> {
        (props: P & { children?: ReactNode }, context?: any): ReactElement<any> | null;
        propTypes?: ValidationMap<P>;
        contextTypes?: ValidationMap<any>;
        defaultProps?: Partial<P>;
        displayName?: string;
    }

    type ReactNode = ReactChild | ReactFragment | boolean | null | undefined;
    type ReactChild = ReactElement<any> | ReactText;
    type ReactText = string | number;
    // Should be Array<ReactNode> but type aliases cannot be recursive
    type ReactFragment = {} | Array<ReactChild | any[] | boolean>;

    interface ComponentClass<P = {}> {
        new (props?: P, context?: any): Component<P, {}>;
        propTypes?: ValidationMap<P>;
        contextTypes?: ValidationMap<any>;
        childContextTypes?: ValidationMap<any>;
        defaultProps?: Partial<P>;
        displayName?: string;
    }

    type ValidationMap<T> = {[K in keyof T]?: Validator<T> };
    type Validator<T> = (object: T, key: string, componentName: string, ...rest: any[]) => Error | null;

    function createElement<P>(
        type: SFC<P>,
        props?: Attributes & P,
        ...children: ReactNode[]): SFCElement<P>;
    function createElement<P>(
        type: ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>>,
        props?: ClassAttributes<ClassicComponent<P, ComponentState>> & P,
        ...children: ReactNode[]): CElement<P, ClassicComponent<P, ComponentState>>;
    function createElement<P, T extends Component<P, ComponentState>, C extends ComponentClass<P>>(
        type: ClassType<P, T, C>,
        props?: ClassAttributes<T> & P,
        ...children: ReactNode[]): CElement<P, T>;
    function createElement<P>(
        type: ComponentClass<P>,
        props?: Attributes & P,
        ...children: ReactNode[]): ReactElement<P>;
}

declare global {
    namespace JSX {
        interface Element extends React.ReactElement<any> {}
        interface ElementClass extends React.Component<any> {
            render(): JSX.Element | null | false;
        }
        interface ElementAttributesProperty { props: {}; }
        interface ElementChildrenAttribute { children: {}; }

        interface IntrinsicAttributes extends React.Attributes {}
        interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> {}

        interface IntrinsicElements {
            input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,  HTMLInputElement>;
        }
    }
}

// @filename: index.tsx
import React = require("react");

interface MyInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,  HTMLInputElement> {
    onValid?(): boolean;
    onInvalid?(): boolean;
}

class MyInput implements React.Component<MyInputProps, any>  {
    props: MyInputProps;
    render() {
        const { onValid, onInvalid, onChange, ...inputProps } = this.props;
        return (
            <input
                { ...inputProps }
                onChange={ this._onChange }
            />
        );
    }

    componentDidMount() {}

    private _onChange(event: React.ChangeEvent<HTMLInputElement>) {
        // do some validation first...

        // ... then trigger onChange callback, if present:
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }
}

function someFunction() {}
const x = <MyInput ref={r => 0} onChange={someFunction} />;