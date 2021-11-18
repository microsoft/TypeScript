// @strict: true
type ElementRef = (element: HTMLElement | null) => void;

type ThumbProps = {
    elementRef?: ElementRef;
}

type ComponentProps = {
    thumbYProps?: ThumbProps;
    thumbXProps: ThumbProps;
}

type ThumbProps2 = {
    elementRef: ElementRef | null;
}

type ComponentProps2 = {
    thumbYProps: ThumbProps2 | null;
}

class Component {
    props!: ComponentProps;
    public thumbYElementRef = (ref: HTMLElement | null) => {
        typeof this.props.thumbYProps!.elementRef === 'function' && this.props.thumbYProps!.elementRef(ref);

        typeof (this.props.thumbYProps!.elementRef) === 'function' && this.props.thumbYProps!.elementRef(ref);

        typeof ((this.props).thumbYProps!.elementRef)! === 'function' && this.props.thumbYProps!.elementRef(ref);

        typeof this.props.thumbXProps.elementRef === 'function' && this.props.thumbXProps.elementRef(ref);

        typeof this.props.thumbXProps.elementRef === 'function' && (this.props).thumbXProps.elementRef(ref);

        typeof this.props.thumbXProps.elementRef === 'function' && (this.props.thumbXProps).elementRef(ref);

        typeof this.props.thumbXProps.elementRef === 'function' && ((this.props)!.thumbXProps)!.elementRef(ref);

        typeof (this.props.thumbXProps).elementRef === 'function' && ((this.props)!.thumbXProps)!.elementRef(ref);

        typeof this.props!.thumbXProps!.elementRef === 'function' && ((this.props)!.thumbXProps)!.elementRef(ref);
    };
}

class Component2 {
    props!: ComponentProps2;
    public thumbYElementRef = (ref: HTMLElement | null) => {
        typeof this.props.thumbYProps!.elementRef === 'function' && this.props.thumbYProps!.elementRef(ref);

        typeof (this.props.thumbYProps!.elementRef) === 'function' && this.props.thumbYProps!.elementRef(ref);

        typeof ((this.props).thumbYProps!.elementRef)! === 'function' && this.props.thumbYProps!.elementRef(ref);
    }
}