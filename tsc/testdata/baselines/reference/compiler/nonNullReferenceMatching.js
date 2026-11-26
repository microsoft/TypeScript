//// [tests/cases/compiler/nonNullReferenceMatching.ts] ////

//// [nonNullReferenceMatching.ts]
type ElementRef = (element: HTMLElement | null) => void;

type ThumbProps = {
    elementRef?: ElementRef;
}

type ComponentProps = {
    thumbYProps?: ThumbProps;
    thumbXProps: ThumbProps;
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

//// [nonNullReferenceMatching.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
class Component {
    constructor() {
        this.thumbYElementRef = __setFunctionName((ref) => {
            typeof this.props.thumbYProps.elementRef === 'function' && this.props.thumbYProps.elementRef(ref);
            typeof (this.props.thumbYProps.elementRef) === 'function' && this.props.thumbYProps.elementRef(ref);
            typeof ((this.props).thumbYProps.elementRef) === 'function' && this.props.thumbYProps.elementRef(ref);
            typeof this.props.thumbXProps.elementRef === 'function' && this.props.thumbXProps.elementRef(ref);
            typeof this.props.thumbXProps.elementRef === 'function' && (this.props).thumbXProps.elementRef(ref);
            typeof this.props.thumbXProps.elementRef === 'function' && (this.props.thumbXProps).elementRef(ref);
            typeof this.props.thumbXProps.elementRef === 'function' && ((this.props).thumbXProps).elementRef(ref);
            typeof (this.props.thumbXProps).elementRef === 'function' && ((this.props).thumbXProps).elementRef(ref);
            typeof this.props.thumbXProps.elementRef === 'function' && ((this.props).thumbXProps).elementRef(ref);
        }, "thumbYElementRef");
    }
}
