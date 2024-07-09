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
var Component = /** @class */ (function () {
    function Component() {
        var _this = this;
        this.thumbYElementRef = function (ref) {
            typeof _this.props.thumbYProps.elementRef === 'function' && _this.props.thumbYProps.elementRef(ref);
            typeof (_this.props.thumbYProps.elementRef) === 'function' && _this.props.thumbYProps.elementRef(ref);
            typeof ((_this.props).thumbYProps.elementRef) === 'function' && _this.props.thumbYProps.elementRef(ref);
            typeof _this.props.thumbXProps.elementRef === 'function' && _this.props.thumbXProps.elementRef(ref);
            typeof _this.props.thumbXProps.elementRef === 'function' && (_this.props).thumbXProps.elementRef(ref);
            typeof _this.props.thumbXProps.elementRef === 'function' && (_this.props.thumbXProps).elementRef(ref);
            typeof _this.props.thumbXProps.elementRef === 'function' && ((_this.props).thumbXProps).elementRef(ref);
            typeof (_this.props.thumbXProps).elementRef === 'function' && ((_this.props).thumbXProps).elementRef(ref);
            typeof _this.props.thumbXProps.elementRef === 'function' && ((_this.props).thumbXProps).elementRef(ref);
        };
    }
    return Component;
}());
