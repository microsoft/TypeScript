// Type definitions for React v0.14
// Project: http://facebook.github.io/react/
// Definitions by: Asana <https://asana.com>, AssureSign <http://www.assuresign.com>, Microsoft <https://microsoft.com>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare namespace __React {

    //
    // React Elements
    // ----------------------------------------------------------------------

    type ReactType = string | ComponentClass<any> | StatelessComponent<any>;

    type Key = string | number;
    type Ref<T> = string | ((instance: T) => any);
    type ComponentState = {} | void;

    interface Attributes {
        key?: Key;
    }
    interface ClassAttributes<T> extends Attributes {
        ref?: Ref<T>;
    }

    interface ReactElement<P> {
        type: string | ComponentClass<P> | SFC<P>;
        props: P;
        key?: Key;
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

    interface DOMElement<P extends DOMAttributes<T>, T extends Element> extends ReactElement<P> {
        type: string;
        ref: Ref<T>;
    }

    interface ReactHTMLElement<T extends HTMLElement> extends DOMElement<HTMLAttributes<T>, T> {
    }

    interface ReactSVGElement extends DOMElement<SVGAttributes<SVGElement>, SVGElement> {
    }

    //
    // Factories
    // ----------------------------------------------------------------------

    interface Factory<P> {
        (props?: P & Attributes, ...children: ReactNode[]): ReactElement<P>;
    }

    interface SFCFactory<P> {
        (props?: P & Attributes, ...children: ReactNode[]): SFCElement<P>;
    }

    interface ComponentFactory<P, T extends Component<P, ComponentState>> {
        (props?: P & ClassAttributes<T>, ...children: ReactNode[]): CElement<P, T>;
    }

    type CFactory<P, T extends Component<P, ComponentState>> = ComponentFactory<P, T>;
    type ClassicFactory<P> = CFactory<P, ClassicComponent<P, ComponentState>>;

    interface DOMFactory<P extends DOMAttributes<T>, T extends Element> {
        (props?: P & ClassAttributes<T>, ...children: ReactNode[]): DOMElement<P, T>;
    }

    interface HTMLFactory<T extends HTMLElement> extends DOMFactory<HTMLAttributes<T>, T> {
    }

    interface SVGFactory extends DOMFactory<SVGAttributes<SVGElement>, SVGElement> {
    }

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

    function createFactory<P extends DOMAttributes<T>, T extends Element>(
        type: string): DOMFactory<P, T>;
    function createFactory<P>(type: SFC<P>): SFCFactory<P>;
    function createFactory<P>(
        type: ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>>): CFactory<P, ClassicComponent<P, ComponentState>>;
    function createFactory<P, T extends Component<P, ComponentState>, C extends ComponentClass<P>>(
        type: ClassType<P, T, C>): CFactory<P, T>;
    function createFactory<P>(type: ComponentClass<P> | SFC<P>): Factory<P>;

    function createElement<P extends DOMAttributes<T>, T extends Element>(
        type: string,
        props?: P & ClassAttributes<T>,
        ...children: ReactNode[]): DOMElement<P, T>;
    function createElement<P>(
        type: SFC<P>,
        props?: P & Attributes,
        ...children: ReactNode[]): SFCElement<P>;
    function createElement<P>(
        type: ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>>,
        props?: P & ClassAttributes<ClassicComponent<P, ComponentState>>,
        ...children: ReactNode[]): CElement<P, ClassicComponent<P, ComponentState>>;
    function createElement<P, T extends Component<P, ComponentState>, C extends ComponentClass<P>>(
        type: ClassType<P, T, C>,
        props?: P & ClassAttributes<T>,
        ...children: ReactNode[]): CElement<P, T>;
    function createElement<P>(
        type: ComponentClass<P> | SFC<P>,
        props?: P & Attributes,
        ...children: ReactNode[]): ReactElement<P>;

    function cloneElement<P extends DOMAttributes<T>, T extends Element>(
        element: DOMElement<P, T>,
        props?: P & ClassAttributes<T>,
        ...children: ReactNode[]): DOMElement<P, T>;
    function cloneElement<P extends Q, Q>(
        element: SFCElement<P>,
        props?: Q, // should be Q & Attributes, but then Q is inferred as {}
        ...children: ReactNode[]): SFCElement<P>;
    function cloneElement<P extends Q, Q, T extends Component<P, ComponentState>>(
        element: CElement<P, T>,
        props?: Q, // should be Q & ClassAttributes<T>
        ...children: ReactNode[]): CElement<P, T>;
    function cloneElement<P extends Q, Q>(
        element: ReactElement<P>,
        props?: Q, // should be Q & Attributes
        ...children: ReactNode[]): ReactElement<P>;

    function isValidElement<P>(object: {}): object is ReactElement<P>;

    var DOM: ReactDOM;
    var PropTypes: ReactPropTypes;
    var Children: ReactChildren;
    var version: string;

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
        render(): JSX.Element | null;

        // React.Props<T> is now deprecated, which means that the `children`
        // property is not available on `P` by default, even though you can
        // always pass children as variadic arguments to `createElement`.
        // In the future, if we can define its call signature conditionally
        // on the existence of `children` in `P`, then we should remove this.
        props: P & { children?: ReactNode };
        state: S;
        context: {};
        refs: {
            [key: string]: ReactInstance
        };
    }

    class PureComponent<P, S> extends Component<P, S> {}

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

    type SFC<P> = StatelessComponent<P>;
    interface StatelessComponent<P> {
        (props: P & { children?: ReactNode }, context?: any): ReactElement<any>;
        propTypes?: ValidationMap<P>;
        contextTypes?: ValidationMap<any>;
        defaultProps?: P;
        displayName?: string;
    }

    interface ComponentClass<P> {
        new(props?: P, context?: any): Component<P, ComponentState>;
        propTypes?: ValidationMap<P>;
        contextTypes?: ValidationMap<any>;
        childContextTypes?: ValidationMap<any>;
        defaultProps?: P;
        displayName?: string;
    }

    interface ClassicComponentClass<P> extends ComponentClass<P> {
        new(props?: P, context?: any): ClassicComponent<P, ComponentState>;
        getDefaultProps?(): P;
    }

    /**
     * We use an intersection type to infer multiple type parameters from
     * a single argument, which is useful for many top-level API defs.
     * See https://github.com/Microsoft/TypeScript/issues/7234 for more info.
     */
    type ClassType<P, T extends Component<P, ComponentState>, C extends ComponentClass<P>> =
        C &
        (new() => T) &
        (new() => { props: P });

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
        childContextTypes?: ValidationMap<any>;

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
        target: EventTarget;
        timeStamp: Date;
        type: string;
    }

    interface ClipboardEvent<T> extends SyntheticEvent<T> {
        clipboardData: DataTransfer;
    }

    interface CompositionEvent<T> extends SyntheticEvent<T> {
        data: string;
    }

    interface DragEvent<T> extends MouseEvent<T> {
        dataTransfer: DataTransfer;
    }

    interface FocusEvent<T> extends SyntheticEvent<T> {
        relatedTarget: EventTarget;
    }

    interface FormEvent<T> extends SyntheticEvent<T> {
    }

    interface KeyboardEvent<T> extends SyntheticEvent<T> {
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

    interface MouseEvent<T> extends SyntheticEvent<T> {
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

    interface TouchEvent<T> extends SyntheticEvent<T> {
        altKey: boolean;
        changedTouches: TouchList;
        ctrlKey: boolean;
        getModifierState(key: string): boolean;
        metaKey: boolean;
        shiftKey: boolean;
        targetTouches: TouchList;
        touches: TouchList;
    }

    interface UIEvent<T> extends SyntheticEvent<T> {
        detail: number;
        view: AbstractView;
    }

    interface WheelEvent<T> extends MouseEvent<T> {
        deltaMode: number;
        deltaX: number;
        deltaY: number;
        deltaZ: number;
    }

    interface AnimationEvent extends SyntheticEvent<{}> {
        animationName: string;
        pseudoElement: string;
        elapsedTime: number;
    }

    interface TransitionEvent extends SyntheticEvent<{}> {
        propertyName: string;
        pseudoElement: string;
        elapsedTime: number;
    }

    //
    // Event Handler Types
    // ----------------------------------------------------------------------

    interface EventHandler<E extends SyntheticEvent<any>> {
        (event: E): void;
    }

    type ReactEventHandler<T> = EventHandler<SyntheticEvent<T>>;

    type ClipboardEventHandler<T> = EventHandler<ClipboardEvent<T>>;
    type CompositionEventHandler<T> = EventHandler<CompositionEvent<T>>;
    type DragEventHandler<T> = EventHandler<DragEvent<T>>;
    type FocusEventHandler<T> = EventHandler<FocusEvent<T>>;
    type FormEventHandler<T> = EventHandler<FormEvent<T>>;
    type KeyboardEventHandler<T> = EventHandler<KeyboardEvent<T>>;
    type MouseEventHandler<T> = EventHandler<MouseEvent<T>>;
    type TouchEventHandler<T> = EventHandler<TouchEvent<T>>;
    type UIEventHandler<T> = EventHandler<UIEvent<T>>;
    type WheelEventHandler<T> = EventHandler<WheelEvent<T>>;
    type AnimationEventHandler = EventHandler<AnimationEvent>;
    type TransitionEventHandler = EventHandler<TransitionEvent>;

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
     * var b: Button;
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

    interface HTMLProps<T> extends HTMLAttributes<T>, ClassAttributes<T> {
    }

    interface SVGProps extends SVGAttributes<SVGElement>, ClassAttributes<SVGElement> {
    }

    interface DOMAttributes<T> {
        children?: ReactNode;
        dangerouslySetInnerHTML?: {
            __html: string;
        };

        // Clipboard Events
        onCopy?: ClipboardEventHandler<T>;
        onCut?: ClipboardEventHandler<T>;
        onPaste?: ClipboardEventHandler<T>;

        // Composition Events
        onCompositionEnd?: CompositionEventHandler<T>;
        onCompositionStart?: CompositionEventHandler<T>;
        onCompositionUpdate?: CompositionEventHandler<T>;

        // Focus Events
        onFocus?: FocusEventHandler<T>;
        onBlur?: FocusEventHandler<T>;

        // Form Events
        onChange?: FormEventHandler<T>;
        onInput?: FormEventHandler<T>;
        onSubmit?: FormEventHandler<T>;

        // Image Events
        onLoad?: ReactEventHandler<T>;
        onError?: ReactEventHandler<T>; // also a Media Event

        // Keyboard Events
        onKeyDown?: KeyboardEventHandler<T>;
        onKeyPress?: KeyboardEventHandler<T>;
        onKeyUp?: KeyboardEventHandler<T>;

        // Media Events
        onAbort?: ReactEventHandler<T>;
        onCanPlay?: ReactEventHandler<T>;
        onCanPlayThrough?: ReactEventHandler<T>;
        onDurationChange?: ReactEventHandler<T>;
        onEmptied?: ReactEventHandler<T>;
        onEncrypted?: ReactEventHandler<T>;
        onEnded?: ReactEventHandler<T>;
        onLoadedData?: ReactEventHandler<T>;
        onLoadedMetadata?: ReactEventHandler<T>;
        onLoadStart?: ReactEventHandler<T>;
        onPause?: ReactEventHandler<T>;
        onPlay?: ReactEventHandler<T>;
        onPlaying?: ReactEventHandler<T>;
        onProgress?: ReactEventHandler<T>;
        onRateChange?: ReactEventHandler<T>;
        onSeeked?: ReactEventHandler<T>;
        onSeeking?: ReactEventHandler<T>;
        onStalled?: ReactEventHandler<T>;
        onSuspend?: ReactEventHandler<T>;
        onTimeUpdate?: ReactEventHandler<T>;
        onVolumeChange?: ReactEventHandler<T>;
        onWaiting?: ReactEventHandler<T>;

        // MouseEvents
        onClick?: MouseEventHandler<T>;
        onContextMenu?: MouseEventHandler<T>;
        onDoubleClick?: MouseEventHandler<T>;
        onDrag?: DragEventHandler<T>;
        onDragEnd?: DragEventHandler<T>;
        onDragEnter?: DragEventHandler<T>;
        onDragExit?: DragEventHandler<T>;
        onDragLeave?: DragEventHandler<T>;
        onDragOver?: DragEventHandler<T>;
        onDragStart?: DragEventHandler<T>;
        onDrop?: DragEventHandler<T>;
        onMouseDown?: MouseEventHandler<T>;
        onMouseEnter?: MouseEventHandler<T>;
        onMouseLeave?: MouseEventHandler<T>;
        onMouseMove?: MouseEventHandler<T>;
        onMouseOut?: MouseEventHandler<T>;
        onMouseOver?: MouseEventHandler<T>;
        onMouseUp?: MouseEventHandler<T>;

        // Selection Events
        onSelect?: ReactEventHandler<T>;

        // Touch Events
        onTouchCancel?: TouchEventHandler<T>;
        onTouchEnd?: TouchEventHandler<T>;
        onTouchMove?: TouchEventHandler<T>;
        onTouchStart?: TouchEventHandler<T>;

        // UI Events
        onScroll?: UIEventHandler<T>;

        // Wheel Events
        onWheel?: WheelEventHandler<T>;

        // Animation Events
        onAnimationStart?: AnimationEventHandler;
        onAnimationEnd?: AnimationEventHandler;
        onAnimationIteration?: AnimationEventHandler;

        // Transition Events
        onTransitionEnd?: TransitionEventHandler;
    }

    // This interface is not complete. Only properties accepting
    // unitless numbers are listed here (see CSSProperty.js in React)
    interface CSSProperties {

        /**
         * Aligns a flex container's lines within the flex container when there is extra space in the cross-axis, similar to how justify-content aligns individual items within the main-axis.
         */
        alignContent?: any;

        /**
         * Sets the default alignment in the cross axis for all of the flex container's items, including anonymous flex items, similarly to how justify-content aligns items along the main axis.
         */
        alignItems?: any;

        /**
         * Allows the default alignment to be overridden for individual flex items.
         */
        alignSelf?: any;

        /**
         * This property allows precise alignment of elements, such as graphics, that do not have a baseline-table or lack the desired baseline in their baseline-table. With the alignment-adjust property, the position of the baseline identified by the alignment-baseline can be explicitly determined. It also determines precisely the alignment point for each glyph within a textual element.
         */
        alignmentAdjust?: any;

        alignmentBaseline?: any;

        /**
         * Defines a length of time to elapse before an animation starts, allowing an animation to begin execution some time after it is applied.
         */
        animationDelay?: any;

        /**
         * Defines whether an animation should run in reverse on some or all cycles.
         */
        animationDirection?: any;

        /**
         * Specifies how many times an animation cycle should play.
         */
        animationIterationCount?: any;

        /**
         * Defines the list of animations that apply to the element.
         */
        animationName?: any;

        /**
         * Defines whether an animation is running or paused.
         */
        animationPlayState?: any;

        /**
         * Allows changing the style of any element to platform-based interface elements or vice versa.
         */
        appearance?: any;

        /**
         * Determines whether or not the “back” side of a transformed element is visible when facing the viewer.
         */
        backfaceVisibility?: any;

        /**
         * Shorthand property to set the values for one or more of:
         * background-clip, background-color, background-image,
         * background-origin, background-position, background-repeat,
         * background-size, and background-attachment.
         */
        background?: any;

        /**
         * If a background-image is specified, this property determines
         * whether that image's position is fixed within the viewport,
         * or scrolls along with its containing block.
         */
        backgroundAttachment?: "scroll" | "fixed" | "local";

        /**
         * This property describes how the element's background images should blend with each other and the element's background color.
         * The value is a list of blend modes that corresponds to each background image. Each element in the list will apply to the corresponding element of background-image. If a property doesn’t have enough comma-separated values to match the number of layers, the UA must calculate its used value by repeating the list of values until there are enough.
         */
        backgroundBlendMode?: any;

        /**
         * Sets the background color of an element.
         */
        backgroundColor?: any;

        backgroundComposite?: any;

        /**
         * Applies one or more background images to an element. These can be any valid CSS image, including url() paths to image files or CSS gradients.
         */
        backgroundImage?: any;

        /**
         * Specifies what the background-position property is relative to.
         */
        backgroundOrigin?: any;

        /**
         * Sets the position of a background image.
         */
        backgroundPosition?: any;

        /**
         * Background-repeat defines if and how background images will be repeated after they have been sized and positioned
         */
        backgroundRepeat?: any;

        /**
         * Obsolete - spec retired, not implemented.
         */
        baselineShift?: any;

        /**
         * Non standard. Sets or retrieves the location of the Dynamic HTML (DHTML) behavior.
         */
        behavior?: any;

        /**
         * Shorthand property that defines the different properties of all four sides of an element's border in a single declaration. It can be used to set border-width, border-style and border-color, or a subset of these.
         */
        border?: any;

        /**
         * Shorthand that sets the values of border-bottom-color,
         * border-bottom-style, and border-bottom-width.
         */
        borderBottom?: any;

        /**
         * Sets the color of the bottom border of an element.
         */
        borderBottomColor?: any;

        /**
         * Defines the shape of the border of the bottom-left corner.
         */
        borderBottomLeftRadius?: any;

        /**
         * Defines the shape of the border of the bottom-right corner.
         */
        borderBottomRightRadius?: any;

        /**
         * Sets the line style of the bottom border of a box.
         */
        borderBottomStyle?: any;

        /**
         * Sets the width of an element's bottom border. To set all four borders, use the border-width shorthand property which sets the values simultaneously for border-top-width, border-right-width, border-bottom-width, and border-left-width.
         */
        borderBottomWidth?: any;

        /**
         * Border-collapse can be used for collapsing the borders between table cells
         */
        borderCollapse?: any;

        /**
         * The CSS border-color property sets the color of an element's four borders. This property can have from one to four values, made up of the elementary properties:     •       border-top-color
         *      •       border-right-color
         *      •       border-bottom-color
         *      •       border-left-color The default color is the currentColor of each of these values.
         * If you provide one value, it sets the color for the element. Two values set the horizontal and vertical values, respectively. Providing three values sets the top, vertical, and bottom values, in that order. Four values set all for sides: top, right, bottom, and left, in that order.
         */
        borderColor?: any;

        /**
         * Specifies different corner clipping effects, such as scoop (inner curves), bevel (straight cuts) or notch (cut-off rectangles). Works along with border-radius to specify the size of each corner effect.
         */
        borderCornerShape?: any;

        /**
         * The property border-image-source is used to set the image to be used instead of the border style. If this is set to none the border-style is used instead.
         */
        borderImageSource?: any;

        /**
         * The border-image-width CSS property defines the offset to use for dividing the border image in nine parts, the top-left corner, central top edge, top-right-corner, central right edge, bottom-right corner, central bottom edge, bottom-left corner, and central right edge. They represent inward distance from the top, right, bottom, and left edges.
         */
        borderImageWidth?: any;

        /**
         * Shorthand property that defines the border-width, border-style and border-color of an element's left border in a single declaration. Note that you can use the corresponding longhand properties to set specific individual properties of the left border — border-left-width, border-left-style and border-left-color.
         */
        borderLeft?: any;

        /**
         * The CSS border-left-color property sets the color of an element's left border. This page explains the border-left-color value, but often you will find it more convenient to fix the border's left color as part of a shorthand set, either border-left or border-color.
         * Colors can be defined several ways. For more information, see Usage.
         */
        borderLeftColor?: any;

        /**
         * Sets the style of an element's left border. To set all four borders, use the shorthand property, border-style. Otherwise, you can set the borders individually with border-top-style, border-right-style, border-bottom-style, border-left-style.
         */
        borderLeftStyle?: any;

        /**
         * Sets the width of an element's left border. To set all four borders, use the border-width shorthand property which sets the values simultaneously for border-top-width, border-right-width, border-bottom-width, and border-left-width.
         */
        borderLeftWidth?: any;

        /**
         * Shorthand property that defines the border-width, border-style and border-color of an element's right border in a single declaration. Note that you can use the corresponding longhand properties to set specific individual properties of the right border — border-right-width, border-right-style and border-right-color.
         */
        borderRight?: any;

        /**
         * Sets the color of an element's right border. This page explains the border-right-color value, but often you will find it more convenient to fix the border's right color as part of a shorthand set, either border-right or border-color.
         * Colors can be defined several ways. For more information, see Usage.
         */
        borderRightColor?: any;

        /**
         * Sets the style of an element's right border. To set all four borders, use the shorthand property, border-style. Otherwise, you can set the borders individually with border-top-style, border-right-style, border-bottom-style, border-left-style.
         */
        borderRightStyle?: any;

        /**
         * Sets the width of an element's right border. To set all four borders, use the border-width shorthand property which sets the values simultaneously for border-top-width, border-right-width, border-bottom-width, and border-left-width.
         */
        borderRightWidth?: any;

        /**
         * Specifies the distance between the borders of adjacent cells.
         */
        borderSpacing?: any;

        /**
         * Sets the style of an element's four borders. This property can have from one to four values. With only one value, the value will be applied to all four borders; otherwise, this works as a shorthand property for each of border-top-style, border-right-style, border-bottom-style, border-left-style, where each border style may be assigned a separate value.
         */
        borderStyle?: any;

        /**
         * Shorthand property that defines the border-width, border-style and border-color of an element's top border in a single declaration. Note that you can use the corresponding longhand properties to set specific individual properties of the top border — border-top-width, border-top-style and border-top-color.
         */
        borderTop?: any;

        /**
         * Sets the color of an element's top border. This page explains the border-top-color value, but often you will find it more convenient to fix the border's top color as part of a shorthand set, either border-top or border-color.
         * Colors can be defined several ways. For more information, see Usage.
         */
        borderTopColor?: any;

        /**
         * Sets the rounding of the top-left corner of the element.
         */
        borderTopLeftRadius?: any;

        /**
         * Sets the rounding of the top-right corner of the element.
         */
        borderTopRightRadius?: any;

        /**
         * Sets the style of an element's top border. To set all four borders, use the shorthand property, border-style. Otherwise, you can set the borders individually with border-top-style, border-right-style, border-bottom-style, border-left-style.
         */
        borderTopStyle?: any;

        /**
         * Sets the width of an element's top border. To set all four borders, use the border-width shorthand property which sets the values simultaneously for border-top-width, border-right-width, border-bottom-width, and border-left-width.
         */
        borderTopWidth?: any;

        /**
         * Sets the width of an element's four borders. This property can have from one to four values. This is a shorthand property for setting values simultaneously for border-top-width, border-right-width, border-bottom-width, and border-left-width.
         */
        borderWidth?: any;

        /**
         * This property specifies how far an absolutely positioned box's bottom margin edge is offset above the bottom edge of the box's containing block. For relatively positioned boxes, the offset is with respect to the bottom edges of the box itself (i.e., the box is given a position in the normal flow, then offset from that position according to these properties).
         */
        bottom?: any;

        /**
         * Obsolete.
         */
        boxAlign?: any;

        /**
         * Breaks a box into fragments creating new borders, padding and repeating backgrounds or lets it stay as a continuous box on a page break, column break, or, for inline elements, at a line break.
         */
        boxDecorationBreak?: any;

        /**
         * Deprecated
         */
        boxDirection?: any;

        /**
         * Do not use. This property has been replaced by the flex-wrap property.
         * Gets or sets a value that specifies the direction to add successive rows or columns when the value of box-lines is set to multiple.
         */
        boxLineProgression?: any;

        /**
         * Do not use. This property has been replaced by the flex-wrap property.
         * Gets or sets a value that specifies whether child elements wrap onto multiple lines or columns based on the space available in the object.
         */
        boxLines?: any;

        /**
         * Do not use. This property has been replaced by flex-order.
         * Specifies the ordinal group that a child element of the object belongs to. This ordinal value identifies the display order (along the axis defined by the box-orient property) for the group.
         */
        boxOrdinalGroup?: any;

        /**
         * Deprecated.
         */
        boxFlex?: number;

        /**
         * Deprecated.
         */
        boxFlexGroup?: number;

        /**
         * The CSS break-after property allows you to force a break on multi-column layouts. More specifically, it allows you to force a break after an element. It allows you to determine if a break should occur, and what type of break it should be. The break-after CSS property describes how the page, column or region break behaves after the generated box. If there is no generated box, the property is ignored.
         */
        breakAfter?: any;

        /**
         * Control page/column/region breaks that fall above a block of content
         */
        breakBefore?: any;

        /**
         * Control page/column/region breaks that fall within a block of content
         */
        breakInside?: any;

        /**
         * The clear CSS property specifies if an element can be positioned next to or must be positioned below the floating elements that precede it in the markup.
         */
        clear?: any;

        /**
         * Deprecated; see clip-path.
         * Lets you specify the dimensions of an absolutely positioned element that should be visible, and the element is clipped into this shape, and displayed.
         */
        clip?: any;

        /**
         * Clipping crops an graphic, so that only a portion of the graphic is rendered, or filled. This clip-rule property, when used with the clip-path property, defines which clip rule, or algorithm, to use when filling the different parts of a graphics.
         */
        clipRule?: any;

        /**
         * The color property sets the color of an element's foreground content (usually text), accepting any standard CSS color from keywords and hex values to RGB(a) and HSL(a).
         */
        color?: any;

        /**
         * Describes the number of columns of the element.
         */
        columnCount?: number;

        /**
         * Specifies how to fill columns (balanced or sequential).
         */
        columnFill?: any;

        /**
         * The column-gap property controls the width of the gap between columns in multi-column elements.
         */
        columnGap?: any;

        /**
         * Sets the width, style, and color of the rule between columns.
         */
        columnRule?: any;

        /**
         * Specifies the color of the rule between columns.
         */
        columnRuleColor?: any;

        /**
         * Specifies the width of the rule between columns.
         */
        columnRuleWidth?: any;

        /**
         * The column-span CSS property makes it possible for an element to span across all columns when its value is set to all. An element that spans more than one column is called a spanning element.
         */
        columnSpan?: any;

        /**
         * Specifies the width of columns in multi-column elements.
         */
        columnWidth?: any;

        /**
         * This property is a shorthand property for setting column-width and/or column-count.
         */
        columns?: any;

        /**
         * The counter-increment property accepts one or more names of counters (identifiers), each one optionally followed by an integer which specifies the value by which the counter should be incremented (e.g. if the value is 2, the counter increases by 2 each time it is invoked).
         */
        counterIncrement?: any;

        /**
         * The counter-reset property contains a list of one or more names of counters, each one optionally followed by an integer (otherwise, the integer defaults to 0.) Each time the given element is invoked, the counters specified by the property are set to the given integer.
         */
        counterReset?: any;

        /**
         * The cue property specifies sound files (known as an "auditory icon") to be played by speech media agents before and after presenting an element's content; if only one file is specified, it is played both before and after. The volume at which the file(s) should be played, relative to the volume of the main element, may also be specified. The icon files may also be set separately with the cue-before and cue-after properties.
         */
        cue?: any;

        /**
         * The cue-after property specifies a sound file (known as an "auditory icon") to be played by speech media agents after presenting an element's content; the volume at which the file should be played may also be specified. The shorthand property cue sets cue sounds for both before and after the element is presented.
         */
        cueAfter?: any;

        /**
         * Specifies the mouse cursor displayed when the mouse pointer is over an element.
         */
        cursor?: any;

        /**
         * The direction CSS property specifies the text direction/writing direction. The rtl is used for Hebrew or Arabic text, the ltr is for other languages.
         */
        direction?: any;

        /**
         * This property specifies the type of rendering box used for an element. It is a shorthand property for many other display properties.
         */
        display?: any;

        /**
         * The ‘fill’ property paints the interior of the given graphical element. The area to be painted consists of any areas inside the outline of the shape. To determine the inside of the shape, all subpaths are considered, and the interior is determined according to the rules associated with the current value of the ‘fill-rule’ property. The zero-width geometric outline of a shape is included in the area to be painted.
         */
        fill?: any;

        /**
         * SVG: Specifies the opacity of the color or the content the current object is filled with.
         */
        fillOpacity?: number;

        /**
         * The ‘fill-rule’ property indicates the algorithm which is to be used to determine what parts of the canvas are included inside the shape. For a simple, non-intersecting path, it is intuitively clear what region lies "inside"; however, for a more complex path, such as a path that intersects itself or where one subpath encloses another, the interpretation of "inside" is not so obvious.
         * The ‘fill-rule’ property provides two options for how the inside of a shape is determined:
         */
        fillRule?: any;

        /**
         * Applies various image processing effects. This property is largely unsupported. See Compatibility section for more information.
         */
        filter?: any;

        /**
         * Shorthand for `flex-grow`, `flex-shrink`, and `flex-basis`.
         */
        flex?: number | string;

        /**
         * Obsolete, do not use. This property has been renamed to align-items.
         * Specifies the alignment (perpendicular to the layout axis defined by the flex-direction property) of child elements of the object.
         */
        flexAlign?: any;

        /**
         * The flex-basis CSS property describes the initial main size of the flex item before any free space is distributed according to the flex factors described in the flex property (flex-grow and flex-shrink).
         */
        flexBasis?: any;

        /**
         * The flex-direction CSS property describes how flex items are placed in the flex container, by setting the direction of the flex container's main axis.
         */
        flexDirection?: any;

        /**
         * The flex-flow CSS property defines the flex container's main and cross axis. It is a shorthand property for the flex-direction and flex-wrap properties.
         */
        flexFlow?: any;

        /**
         * Specifies the flex grow factor of a flex item.
         */
        flexGrow?: number;

        /**
         * Do not use. This property has been renamed to align-self
         * Specifies the alignment (perpendicular to the layout axis defined by flex-direction) of child elements of the object.
         */
        flexItemAlign?: any;

        /**
         * Do not use. This property has been renamed to align-content.
         * Specifies how a flexbox's lines align within the flexbox when there is extra space along the axis that is perpendicular to the axis defined by the flex-direction property.
         */
        flexLinePack?: any;

        /**
         * Gets or sets a value that specifies the ordinal group that a flexbox element belongs to. This ordinal value identifies the display order for the group.
         */
        flexOrder?: any;

        /**
         * Specifies the flex shrink factor of a flex item.
         */
        flexShrink?: number;

        /**
         * Elements which have the style float are floated horizontally. These elements can move as far to the left or right of the containing element. All elements after the floating element will flow around it, but elements before the floating element are not impacted. If several floating elements are placed after each other, they will float next to each other as long as there is room.
         */
        float?: any;

        /**
         * Flows content from a named flow (specified by a corresponding flow-into) through selected elements to form a dynamic chain of layout regions.
         */
        flowFrom?: any;

        /**
         * The font property is shorthand that allows you to do one of two things: you can either set up six of the most mature font properties in one line, or you can set one of a choice of keywords to adopt a system font setting.
         */
        font?: any;

        /**
         * The font-family property allows one or more font family names and/or generic family names to be specified for usage on the selected element(s)' text. The browser then goes through the list; for each character in the selection it applies the first font family that has an available glyph for that character.
         */
        fontFamily?: any;

        /**
         * The font-kerning property allows contextual adjustment of inter-glyph spacing, i.e. the spaces between the characters in text. This property controls <bold>metric kerning</bold> - that utilizes adjustment data contained in the font. Optical Kerning is not supported as yet.
         */
        fontKerning?: any;

        /**
         * Specifies the size of the font. Used to compute em and ex units.
         */
        fontSize?: number | string;

        /**
         * The font-size-adjust property adjusts the font-size of the fallback fonts defined with font-family, so that the x-height is the same no matter what font is used. This preserves the readability of the text when fallback happens.
         */
        fontSizeAdjust?: any;

        /**
         * Allows you to expand or condense the widths for a normal, condensed, or expanded font face.
         */
        fontStretch?: any;

        /**
         * The font-style property allows normal, italic, or oblique faces to be selected. Italic forms are generally cursive in nature while oblique faces are typically sloped versions of the regular face. Oblique faces can be simulated by artificially sloping the glyphs of the regular face.
         */
        fontStyle?: any;

        /**
         * This value specifies whether the user agent is allowed to synthesize bold or oblique font faces when a font family lacks bold or italic faces.
         */
        fontSynthesis?: any;

        /**
         * The font-variant property enables you to select the small-caps font within a font family.
         */
        fontVariant?: any;

        /**
         * Fonts can provide alternate glyphs in addition to default glyph for a character. This property provides control over the selection of these alternate glyphs.
         */
        fontVariantAlternates?: any;

        /**
         * Specifies the weight or boldness of the font.
         */
        fontWeight?: "normal" | "bold" | "lighter" | "bolder" | number;

        /**
         * Lays out one or more grid items bound by 4 grid lines. Shorthand for setting grid-column-start, grid-column-end, grid-row-start, and grid-row-end in a single declaration.
         */
        gridArea?: any;

        /**
         * Controls a grid item's placement in a grid area, particularly grid position and a grid span. Shorthand for setting grid-column-start and grid-column-end in a single declaration.
         */
        gridColumn?: any;

        /**
         * Controls a grid item's placement in a grid area as well as grid position and a grid span. The grid-column-end property (with grid-row-start, grid-row-end, and grid-column-start) determines a grid item's placement by specifying the grid lines of a grid item's grid area.
         */
        gridColumnEnd?: any;

        /**
         * Determines a grid item's placement by specifying the starting grid lines of a grid item's grid area . A grid item's placement in a grid area consists of a grid position and a grid span. See also ( grid-row-start, grid-row-end, and grid-column-end)
         */
        gridColumnStart?: any;

        /**
         * Gets or sets a value that indicates which row an element within a Grid should appear in. Shorthand for setting grid-row-start and grid-row-end in a single declaration.
         */
        gridRow?: any;

        /**
         * Determines a grid item’s placement by specifying the block-end. A grid item's placement in a grid area consists of a grid position and a grid span. The grid-row-end property (with grid-row-start, grid-column-start, and grid-column-end) determines a grid item's placement by specifying the grid lines of a grid item's grid area.
         */
        gridRowEnd?: any;

        /**
         * Specifies a row position based upon an integer location, string value, or desired row size.
         * css/properties/grid-row is used as short-hand for grid-row-position and grid-row-position
         */
        gridRowPosition?: any;

        gridRowSpan?: any;

        /**
         * Specifies named grid areas which are not associated with any particular grid item, but can be referenced from the grid-placement properties. The syntax of the grid-template-areas property also provides a visualization of the structure of the grid, making the overall layout of the grid container easier to understand.
         */
        gridTemplateAreas?: any;

        /**
         * Specifies (with grid-template-rows) the line names and track sizing functions of the grid. Each sizing function can be specified as a length, a percentage of the grid container’s size, a measurement of the contents occupying the column or row, or a fraction of the free space in the grid.
         */
        gridTemplateColumns?: any;

        /**
         * Specifies (with grid-template-columns) the line names and track sizing functions of the grid. Each sizing function can be specified as a length, a percentage of the grid container’s size, a measurement of the contents occupying the column or row, or a fraction of the free space in the grid.
         */
        gridTemplateRows?: any;

        /**
         * Sets the height of an element. The content area of the element height does not include the padding, border, and margin of the element.
         */
        height?: any;

        /**
         * Specifies the minimum number of characters in a hyphenated word
         */
        hyphenateLimitChars?: any;

        /**
         * Indicates the maximum number of successive hyphenated lines in an element. The ‘no-limit’ value means that there is no limit.
         */
        hyphenateLimitLines?: any;

        /**
         * Specifies the maximum amount of trailing whitespace (before justification) that may be left in a line before hyphenation is triggered to pull part of a word from the next line back up into the current one.
         */
        hyphenateLimitZone?: any;

        /**
         * Specifies whether or not words in a sentence can be split by the use of a manual or automatic hyphenation mechanism.
         */
        hyphens?: any;

        imeMode?: any;

        /**
         * Defines how the browser distributes space between and around flex items
         * along the main-axis of their container.
         */
        justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around";

        layoutGrid?: any;

        layoutGridChar?: any;

        layoutGridLine?: any;

        layoutGridMode?: any;

        layoutGridType?: any;

        /**
         * Sets the left edge of an element
         */
        left?: any;

        /**
         * The letter-spacing CSS property specifies the spacing behavior between text characters.
         */
        letterSpacing?: any;

        /**
         * Deprecated. Gets or sets line-breaking rules for text in selected languages such as Japanese, Chinese, and Korean.
         */
        lineBreak?: any;

        lineClamp?: number;

        /**
         * Specifies the height of an inline block level element.
         */
        lineHeight?: number | string;

        /**
         * Shorthand property that sets the list-style-type, list-style-position and list-style-image properties in one declaration.
         */
        listStyle?: any;

        /**
         * This property sets the image that will be used as the list item marker. When the image is available, it will replace the marker set with the 'list-style-type' marker. That also means that if the image is not available, it will show the style specified by list-style-property
         */
        listStyleImage?: any;

        /**
         * Specifies if the list-item markers should appear inside or outside the content flow.
         */
        listStylePosition?: any;

        /**
         * Specifies the type of list-item marker in a list.
         */
        listStyleType?: any;

        /**
         * The margin property is shorthand to allow you to set all four margins of an element at once. Its equivalent longhand properties are margin-top, margin-right, margin-bottom and margin-left. Negative values are also allowed.
         */
        margin?: any;

        /**
         * margin-bottom sets the bottom margin of an element.
         */
        marginBottom?: any;

        /**
         * margin-left sets the left margin of an element.
         */
        marginLeft?: any;

        /**
         * margin-right sets the right margin of an element.
         */
        marginRight?: any;

        /**
         * margin-top sets the top margin of an element.
         */
        marginTop?: any;

        /**
         * The marquee-direction determines the initial direction in which the marquee content moves.
         */
        marqueeDirection?: any;

        /**
         * The 'marquee-style' property determines a marquee's scrolling behavior.
         */
        marqueeStyle?: any;

        /**
         * This property is shorthand for setting mask-image, mask-mode, mask-repeat, mask-position, mask-clip, mask-origin, mask-composite and mask-size. Omitted values are set to their original properties' initial values.
         */
        mask?: any;

        /**
         * This property is shorthand for setting mask-border-source, mask-border-slice, mask-border-width, mask-border-outset, and mask-border-repeat. Omitted values are set to their original properties' initial values.
         */
        maskBorder?: any;

        /**
         * This property specifies how the images for the sides and the middle part of the mask image are scaled and tiled. The first keyword applies to the horizontal sides, the second one applies to the vertical ones. If the second keyword is absent, it is assumed to be the same as the first, similar to the CSS border-image-repeat property.
         */
        maskBorderRepeat?: any;

        /**
         * This property specifies inward offsets from the top, right, bottom, and left edges of the mask image, dividing it into nine regions: four corners, four edges, and a middle. The middle image part is discarded and treated as fully transparent black unless the fill keyword is present. The four values set the top, right, bottom and left offsets in that order, similar to the CSS border-image-slice property.
         */
        maskBorderSlice?: any;

        /**
         * Specifies an image to be used as a mask. An image that is empty, fails to download, is non-existent, or cannot be displayed is ignored and does not mask the element.
         */
        maskBorderSource?: any;

        /**
         * This property sets the width of the mask box image, similar to the CSS border-image-width property.
         */
        maskBorderWidth?: any;

        /**
         * Determines the mask painting area, which defines the area that is affected by the mask. The painted content of an element may be restricted to this area.
         */
        maskClip?: any;

        /**
         * For elements rendered as a single box, specifies the mask positioning area. For elements rendered as multiple boxes (e.g., inline boxes on several lines, boxes on several pages) specifies which boxes box-decoration-break operates on to determine the mask positioning area(s).
         */
        maskOrigin?: any;

        /**
         * This property must not be used. It is no longer included in any standard or standard track specification, nor is it implemented in any browser. It is only used when the text-align-last property is set to size. It controls allowed adjustments of font-size to fit line content.
         */
        maxFontSize?: any;

        /**
         * Sets the maximum height for an element. It prevents the height of the element to exceed the specified value. If min-height is specified and is greater than max-height, max-height is overridden.
         */
        maxHeight?: any;

        /**
         * Sets the maximum width for an element. It limits the width property to be larger than the value specified in max-width.
         */
        maxWidth?: any;

        /**
         * Sets the minimum height for an element. It prevents the height of the element to be smaller than the specified value. The value of min-height overrides both max-height and height.
         */
        minHeight?: any;

        /**
         * Sets the minimum width of an element. It limits the width property to be not smaller than the value specified in min-width.
         */
        minWidth?: any;

        /**
         * Specifies the transparency of an element.
         */
        opacity?: number;

        /**
         * Specifies the order used to lay out flex items in their flex container.
         * Elements are laid out in the ascending order of the order value.
         */
        order?: number;

        /**
         * In paged media, this property defines the minimum number of lines in
         * a block container that must be left at the bottom of the page.
         */
        orphans?: number;

        /**
         * The CSS outline property is a shorthand property for setting one or more of the individual outline properties outline-style, outline-width and outline-color in a single rule. In most cases the use of this shortcut is preferable and more convenient.
         * Outlines differ from borders in the following ways:  •       Outlines do not take up space, they are drawn above the content.
         *      •       Outlines may be non-rectangular. They are rectangular in Gecko/Firefox. Internet Explorer attempts to place the smallest contiguous outline around all elements or shapes that are indicated to have an outline. Opera draws a non-rectangular shape around a construct.
         */
        outline?: any;

        /**
         * The outline-color property sets the color of the outline of an element. An outline is a line that is drawn around elements, outside the border edge, to make the element stand out.
         */
        outlineColor?: any;

        /**
         * The outline-offset property offsets the outline and draw it beyond the border edge.
         */
        outlineOffset?: any;

        /**
         * The overflow property controls how extra content exceeding the bounding box of an element is rendered. It can be used in conjunction with an element that has a fixed width and height, to eliminate text-induced page distortion.
         */
        overflow?: any;

        /**
         * Specifies the preferred scrolling methods for elements that overflow.
         */
        overflowStyle?: any;

        /**
         * Controls how extra content exceeding the x-axis of the bounding box of an element is rendered.
         */
        overflowX?: any;

        /**
         * Controls how extra content exceeding the y-axis of the bounding box of an element is rendered.
         */
        overflowY?: any;

        /**
         * The padding optional CSS property sets the required padding space on one to four sides of an element. The padding area is the space between an element and its border. Negative values are not allowed but decimal values are permitted. The element size is treated as fixed, and the content of the element shifts toward the center as padding is increased.
         * The padding property is a shorthand to avoid setting each side separately (padding-top, padding-right, padding-bottom, padding-left).
         */
        padding?: any;

        /**
         * The padding-bottom CSS property of an element sets the padding space required on the bottom of an element. The padding area is the space between the content of the element and its border. Contrary to margin-bottom values, negative values of padding-bottom are invalid.
         */
        paddingBottom?: any;

        /**
         * The padding-left CSS property of an element sets the padding space required on the left side of an element. The padding area is the space between the content of the element and its border. Contrary to margin-left values, negative values of padding-left are invalid.
         */
        paddingLeft?: any;

        /**
         * The padding-right CSS property of an element sets the padding space required on the right side of an element. The padding area is the space between the content of the element and its border. Contrary to margin-right values, negative values of padding-right are invalid.
         */
        paddingRight?: any;

        /**
         * The padding-top CSS property of an element sets the padding space required on the top of an element. The padding area is the space between the content of the element and its border. Contrary to margin-top values, negative values of padding-top are invalid.
         */
        paddingTop?: any;

        /**
         * The page-break-after property is supported in all major browsers. With CSS3, page-break-* properties are only aliases of the break-* properties. The CSS3 Fragmentation spec defines breaks for all CSS box fragmentation.
         */
        pageBreakAfter?: any;

        /**
         * The page-break-before property sets the page-breaking behavior before an element. With CSS3, page-break-* properties are only aliases of the break-* properties. The CSS3 Fragmentation spec defines breaks for all CSS box fragmentation.
         */
        pageBreakBefore?: any;

        /**
         * Sets the page-breaking behavior inside an element. With CSS3, page-break-* properties are only aliases of the break-* properties. The CSS3 Fragmentation spec defines breaks for all CSS box fragmentation.
         */
        pageBreakInside?: any;

        /**
         * The pause property determines how long a speech media agent should pause before and after presenting an element. It is a shorthand for the pause-before and pause-after properties.
         */
        pause?: any;

        /**
         * The pause-after property determines how long a speech media agent should pause after presenting an element. It may be replaced by the shorthand property pause, which sets pause time before and after.
         */
        pauseAfter?: any;

        /**
         * The pause-before property determines how long a speech media agent should pause before presenting an element. It may be replaced by the shorthand property pause, which sets pause time before and after.
         */
        pauseBefore?: any;

        /**
         * The perspective property defines how far an element is placed from the view on the z-axis, from the screen to the viewer.
         * Perspective defines how an object is viewed. In graphic arts, perspective is the representation on a flat surface of what the viewer's eye would see in a 3D space. (See Wikipedia for more information about graphical perspective and for related illustrations.)
         * The illusion of perspective on a flat surface, such as a computer screen, is created by projecting points on the flat surface as they would appear if the flat surface were a window through which the viewer was looking at the object. In discussion of virtual environments, this flat surface is called a projection plane.
         */
        perspective?: any;

        /**
         * The perspective-origin property establishes the origin for the perspective property. It effectively sets the X and Y position at which the viewer appears to be looking at the children of the element.
         * When used with perspective, perspective-origin changes the appearance of an object, as if a viewer were looking at it from a different origin. An object appears differently if a viewer is looking directly at it versus looking at it from below, above, or from the side. Thus, the perspective-origin is like a vanishing point.
         * The default value of perspective-origin is 50% 50%. This displays an object as if the viewer's eye were positioned directly at the center of the screen, both top-to-bottom and left-to-right. A value of 0% 0% changes the object as if the viewer was looking toward the top left angle. A value of 100% 100% changes the appearance as if viewed toward the bottom right angle.
         */
        perspectiveOrigin?: any;

        /**
         * The pointer-events property allows you to control whether an element can be the target for the pointing device (e.g, mouse, pen) events.
         */
        pointerEvents?: any;

        /**
         * The position property controls the type of positioning used by an element within its parent elements. The effect of the position property depends on a lot of factors, for example the position property of parent elements.
         */
        position?: any;

        /**
         * Obsolete: unsupported.
         * This property determines whether or not a full-width punctuation mark character should be trimmed if it appears at the beginning of a line, so that its "ink" lines up with the first glyph in the line above and below.
         */
        punctuationTrim?: any;

        /**
         * Sets the type of quotation marks for embedded quotations.
         */
        quotes?: any;

        /**
         * Controls whether the last region in a chain displays additional 'overset' content according its default overflow property, or if it displays a fragment of content as if it were flowing into a subsequent region.
         */
        regionFragment?: any;

        /**
         * The rest-after property determines how long a speech media agent should pause after presenting an element's main content, before presenting that element's exit cue sound. It may be replaced by the shorthand property rest, which sets rest time before and after.
         */
        restAfter?: any;

        /**
         * The rest-before property determines how long a speech media agent should pause after presenting an intro cue sound for an element, before presenting that element's main content. It may be replaced by the shorthand property rest, which sets rest time before and after.
         */
        restBefore?: any;

        /**
         * Specifies the position an element in relation to the right side of the containing element.
         */
        right?: any;

        rubyAlign?: any;

        rubyPosition?: any;

        /**
         * Defines the alpha channel threshold used to extract a shape from an image. Can be thought of as a "minimum opacity" threshold; that is, a value of 0.5 means that the shape will enclose all the pixels that are more than 50% opaque.
         */
        shapeImageThreshold?: any;

        /**
         * A future level of CSS Shapes will define a shape-inside property, which will define a shape to wrap content within the element. See Editor's Draft <http://dev.w3.org/csswg/css-shapes/> and CSSWG wiki page on next-level plans <http://wiki.csswg.org/spec/css-shapes>
         */
        shapeInside?: any;

        /**
         * Adds a margin to a shape-outside. In effect, defines a new shape that is the smallest contour around all the points that are the shape-margin distance outward perpendicular to each point on the underlying shape. For points where a perpendicular direction is not defined (e.g., a triangle corner), takes all points on a circle centered at the point and with a radius of the shape-margin distance. This property accepts only non-negative values.
         */
        shapeMargin?: any;

        /**
         * Declares a shape around which text should be wrapped, with possible modifications from the shape-margin property. The shape defined by shape-outside and shape-margin changes the geometry of a float element's float area.
         */
        shapeOutside?: any;

        /**
         * The speak property determines whether or not a speech synthesizer will read aloud the contents of an element.
         */
        speak?: any;

        /**
         * The speak-as property determines how the speech synthesizer interprets the content: words as whole words or as a sequence of letters, numbers as a numerical value or a sequence of digits, punctuation as pauses in speech or named punctuation characters.
         */
        speakAs?: any;

        /**
         * SVG: Specifies the opacity of the outline on the current object.
         */
        strokeOpacity?: number;

        /**
         * SVG: Specifies the width of the outline on the current object.
         */
        strokeWidth?: number;

        /**
         * The tab-size CSS property is used to customise the width of a tab (U+0009) character.
         */
        tabSize?: any;

        /**
         * The 'table-layout' property controls the algorithm used to lay out the table cells, rows, and columns.
         */
        tableLayout?: any;

        /**
         * The text-align CSS property describes how inline content like text is aligned in its parent block element. text-align does not control the alignment of block elements itself, only their inline content.
         */
        textAlign?: any;

        /**
         * The text-align-last CSS property describes how the last line of a block element or a line before line break is aligned in its parent block element.
         */
        textAlignLast?: any;

        /**
         * The text-decoration CSS property is used to set the text formatting to underline, overline, line-through or blink.
         * underline and overline decorations are positioned under the text, line-through over it.
         */
        textDecoration?: any;

        /**
         * Sets the color of any text decoration, such as underlines, overlines, and strike throughs.
         */
        textDecorationColor?: any;

        /**
         * Sets what kind of line decorations are added to an element, such as underlines, overlines, etc.
         */
        textDecorationLine?: any;

        textDecorationLineThrough?: any;

        textDecorationNone?: any;

        textDecorationOverline?: any;

        /**
         * Specifies what parts of an element’s content are skipped over when applying any text decoration.
         */
        textDecorationSkip?: any;

        /**
         * This property specifies the style of the text decoration line drawn on the specified element. The intended meaning for the values are the same as those of the border-style-properties.
         */
        textDecorationStyle?: any;

        textDecorationUnderline?: any;

        /**
         * The text-emphasis property will apply special emphasis marks to the elements text. Slightly similar to the text-decoration property only that this property can have affect on the line-height. It also is noted that this is shorthand for text-emphasis-style and for text-emphasis-color.
         */
        textEmphasis?: any;

        /**
         * The text-emphasis-color property specifies the foreground color of the emphasis marks.
         */
        textEmphasisColor?: any;

        /**
         * The text-emphasis-style property applies special emphasis marks to an element's text.
         */
        textEmphasisStyle?: any;

        /**
         * This property helps determine an inline box's block-progression dimension, derived from the text-height and font-size properties for non-replaced elements, the height or the width for replaced elements, and the stacked block-progression dimension for inline-block elements. The block-progression dimension determines the position of the padding, border and margin for the element.
         */
        textHeight?: any;

        /**
         * Specifies the amount of space horizontally that should be left on the first line of the text of an element. This horizontal spacing is at the beginning of the first line and is in respect to the left edge of the containing block box.
         */
        textIndent?: any;

        textJustifyTrim?: any;

        textKashidaSpace?: any;

        /**
         * The text-line-through property is a shorthand property for text-line-through-style, text-line-through-color and text-line-through-mode. (Considered obsolete; use text-decoration instead.)
         */
        textLineThrough?: any;

        /**
         * Specifies the line colors for the line-through text decoration.
         * (Considered obsolete; use text-decoration-color instead.)
         */
        textLineThroughColor?: any;

        /**
         * Sets the mode for the line-through text decoration, determining whether the text decoration affects the space characters or not.
         * (Considered obsolete; use text-decoration-skip instead.)
         */
        textLineThroughMode?: any;

        /**
         * Specifies the line style for line-through text decoration.
         * (Considered obsolete; use text-decoration-style instead.)
         */
        textLineThroughStyle?: any;

        /**
         * Specifies the line width for the line-through text decoration.
         */
        textLineThroughWidth?: any;

        /**
         * The text-overflow shorthand CSS property determines how overflowed content that is not displayed is signaled to the users. It can be clipped, display an ellipsis ('…', U+2026 HORIZONTAL ELLIPSIS) or a Web author-defined string. It covers the two long-hand properties text-overflow-mode and text-overflow-ellipsis
         */
        textOverflow?: any;

        /**
         * The text-overline property is the shorthand for the text-overline-style, text-overline-width, text-overline-color, and text-overline-mode properties.
         */
        textOverline?: any;

        /**
         * Specifies the line color for the overline text decoration.
         */
        textOverlineColor?: any;

        /**
         * Sets the mode for the overline text decoration, determining whether the text decoration affects the space characters or not.
         */
        textOverlineMode?: any;

        /**
         * Specifies the line style for overline text decoration.
         */
        textOverlineStyle?: any;

        /**
         * Specifies the line width for the overline text decoration.
         */
        textOverlineWidth?: any;

        /**
         * The text-rendering CSS property provides information to the browser about how to optimize when rendering text. Options are: legibility, speed or geometric precision.
         */
        textRendering?: any;

        /**
         * Obsolete: unsupported.
         */
        textScript?: any;

        /**
         * The CSS text-shadow property applies one or more drop shadows to the text and <text-decorations> of an element. Each shadow is specified as an offset from the text, along with optional color and blur radius values.
         */
        textShadow?: any;

        /**
         * This property transforms text for styling purposes. (It has no effect on the underlying content.)
         */
        textTransform?: any;

        /**
         * Unsupported.
         * This property will add a underline position value to the element that has an underline defined.
         */
        textUnderlinePosition?: any;

        /**
         * After review this should be replaced by text-decoration should it not?
         * This property will set the underline style for text with a line value for underline, overline, and line-through.
         */
        textUnderlineStyle?: any;

        /**
         * This property specifies how far an absolutely positioned box's top margin edge is offset below the top edge of the box's containing block. For relatively positioned boxes, the offset is with respect to the top edges of the box itself (i.e., the box is given a position in the normal flow, then offset from that position according to these properties).
         */
        top?: any;

        /**
         * Determines whether touch input may trigger default behavior supplied by the user agent, such as panning or zooming.
         */
        touchAction?: any;

        /**
         * CSS transforms allow elements styled with CSS to be transformed in two-dimensional or three-dimensional space. Using this property, elements can be translated, rotated, scaled, and skewed. The value list may consist of 2D and/or 3D transform values.
         */
        transform?: any;

        /**
         * This property defines the origin of the transformation axes relative to the element to which the transformation is applied.
         */
        transformOrigin?: any;

        /**
         * This property allows you to define the relative position of the origin of the transformation grid along the z-axis.
         */
        transformOriginZ?: any;

        /**
         * This property specifies how nested elements are rendered in 3D space relative to their parent.
         */
        transformStyle?: any;

        /**
         * The transition CSS property is a shorthand property for transition-property, transition-duration, transition-timing-function, and transition-delay. It allows to define the transition between two states of an element.
         */
        transition?: any;

        /**
         * Defines when the transition will start. A value of ‘0s’ means the transition will execute as soon as the property is changed. Otherwise, the value specifies an offset from the moment the property is changed, and the transition will delay execution by that offset.
         */
        transitionDelay?: any;

        /**
         * The 'transition-duration' property specifies the length of time a transition animation takes to complete.
         */
        transitionDuration?: any;

        /**
         * The 'transition-property' property specifies the name of the CSS property to which the transition is applied.
         */
        transitionProperty?: any;

        /**
         * Sets the pace of action within a transition
         */
        transitionTimingFunction?: any;

        /**
         * The unicode-bidi CSS property specifies the level of embedding with respect to the bidirectional algorithm.
         */
        unicodeBidi?: any;

        /**
         * unicode-range allows you to set a specific range of characters to be downloaded from a font (embedded using @font-face) and made available for use on the current page.
         */
        unicodeRange?: any;

        /**
         * This is for all the high level UX stuff.
         */
        userFocus?: any;

        /**
         * For inputing user content
         */
        userInput?: any;

        /**
         * The vertical-align property controls how inline elements or text are vertically aligned compared to the baseline. If this property is used on table-cells it controls the vertical alignment of content of the table cell.
         */
        verticalAlign?: any;

        /**
         * The visibility property specifies whether the boxes generated by an element are rendered.
         */
        visibility?: any;

        /**
         * The voice-balance property sets the apparent position (in stereo sound) of the synthesized voice for spoken media.
         */
        voiceBalance?: any;

        /**
         * The voice-duration property allows the author to explicitly set the amount of time it should take a speech synthesizer to read an element's content, for example to allow the speech to be synchronized with other media. With a value of auto (the default) the length of time it takes to read the content is determined by the content itself and the voice-rate property.
         */
        voiceDuration?: any;

        /**
         * The voice-family property sets the speaker's voice used by a speech media agent to read an element. The speaker may be specified as a named character (to match a voice option in the speech reading software) or as a generic description of the age and gender of the voice. Similar to the font-family property for visual media, a comma-separated list of fallback options may be given in case the speech reader does not recognize the character name or cannot synthesize the requested combination of generic properties.
         */
        voiceFamily?: any;

        /**
         * The voice-pitch property sets pitch or tone (high or low) for the synthesized speech when reading an element; the pitch may be specified absolutely or relative to the normal pitch for the voice-family used to read the text.
         */
        voicePitch?: any;

        /**
         * The voice-range property determines how much variation in pitch or tone will be created by the speech synthesize when reading an element. Emphasized text, grammatical structures and punctuation may all be rendered as changes in pitch, this property determines how strong or obvious those changes are; large ranges are associated with enthusiastic or emotional speech, while small ranges are associated with flat or mechanical speech.
         */
        voiceRange?: any;

        /**
         * The voice-rate property sets the speed at which the voice synthesized by a speech media agent will read content.
         */
        voiceRate?: any;

        /**
         * The voice-stress property sets the level of vocal emphasis to be used for synthesized speech reading the element.
         */
        voiceStress?: any;

        /**
         * The voice-volume property sets the volume for spoken content in speech media. It replaces the deprecated volume property.
         */
        voiceVolume?: any;

        /**
         * The white-space property controls whether and how white space inside the element is collapsed, and whether lines may wrap at unforced "soft wrap" opportunities.
         */
        whiteSpace?: any;

        /**
         * Obsolete: unsupported.
         */
        whiteSpaceTreatment?: any;

        /**
         * In paged media, this property defines the mimimum number of lines
         * that must be left at the top of the second page.
         */
        widows?: number;

        /**
         * Specifies the width of the content area of an element. The content area of the element width does not include the padding, border, and margin of the element.
         */
        width?: any;

        /**
         * The word-break property is often used when there is long generated content that is strung together without and spaces or hyphens to beak apart. A common case of this is when there is a long URL that does not have any hyphens. This case could potentially cause the breaking of the layout as it could extend past the parent element.
         */
        wordBreak?: any;

        /**
         * The word-spacing CSS property specifies the spacing behavior between "words".
         */
        wordSpacing?: any;

        /**
         * An alias of css/properties/overflow-wrap, word-wrap defines whether to break words when the content exceeds the boundaries of its container.
         */
        wordWrap?: any;

        /**
         * Specifies how exclusions affect inline content within block-level elements. Elements lay out their inline content in their content area but wrap around exclusion areas.
         */
        wrapFlow?: any;

        /**
         * Set the value that is used to offset the inner wrap shape from other shapes. Inline content that intersects a shape with this property will be pushed by this shape's margin.
         */
        wrapMargin?: any;

        /**
         * Obsolete and unsupported. Do not use.
         * This CSS property controls the text when it reaches the end of the block in which it is enclosed.
         */
        wrapOption?: any;

        /**
         * writing-mode specifies if lines of text are laid out horizontally or vertically, and the direction which lines of text and blocks progress.
         */
        writingMode?: any;

        /**
         * The z-index property specifies the z-order of an element and its descendants.
         * When elements overlap, z-order determines which one covers the other.
         */
        zIndex?: "auto" | number;

        /**
         * Sets the initial zoom factor of a document defined by @viewport.
         */
        zoom?: "auto" | number;

        [propertyName: string]: any;
    }

    interface HTMLAttributes<T> extends DOMAttributes<T> {
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
        nonce?: string;
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
        reversed?: boolean;
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
        value?: string | string[] | number;
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
        unselectable?: boolean;
    }

    interface SVGAttributes<T> extends HTMLAttributes<T> {
        clipPath?: string;
        cx?: number | string;
        cy?: number | string;
        d?: string;
        dx?: number | string;
        dy?: number | string;
        fill?: string;
        fillOpacity?: number | string;
        fillRule?: string;
        fontFamily?: string;
        fontSize?: number | string;
        fx?: number | string;
        fy?: number | string;
        gradientTransform?: string;
        gradientUnits?: string;
        markerEnd?: string;
        markerMid?: string;
        markerStart?: string;
        mask?: string;
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
        strokeLinecap?: "butt" | "round" | "square" | "inherit";
        strokeLinejoin?: "miter" | "round" | "bevel" | "inherit";
        strokeMiterlimit?: string;
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
        y2?: number | string;
        y?: number | string;
    }

    //
    // React.DOM
    // ----------------------------------------------------------------------

    interface ReactDOM {
        // HTML
        a: HTMLFactory<HTMLAnchorElement>;
        abbr: HTMLFactory<HTMLElement>;
        address: HTMLFactory<HTMLElement>;
        area: HTMLFactory<HTMLAreaElement>;
        article: HTMLFactory<HTMLElement>;
        aside: HTMLFactory<HTMLElement>;
        audio: HTMLFactory<HTMLAudioElement>;
        b: HTMLFactory<HTMLElement>;
        base: HTMLFactory<HTMLBaseElement>;
        bdi: HTMLFactory<HTMLElement>;
        bdo: HTMLFactory<HTMLElement>;
        big: HTMLFactory<HTMLElement>;
        blockquote: HTMLFactory<HTMLElement>;
        body: HTMLFactory<HTMLBodyElement>;
        br: HTMLFactory<HTMLBRElement>;
        button: HTMLFactory<HTMLButtonElement>;
        canvas: HTMLFactory<HTMLCanvasElement>;
        caption: HTMLFactory<HTMLElement>;
        cite: HTMLFactory<HTMLElement>;
        code: HTMLFactory<HTMLElement>;
        col: HTMLFactory<HTMLTableColElement>;
        colgroup: HTMLFactory<HTMLTableColElement>;
        data: HTMLFactory<HTMLElement>;
        datalist: HTMLFactory<HTMLDataListElement>;
        dd: HTMLFactory<HTMLElement>;
        del: HTMLFactory<HTMLElement>;
        details: HTMLFactory<HTMLElement>;
        dfn: HTMLFactory<HTMLElement>;
        dialog: HTMLFactory<HTMLElement>;
        div: HTMLFactory<HTMLDivElement>;
        dl: HTMLFactory<HTMLDListElement>;
        dt: HTMLFactory<HTMLElement>;
        em: HTMLFactory<HTMLElement>;
        embed: HTMLFactory<HTMLEmbedElement>;
        fieldset: HTMLFactory<HTMLFieldSetElement>;
        figcaption: HTMLFactory<HTMLElement>;
        figure: HTMLFactory<HTMLElement>;
        footer: HTMLFactory<HTMLElement>;
        form: HTMLFactory<HTMLFormElement>;
        h1: HTMLFactory<HTMLHeadingElement>;
        h2: HTMLFactory<HTMLHeadingElement>;
        h3: HTMLFactory<HTMLHeadingElement>;
        h4: HTMLFactory<HTMLHeadingElement>;
        h5: HTMLFactory<HTMLHeadingElement>;
        h6: HTMLFactory<HTMLHeadingElement>;
        head: HTMLFactory<HTMLHeadElement>;
        header: HTMLFactory<HTMLElement>;
        hgroup: HTMLFactory<HTMLElement>;
        hr: HTMLFactory<HTMLHRElement>;
        html: HTMLFactory<HTMLHtmlElement>;
        i: HTMLFactory<HTMLElement>;
        iframe: HTMLFactory<HTMLIFrameElement>;
        img: HTMLFactory<HTMLImageElement>;
        input: HTMLFactory<HTMLInputElement>;
        ins: HTMLFactory<HTMLModElement>;
        kbd: HTMLFactory<HTMLElement>;
        keygen: HTMLFactory<HTMLElement>;
        label: HTMLFactory<HTMLLabelElement>;
        legend: HTMLFactory<HTMLLegendElement>;
        li: HTMLFactory<HTMLLIElement>;
        link: HTMLFactory<HTMLLinkElement>;
        main: HTMLFactory<HTMLElement>;
        map: HTMLFactory<HTMLMapElement>;
        mark: HTMLFactory<HTMLElement>;
        menu: HTMLFactory<HTMLElement>;
        menuitem: HTMLFactory<HTMLElement>;
        meta: HTMLFactory<HTMLMetaElement>;
        meter: HTMLFactory<HTMLElement>;
        nav: HTMLFactory<HTMLElement>;
        noscript: HTMLFactory<HTMLElement>;
        object: HTMLFactory<HTMLObjectElement>;
        ol: HTMLFactory<HTMLOListElement>;
        optgroup: HTMLFactory<HTMLOptGroupElement>;
        option: HTMLFactory<HTMLOptionElement>;
        output: HTMLFactory<HTMLElement>;
        p: HTMLFactory<HTMLParagraphElement>;
        param: HTMLFactory<HTMLParamElement>;
        picture: HTMLFactory<HTMLElement>;
        pre: HTMLFactory<HTMLPreElement>;
        progress: HTMLFactory<HTMLProgressElement>;
        q: HTMLFactory<HTMLQuoteElement>;
        rp: HTMLFactory<HTMLElement>;
        rt: HTMLFactory<HTMLElement>;
        ruby: HTMLFactory<HTMLElement>;
        s: HTMLFactory<HTMLElement>;
        samp: HTMLFactory<HTMLElement>;
        script: HTMLFactory<HTMLElement>;
        section: HTMLFactory<HTMLElement>;
        select: HTMLFactory<HTMLSelectElement>;
        small: HTMLFactory<HTMLElement>;
        source: HTMLFactory<HTMLSourceElement>;
        span: HTMLFactory<HTMLSpanElement>;
        strong: HTMLFactory<HTMLElement>;
        style: HTMLFactory<HTMLStyleElement>;
        sub: HTMLFactory<HTMLElement>;
        summary: HTMLFactory<HTMLElement>;
        sup: HTMLFactory<HTMLElement>;
        table: HTMLFactory<HTMLTableElement>;
        tbody: HTMLFactory<HTMLTableSectionElement>;
        td: HTMLFactory<HTMLTableDataCellElement>;
        textarea: HTMLFactory<HTMLTextAreaElement>;
        tfoot: HTMLFactory<HTMLTableSectionElement>;
        th: HTMLFactory<HTMLTableHeaderCellElement>;
        thead: HTMLFactory<HTMLTableSectionElement>;
        time: HTMLFactory<HTMLElement>;
        title: HTMLFactory<HTMLTitleElement>;
        tr: HTMLFactory<HTMLTableRowElement>;
        track: HTMLFactory<HTMLTrackElement>;
        u: HTMLFactory<HTMLElement>;
        ul: HTMLFactory<HTMLUListElement>;
        "var": HTMLFactory<HTMLElement>;
        video: HTMLFactory<HTMLVideoElement>;
        wbr: HTMLFactory<HTMLElement>;

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
        symbol: SVGFactory;
        text: SVGFactory;
        tspan: SVGFactory;
        use: SVGFactory;
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
}

declare module "react" {
    export = __React;
}

declare namespace JSX {
    import React = __React;

    interface Element extends React.ReactElement<any> { }
    interface ElementClass extends React.Component<any, any> {
        render(): JSX.Element | null;
    }
    interface ElementAttributesProperty { props: any; }

    interface ElementChildrenAttribute { children: any; }

    interface IntrinsicAttributes extends React.Attributes { }

    interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> { }

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
