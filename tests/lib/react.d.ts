// Type definitions for React v0.14
// Project: http://facebook.github.io/react/
// Definitions by: Asana <https://asana.com>, AssureSign <http://www.assuresign.com>, Microsoft <https://microsoft.com>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare namespace __React {
    //
    // React Elements
    // ----------------------------------------------------------------------

    type ReactType = string | ComponentClass<any> | StatelessComponent<any>;

    interface ReactElement<P extends Props<any>> {
        type: string | ComponentClass<P> | StatelessComponent<P>;
        props: P;
        key: string | number;
        ref: string | ((component: Component<P, any> | Element) => any);
    }

    interface ClassicElement<P> extends ReactElement<P> {
        type: ClassicComponentClass<P>;
        ref: string | ((component: ClassicComponent<P, any>) => any);
    }

    interface DOMElement<P extends Props<Element>> extends ReactElement<P> {
        type: string;
        ref: string | ((element: Element) => any);
    }

    interface ReactHTMLElement extends DOMElement<HTMLProps<HTMLElement>> {
        ref: string | ((element: HTMLElement) => any);
    }

    interface ReactSVGElement extends DOMElement<SVGProps> {
        ref: string | ((element: SVGElement) => any);
    }

    //
    // Factories
    // ----------------------------------------------------------------------

    interface Factory<P> {
        (props?: P, ...children: ReactNode[]): ReactElement<P>;
    }

    interface ClassicFactory<P> extends Factory<P> {
        (props?: P, ...children: ReactNode[]): ClassicElement<P>;
    }

    interface DOMFactory<P extends Props<Element>> extends Factory<P> {
        (props?: P, ...children: ReactNode[]): DOMElement<P>;
    }

    type HTMLFactory = DOMFactory<HTMLProps<HTMLElement>>;
    type SVGFactory = DOMFactory<SVGProps>;

    //
    // React Nodes
    // http://facebook.github.io/react/docs/glossary.html
    // ----------------------------------------------------------------------

    type ReactText = string | number;
    type ReactChild = ReactElement<any> | ReactText;

    // Should be Array<ReactNode> but type aliases cannot be recursive
    type ReactFragment = {} | Array<ReactChild | any[] | boolean>;
    type ReactNode = ReactChild | ReactFragment | boolean;

    //
    // Top Level API
    // ----------------------------------------------------------------------

    function createClass<P, S>(spec: ComponentSpec<P, S>): ClassicComponentClass<P>;

    function createFactory<P>(type: string): DOMFactory<P>;
    function createFactory<P>(type: ClassicComponentClass<P>): ClassicFactory<P>;
    function createFactory<P>(type: ComponentClass<P> | StatelessComponent<P>): Factory<P>;

    function createElement<P>(
        type: string,
        props?: P,
        ...children: ReactNode[]): DOMElement<P>;
    function createElement<P>(
        type: ClassicComponentClass<P>,
        props?: P,
        ...children: ReactNode[]): ClassicElement<P>;
    function createElement<P>(
        type: ComponentClass<P> | StatelessComponent<P>,
        props?: P,
        ...children: ReactNode[]): ReactElement<P>;

    function cloneElement<P>(
        element: DOMElement<P>,
        props?: P,
        ...children: ReactNode[]): DOMElement<P>;
    function cloneElement<P>(
        element: ClassicElement<P>,
        props?: P,
        ...children: ReactNode[]): ClassicElement<P>;
    function cloneElement<P>(
        element: ReactElement<P>,
        props?: P,
        ...children: ReactNode[]): ReactElement<P>;

    function isValidElement(object: {}): boolean;

    var DOM: ReactDOM;
    var PropTypes: ReactPropTypes;
    var Children: ReactChildren;

    //
    // Component API
    // ----------------------------------------------------------------------

    type ReactInstance = Component<any, any> | Element;

    // Base component for plain JS classes
    class Component<P, S> implements ComponentLifecycle<P, S> {
        constructor(props?: P, context?: any);
        setState(f: (prevState: S, props: P) => S, callback?: () => any): void;
        setState(state: S, callback?: () => any): void;
        forceUpdate(callBack?: () => any): void;
        render(): JSX.Element;
        props: P;
        state: S;
        context: {};
        refs: {
            [key: string]: ReactInstance
        };
    }

    interface ClassicComponent<P, S> extends Component<P, S> {
        replaceState(nextState: S, callback?: () => any): void;
        isMounted(): boolean;
        getInitialState?(): S;
    }

    interface ChildContextProvider<CC> {
        getChildContext(): CC;
    }

    //
    // Class Interfaces
    // ----------------------------------------------------------------------

    interface StatelessComponent<P> {
        (props?: P, context?: any): ReactElement<any>;
        propTypes?: ValidationMap<P>;
        contextTypes?: ValidationMap<any>;
        defaultProps?: P;
    }

    interface ComponentClass<P> {
        new(props?: P, context?: any): Component<P, any>;
        propTypes?: ValidationMap<P>;
        contextTypes?: ValidationMap<any>;
        childContextTypes?: ValidationMap<any>;
        defaultProps?: P;
    }

    interface ClassicComponentClass<P> extends ComponentClass<P> {
        new(props?: P, context?: any): ClassicComponent<P, any>;
        getDefaultProps?(): P;
        displayName?: string;
    }

    //
    // Component Specs and Lifecycle
    // ----------------------------------------------------------------------

    interface ComponentLifecycle<P, S> {
        componentWillMount?(): void;
        componentDidMount?(): void;
        componentWillReceiveProps?(nextProps: P, nextContext: any): void;
        shouldComponentUpdate?(nextProps: P, nextState: S, nextContext: any): boolean;
        componentWillUpdate?(nextProps: P, nextState: S, nextContext: any): void;
        componentDidUpdate?(prevProps: P, prevState: S, prevContext: any): void;
        componentWillUnmount?(): void;
    }

    interface Mixin<P, S> extends ComponentLifecycle<P, S> {
        mixins?: Mixin<P, S>;
        statics?: {
            [key: string]: any;
        };

        displayName?: string;
        propTypes?: ValidationMap<any>;
        contextTypes?: ValidationMap<any>;
        childContextTypes?: ValidationMap<any>

        getDefaultProps?(): P;
        getInitialState?(): S;
    }

    interface ComponentSpec<P, S> extends Mixin<P, S> {
        render(): ReactElement<any>;

        [propertyName: string]: any;
    }

    //
    // Event System
    // ----------------------------------------------------------------------

    interface SyntheticEvent {
        bubbles: boolean;
        cancelable: boolean;
        currentTarget: EventTarget;
        defaultPrevented: boolean;
        eventPhase: number;
        isTrusted: boolean;
        nativeEvent: Event;
        preventDefault(): void;
        stopPropagation(): void;
        target: EventTarget;
        timeStamp: Date;
        type: string;
    }

    interface ClipboardEvent extends SyntheticEvent {
        clipboardData: DataTransfer;
    }

    interface CompositionEvent extends SyntheticEvent {
        data: string;
    }

    interface DragEvent extends SyntheticEvent {
        dataTransfer: DataTransfer;
    }

    interface FocusEvent extends SyntheticEvent {
        relatedTarget: EventTarget;
    }

    interface FormEvent extends SyntheticEvent {
    }

    interface KeyboardEvent extends SyntheticEvent {
        altKey: boolean;
        charCode: number;
        ctrlKey: boolean;
        getModifierState(key: string): boolean;
        key: string;
        keyCode: number;
        locale: string;
        location: number;
        metaKey: boolean;
        repeat: boolean;
        shiftKey: boolean;
        which: number;
    }

    interface MouseEvent extends SyntheticEvent {
        altKey: boolean;
        button: number;
        buttons: number;
        clientX: number;
        clientY: number;
        ctrlKey: boolean;
        getModifierState(key: string): boolean;
        metaKey: boolean;
        pageX: number;
        pageY: number;
        relatedTarget: EventTarget;
        screenX: number;
        screenY: number;
        shiftKey: boolean;
    }

    interface TouchEvent extends SyntheticEvent {
        altKey: boolean;
        changedTouches: TouchList;
        ctrlKey: boolean;
        getModifierState(key: string): boolean;
        metaKey: boolean;
        shiftKey: boolean;
        targetTouches: TouchList;
        touches: TouchList;
    }

    interface UIEvent extends SyntheticEvent {
        detail: number;
        view: AbstractView;
    }

    interface WheelEvent extends SyntheticEvent {
        deltaMode: number;
        deltaX: number;
        deltaY: number;
        deltaZ: number;
    }

    //
    // Event Handler Types
    // ----------------------------------------------------------------------

    interface EventHandler<E extends SyntheticEvent> {
        (event: E): void;
    }

    type ReactEventHandler = EventHandler<SyntheticEvent>;

    type ClipboardEventHandler = EventHandler<ClipboardEvent>;
    type CompositionEventHandler = EventHandler<CompositionEvent>;
    type DragEventHandler = EventHandler<DragEvent>;
    type FocusEventHandler = EventHandler<FocusEvent>;
    type FormEventHandler = EventHandler<FormEvent>;
    type KeyboardEventHandler = EventHandler<KeyboardEvent>;
    type MouseEventHandler = EventHandler<MouseEvent>;
    type TouchEventHandler = EventHandler<TouchEvent>;
    type UIEventHandler = EventHandler<UIEvent>;
    type WheelEventHandler = EventHandler<WheelEvent>;

    //
    // Props / DOM Attributes
    // ----------------------------------------------------------------------

    interface Props<T> {
        children?: ReactNode;
        key?: string | number;
        ref?: string | ((component: T) => any);
    }

    interface HTMLProps<T> extends HTMLAttributes, Props<T> {
    }

    interface SVGProps extends SVGAttributes, Props<SVGElement> {
    }

    interface DOMAttributes {
        dangerouslySetInnerHTML?: {
            __html: string;
        };

        // Clipboard Events
        onCopy?: ClipboardEventHandler;
        onCut?: ClipboardEventHandler;
        onPaste?: ClipboardEventHandler;

        // Composition Events
        onCompositionEnd?: CompositionEventHandler;
        onCompositionStart?: CompositionEventHandler;
        onCompositionUpdate?: CompositionEventHandler;

        // Focus Events
        onFocus?: FocusEventHandler;
        onBlur?: FocusEventHandler;

        // Form Events
        onChange?: FormEventHandler;
        onInput?: FormEventHandler;
        onSubmit?: FormEventHandler;

        // Image Events
        onLoad?: ReactEventHandler;
        onError?: ReactEventHandler; // also a Media Event

        // Keyboard Events
        onKeyDown?: KeyboardEventHandler;
        onKeyPress?: KeyboardEventHandler;
        onKeyUp?: KeyboardEventHandler;

        // Media Events
        onAbort?: ReactEventHandler;
        onCanPlay?: ReactEventHandler;
        onCanPlayThrough?: ReactEventHandler;
        onDurationChange?: ReactEventHandler;
        onEmptied?: ReactEventHandler;
        onEncrypted?: ReactEventHandler;
        onEnded?: ReactEventHandler;
        onLoadedData?: ReactEventHandler;
        onLoadedMetadata?: ReactEventHandler;
        onLoadStart?: ReactEventHandler;
        onPause?: ReactEventHandler;
        onPlay?: ReactEventHandler;
        onPlaying?: ReactEventHandler;
        onProgress?: ReactEventHandler;
        onRateChange?: ReactEventHandler;
        onSeeked?: ReactEventHandler;
        onSeeking?: ReactEventHandler;
        onStalled?: ReactEventHandler;
        onSuspend?: ReactEventHandler;
        onTimeUpdate?: ReactEventHandler;
        onVolumeChange?: ReactEventHandler;
        onWaiting?: ReactEventHandler;

        // MouseEvents
        onClick?: MouseEventHandler;
        onContextMenu?: MouseEventHandler;
        onDoubleClick?: MouseEventHandler;
        onDrag?: DragEventHandler;
        onDragEnd?: DragEventHandler;
        onDragEnter?: DragEventHandler;
        onDragExit?: DragEventHandler;
        onDragLeave?: DragEventHandler;
        onDragOver?: DragEventHandler;
        onDragStart?: DragEventHandler;
        onDrop?: DragEventHandler;
        onMouseDown?: MouseEventHandler;
        onMouseEnter?: MouseEventHandler;
        onMouseLeave?: MouseEventHandler;
        onMouseMove?: MouseEventHandler;
        onMouseOut?: MouseEventHandler;
        onMouseOver?: MouseEventHandler;
        onMouseUp?: MouseEventHandler;

        // Selection Events
        onSelect?: ReactEventHandler;

        // Touch Events
        onTouchCancel?: TouchEventHandler;
        onTouchEnd?: TouchEventHandler;
        onTouchMove?: TouchEventHandler;
        onTouchStart?: TouchEventHandler;

        // UI Events
        onScroll?: UIEventHandler;

        // Wheel Events
        onWheel?: WheelEventHandler;
    }

    // This interface is not complete. Only properties accepting
    // unitless numbers are listed here (see CSSProperty.js in React)
    interface CSSProperties {
        boxFlex?: number;
        boxFlexGroup?: number;
        columnCount?: number;
        flex?: number | string;
        flexGrow?: number;
        flexShrink?: number;
        fontWeight?: number | string;
        lineClamp?: number;
        lineHeight?: number | string;
        opacity?: number;
        order?: number;
        orphans?: number;
        widows?: number;
        zIndex?: number;
        zoom?: number;

        fontSize?: number | string;

        // SVG-related properties
        fillOpacity?: number;
        strokeOpacity?: number;
        strokeWidth?: number;

        [propertyName: string]: any;
    }

    interface HTMLAttributes extends DOMAttributes {
        // React-specific Attributes
        defaultChecked?: boolean;
        defaultValue?: string | string[];

        // Standard HTML Attributes
        accept?: string;
        acceptCharset?: string;
        accessKey?: string;
        action?: string;
        allowFullScreen?: boolean;
        allowTransparency?: boolean;
        alt?: string;
        async?: boolean;
        autoComplete?: string;
        autoFocus?: boolean;
        autoPlay?: boolean;
        capture?: boolean;
        cellPadding?: number | string;
        cellSpacing?: number | string;
        charSet?: string;
        challenge?: string;
        checked?: boolean;
        classID?: string;
        className?: string;
        cols?: number;
        colSpan?: number;
        content?: string;
        contentEditable?: boolean;
        contextMenu?: string;
        controls?: boolean;
        coords?: string;
        crossOrigin?: string;
        data?: string;
        dateTime?: string;
        default?: boolean;
        defer?: boolean;
        dir?: string;
        disabled?: boolean;
        download?: any;
        draggable?: boolean;
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
        hidden?: boolean;
        high?: number;
        href?: string;
        hrefLang?: string;
        htmlFor?: string;
        httpEquiv?: string;
        icon?: string;
        id?: string;
        inputMode?: string;
        integrity?: string;
        is?: string;
        keyParams?: string;
        keyType?: string;
        kind?: string;
        label?: string;
        lang?: string;
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
        noValidate?: boolean;
        open?: boolean;
        optimum?: number;
        pattern?: string;
        placeholder?: string;
        poster?: string;
        preload?: string;
        radioGroup?: string;
        readOnly?: boolean;
        rel?: string;
        required?: boolean;
        role?: string;
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
        spellCheck?: boolean;
        src?: string;
        srcDoc?: string;
        srcLang?: string;
        srcSet?: string;
        start?: number;
        step?: number | string;
        style?: CSSProperties;
        summary?: string;
        tabIndex?: number;
        target?: string;
        title?: string;
        type?: string;
        useMap?: string;
        value?: string | string[];
        width?: number | string;
        wmode?: string;
        wrap?: string;

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
        autoCapitalize?: boolean;
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
        unselectable?: boolean;
    }

    interface SVGAttributes extends HTMLAttributes {
        clipPath?: string;
        cx?: number | string;
        cy?: number | string;
        d?: string;
        dx?: number | string;
        dy?: number | string;
        fill?: string;
        fillOpacity?: number | string;
        fontFamily?: string;
        fontSize?: number | string;
        fx?: number | string;
        fy?: number | string;
        gradientTransform?: string;
        gradientUnits?: string;
        markerEnd?: string;
        markerMid?: string;
        markerStart?: string;
        offset?: number | string;
        opacity?: number | string;
        patternContentUnits?: string;
        patternUnits?: string;
        points?: string;
        preserveAspectRatio?: string;
        r?: number | string;
        rx?: number | string;
        ry?: number | string;
        spreadMethod?: string;
        stopColor?: string;
        stopOpacity?: number | string;
        stroke?: string;
        strokeDasharray?: string;
        strokeLinecap?: string;
        strokeOpacity?: number | string;
        strokeWidth?: number | string;
        textAnchor?: string;
        transform?: string;
        version?: string;
        viewBox?: string;
        x1?: number | string;
        x2?: number | string;
        x?: number | string;
        xlinkActuate?: string;
        xlinkArcrole?: string;
        xlinkHref?: string;
        xlinkRole?: string;
        xlinkShow?: string;
        xlinkTitle?: string;
        xlinkType?: string;
        xmlBase?: string;
        xmlLang?: string;
        xmlSpace?: string;
        y1?: number | string;
        y2?: number | string
        y?: number | string;
    }

    //
    // React.DOM
    // ----------------------------------------------------------------------

    interface ReactDOM {
        // HTML
        a: HTMLFactory;
        abbr: HTMLFactory;
        address: HTMLFactory;
        area: HTMLFactory;
        article: HTMLFactory;
        aside: HTMLFactory;
        audio: HTMLFactory;
        b: HTMLFactory;
        base: HTMLFactory;
        bdi: HTMLFactory;
        bdo: HTMLFactory;
        big: HTMLFactory;
        blockquote: HTMLFactory;
        body: HTMLFactory;
        br: HTMLFactory;
        button: HTMLFactory;
        canvas: HTMLFactory;
        caption: HTMLFactory;
        cite: HTMLFactory;
        code: HTMLFactory;
        col: HTMLFactory;
        colgroup: HTMLFactory;
        data: HTMLFactory;
        datalist: HTMLFactory;
        dd: HTMLFactory;
        del: HTMLFactory;
        details: HTMLFactory;
        dfn: HTMLFactory;
        dialog: HTMLFactory;
        div: HTMLFactory;
        dl: HTMLFactory;
        dt: HTMLFactory;
        em: HTMLFactory;
        embed: HTMLFactory;
        fieldset: HTMLFactory;
        figcaption: HTMLFactory;
        figure: HTMLFactory;
        footer: HTMLFactory;
        form: HTMLFactory;
        h1: HTMLFactory;
        h2: HTMLFactory;
        h3: HTMLFactory;
        h4: HTMLFactory;
        h5: HTMLFactory;
        h6: HTMLFactory;
        head: HTMLFactory;
        header: HTMLFactory;
        hr: HTMLFactory;
        html: HTMLFactory;
        i: HTMLFactory;
        iframe: HTMLFactory;
        img: HTMLFactory;
        input: HTMLFactory;
        ins: HTMLFactory;
        kbd: HTMLFactory;
        keygen: HTMLFactory;
        label: HTMLFactory;
        legend: HTMLFactory;
        li: HTMLFactory;
        link: HTMLFactory;
        main: HTMLFactory;
        map: HTMLFactory;
        mark: HTMLFactory;
        menu: HTMLFactory;
        menuitem: HTMLFactory;
        meta: HTMLFactory;
        meter: HTMLFactory;
        nav: HTMLFactory;
        noscript: HTMLFactory;
        object: HTMLFactory;
        ol: HTMLFactory;
        optgroup: HTMLFactory;
        option: HTMLFactory;
        output: HTMLFactory;
        p: HTMLFactory;
        param: HTMLFactory;
        picture: HTMLFactory;
        pre: HTMLFactory;
        progress: HTMLFactory;
        q: HTMLFactory;
        rp: HTMLFactory;
        rt: HTMLFactory;
        ruby: HTMLFactory;
        s: HTMLFactory;
        samp: HTMLFactory;
        script: HTMLFactory;
        section: HTMLFactory;
        select: HTMLFactory;
        small: HTMLFactory;
        source: HTMLFactory;
        span: HTMLFactory;
        strong: HTMLFactory;
        style: HTMLFactory;
        sub: HTMLFactory;
        summary: HTMLFactory;
        sup: HTMLFactory;
        table: HTMLFactory;
        tbody: HTMLFactory;
        td: HTMLFactory;
        textarea: HTMLFactory;
        tfoot: HTMLFactory;
        th: HTMLFactory;
        thead: HTMLFactory;
        time: HTMLFactory;
        title: HTMLFactory;
        tr: HTMLFactory;
        track: HTMLFactory;
        u: HTMLFactory;
        ul: HTMLFactory;
        "var": HTMLFactory;
        video: HTMLFactory;
        wbr: HTMLFactory;

        // SVG
        svg: SVGFactory;
        circle: SVGFactory;
        defs: SVGFactory;
        ellipse: SVGFactory;
        g: SVGFactory;
        image: SVGFactory;
        line: SVGFactory;
        linearGradient: SVGFactory;
        mask: SVGFactory;
        path: SVGFactory;
        pattern: SVGFactory;
        polygon: SVGFactory;
        polyline: SVGFactory;
        radialGradient: SVGFactory;
        rect: SVGFactory;
        stop: SVGFactory;
        text: SVGFactory;
        tspan: SVGFactory;
    }

    //
    // React.PropTypes
    // ----------------------------------------------------------------------

    interface Validator<T> {
        (object: T, key: string, componentName: string): Error;
    }

    interface Requireable<T> extends Validator<T> {
        isRequired: Validator<T>;
    }

    interface ValidationMap<T> {
        [key: string]: Validator<T>;
    }

    interface ReactPropTypes {
        any: Requireable<any>;
        array: Requireable<any>;
        bool: Requireable<any>;
        func: Requireable<any>;
        number: Requireable<any>;
        object: Requireable<any>;
        string: Requireable<any>;
        node: Requireable<any>;
        element: Requireable<any>;
        instanceOf(expectedClass: {}): Requireable<any>;
        oneOf(types: any[]): Requireable<any>;
        oneOfType(types: Validator<any>[]): Requireable<any>;
        arrayOf(type: Validator<any>): Requireable<any>;
        objectOf(type: Validator<any>): Requireable<any>;
        shape(type: ValidationMap<any>): Requireable<any>;
    }

    //
    // React.Children
    // ----------------------------------------------------------------------

    interface ReactChildren {
        map<T>(children: ReactNode, fn: (child: ReactChild, index: number) => T): T[];
        forEach(children: ReactNode, fn: (child: ReactChild, index: number) => any): void;
        count(children: ReactNode): number;
        only(children: ReactNode): ReactChild;
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
}

declare module "react" {
    export = __React;
}

declare namespace JSX {
    import React = __React;

    interface Element extends React.ReactElement<any> { }
    interface ElementClass extends React.Component<any, any> {
        render(): JSX.Element;
    }
    interface ElementAttributesProperty { props: {}; }

    interface IntrinsicAttributes {
        key?: string | number;
    }

    interface IntrinsicClassAttributes<T> {
        ref?: string | ((classInstance: T) => void);
    }

    interface IntrinsicElements {
        // HTML
        a: React.HTMLProps<HTMLAnchorElement>;
        abbr: React.HTMLProps<HTMLElement>;
        address: React.HTMLProps<HTMLElement>;
        area: React.HTMLProps<HTMLAreaElement>;
        article: React.HTMLProps<HTMLElement>;
        aside: React.HTMLProps<HTMLElement>;
        audio: React.HTMLProps<HTMLAudioElement>;
        b: React.HTMLProps<HTMLElement>;
        base: React.HTMLProps<HTMLBaseElement>;
        bdi: React.HTMLProps<HTMLElement>;
        bdo: React.HTMLProps<HTMLElement>;
        big: React.HTMLProps<HTMLElement>;
        blockquote: React.HTMLProps<HTMLElement>;
        body: React.HTMLProps<HTMLBodyElement>;
        br: React.HTMLProps<HTMLBRElement>;
        button: React.HTMLProps<HTMLButtonElement>;
        canvas: React.HTMLProps<HTMLCanvasElement>;
        caption: React.HTMLProps<HTMLElement>;
        cite: React.HTMLProps<HTMLElement>;
        code: React.HTMLProps<HTMLElement>;
        col: React.HTMLProps<HTMLTableColElement>;
        colgroup: React.HTMLProps<HTMLTableColElement>;
        data: React.HTMLProps<HTMLElement>;
        datalist: React.HTMLProps<HTMLDataListElement>;
        dd: React.HTMLProps<HTMLElement>;
        del: React.HTMLProps<HTMLElement>;
        details: React.HTMLProps<HTMLElement>;
        dfn: React.HTMLProps<HTMLElement>;
        dialog: React.HTMLProps<HTMLElement>;
        div: React.HTMLProps<HTMLDivElement>;
        dl: React.HTMLProps<HTMLDListElement>;
        dt: React.HTMLProps<HTMLElement>;
        em: React.HTMLProps<HTMLElement>;
        embed: React.HTMLProps<HTMLEmbedElement>;
        fieldset: React.HTMLProps<HTMLFieldSetElement>;
        figcaption: React.HTMLProps<HTMLElement>;
        figure: React.HTMLProps<HTMLElement>;
        footer: React.HTMLProps<HTMLElement>;
        form: React.HTMLProps<HTMLFormElement>;
        h1: React.HTMLProps<HTMLHeadingElement>;
        h2: React.HTMLProps<HTMLHeadingElement>;
        h3: React.HTMLProps<HTMLHeadingElement>;
        h4: React.HTMLProps<HTMLHeadingElement>;
        h5: React.HTMLProps<HTMLHeadingElement>;
        h6: React.HTMLProps<HTMLHeadingElement>;
        head: React.HTMLProps<HTMLHeadElement>;
        header: React.HTMLProps<HTMLElement>;
        hr: React.HTMLProps<HTMLHRElement>;
        html: React.HTMLProps<HTMLHtmlElement>;
        i: React.HTMLProps<HTMLElement>;
        iframe: React.HTMLProps<HTMLIFrameElement>;
        img: React.HTMLProps<HTMLImageElement>;
        input: React.HTMLProps<HTMLInputElement>;
        ins: React.HTMLProps<HTMLModElement>;
        kbd: React.HTMLProps<HTMLElement>;
        keygen: React.HTMLProps<HTMLElement>;
        label: React.HTMLProps<HTMLLabelElement>;
        legend: React.HTMLProps<HTMLLegendElement>;
        li: React.HTMLProps<HTMLLIElement>;
        link: React.HTMLProps<HTMLLinkElement>;
        main: React.HTMLProps<HTMLElement>;
        map: React.HTMLProps<HTMLMapElement>;
        mark: React.HTMLProps<HTMLElement>;
        menu: React.HTMLProps<HTMLElement>;
        menuitem: React.HTMLProps<HTMLElement>;
        meta: React.HTMLProps<HTMLMetaElement>;
        meter: React.HTMLProps<HTMLElement>;
        nav: React.HTMLProps<HTMLElement>;
        noscript: React.HTMLProps<HTMLElement>;
        object: React.HTMLProps<HTMLObjectElement>;
        ol: React.HTMLProps<HTMLOListElement>;
        optgroup: React.HTMLProps<HTMLOptGroupElement>;
        option: React.HTMLProps<HTMLOptionElement>;
        output: React.HTMLProps<HTMLElement>;
        p: React.HTMLProps<HTMLParagraphElement>;
        param: React.HTMLProps<HTMLParamElement>;
        picture: React.HTMLProps<HTMLElement>;
        pre: React.HTMLProps<HTMLPreElement>;
        progress: React.HTMLProps<HTMLProgressElement>;
        q: React.HTMLProps<HTMLQuoteElement>;
        rp: React.HTMLProps<HTMLElement>;
        rt: React.HTMLProps<HTMLElement>;
        ruby: React.HTMLProps<HTMLElement>;
        s: React.HTMLProps<HTMLElement>;
        samp: React.HTMLProps<HTMLElement>;
        script: React.HTMLProps<HTMLElement>;
        section: React.HTMLProps<HTMLElement>;
        select: React.HTMLProps<HTMLSelectElement>;
        small: React.HTMLProps<HTMLElement>;
        source: React.HTMLProps<HTMLSourceElement>;
        span: React.HTMLProps<HTMLSpanElement>;
        strong: React.HTMLProps<HTMLElement>;
        style: React.HTMLProps<HTMLStyleElement>;
        sub: React.HTMLProps<HTMLElement>;
        summary: React.HTMLProps<HTMLElement>;
        sup: React.HTMLProps<HTMLElement>;
        table: React.HTMLProps<HTMLTableElement>;
        tbody: React.HTMLProps<HTMLTableSectionElement>;
        td: React.HTMLProps<HTMLTableDataCellElement>;
        textarea: React.HTMLProps<HTMLTextAreaElement>;
        tfoot: React.HTMLProps<HTMLTableSectionElement>;
        th: React.HTMLProps<HTMLTableHeaderCellElement>;
        thead: React.HTMLProps<HTMLTableSectionElement>;
        time: React.HTMLProps<HTMLElement>;
        title: React.HTMLProps<HTMLTitleElement>;
        tr: React.HTMLProps<HTMLTableRowElement>;
        track: React.HTMLProps<HTMLTrackElement>;
        u: React.HTMLProps<HTMLElement>;
        ul: React.HTMLProps<HTMLUListElement>;
        "var": React.HTMLProps<HTMLElement>;
        video: React.HTMLProps<HTMLVideoElement>;
        wbr: React.HTMLProps<HTMLElement>;

        // SVG
        svg: React.SVGProps;

        circle: React.SVGProps;
        defs: React.SVGProps;
        ellipse: React.SVGProps;
        g: React.SVGProps;
        image: React.SVGProps;
        line: React.SVGProps;
        linearGradient: React.SVGProps;
        mask: React.SVGProps;
        path: React.SVGProps;
        pattern: React.SVGProps;
        polygon: React.SVGProps;
        polyline: React.SVGProps;
        radialGradient: React.SVGProps;
        rect: React.SVGProps;
        stop: React.SVGProps;
        text: React.SVGProps;
        tspan: React.SVGProps;
    }
}
