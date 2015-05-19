//// [jsxReactApp.tsx]
declare module React {
    
    interface ComponentClass<P> { 
        new(props: any): Component<any, any>; 
        prototype: { props: P };
    }
        
    interface ReactCompositeElement<P extends ReactAttributes> {
        type: ComponentClass<P>;
        props?: P;
        key?: number | string;
        ref?: string;
    }
    
    interface ReactHtmlElement {
        type: string;
        props?: ReactAttributes;
        key?: number | string;
        ref?: string;
    }
    
    type ReactElement = ReactCompositeElement<any> | ReactHtmlElement;
    
    interface ReactElementArray extends Array<string | ReactElement | ReactElementArray> {
    
    }
    
    class Component<P extends ReactAttributes, S> {
        constructor(props: P, childen?: any[]);

        props: P;
        state: S;

        setState(state: S, callback?: () => void): void
        render(): ReactElement;
    }
    
    interface ReactAttributes {
        children?: ReactElementArray;
        key?: number | string;
        ref?: string;

        // Event Attributes

        dangerouslySetInnerHTML?: {
            __html: string;
        };
    }
    
    interface HTMLAttributes extends ReactAttributes {
        accept?: string;
        acceptCharset?: string;
        accessKey?: string;
        action?: string;
        allowFullScreen?: boolean;
        allowTransparency?: boolean;
        alt?: string;
        async?: boolean;
        autoComplete?: boolean;
        autoFocus?: boolean;
        autoPlay?: boolean;
        cellPadding?: number | string;
        cellSpacing?: number | string;
        charSet?: string;
        checked?: boolean;
        classID?: string;
        className?: string;
        cols?: number;
        colSpan?: number;
        content?: string;
        contentEditable?: boolean;
        contextMenu?: string;
        controls?: any;
        coords?: string;
        crossOrigin?: string;
        data?: string;
        dateTime?: string;
        defer?: boolean;
        dir?: string;
        disabled?: boolean;
        download?: any;
        draggable?: boolean;
        encType?: string;
        form?: string;
        formNoValidate?: boolean;
        frameBorder?: number | string;
        height?: number | string;
        hidden?: boolean;
        href?: string;
        hrefLang?: string;
        htmlFor?: string;
        httpEquiv?: string;
        icon?: string;
        id?: string;
        label?: string;
        lang?: string;
        list?: string;
        loop?: boolean;
        manifest?: string;
        max?: number | string;
        maxLength?: number;
        media?: string;
        mediaGroup?: string;
        method?: string;
        min?: number | string;
        multiple?: boolean;
        muted?: boolean;
        name?: string;
        noValidate?: boolean;
        open?: boolean;
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
        scrollLeft?: number;
        scrolling?: string;
        scrollTop?: number;
        seamless?: boolean;
        selected?: boolean;
        shape?: string;
        size?: number;
        sizes?: string;
        span?: number;
        spellCheck?: boolean;
        src?: string;
        srcDoc?: string;
        srcSet?: string;
        start?: number;
        step?: number | string;
        tabIndex?: number;
        target?: string;
        title?: string;
        type?: string;
        useMap?: string;
        value?: string;
        width?: number | string;
        wmode?: string;

        // Non-standard Attributes
        autoCapitalize?: boolean;
        autoCorrect?: boolean;
        property?: string;
        itemProp?: string;
        itemScope?: boolean;
        itemType?: string;
    }
    
    function createElement(type: string, props?: HTMLAttributes, ...rest: any[]): ReactHtmlElement;
    function createElement<P>(type: ComponentClass<P>, props?: P, ...rest: any[]): ReactCompositeElement<P>;
}

class TodoList extends React.Component<{ items: string[] },{}> {
    render(): React.ReactElement {
        return  <ul>{this.props.items.map(itemText => <li>{itemText}</li>)}</ul>;
    }
}

class TodoApp extends React.Component<{},{items?: string[]; text?: string}> {
    state = {items: [], text: ''};
    
    onChange = (e: any) => {
        this.setState({
            text: <string>e.target.value
        });
    }
    
    handleSubmit = (e: any) => {
        e.preventDefault();
        var nextItems = this.state.items.concat([this.state.text]);
        var nextText = '';
        this.setState({items: nextItems, text: nextText});
    }
    
    render(): React.ReactElement  {
        return (
            <div>
                <h3>TODO</h3>
                <TodoList items={this.state.items} />
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.onChange} value={this.state.text} />
                    <button>{'Add #' + (this.state.items.length + 1)}</button>
                </form>
            </div>
        );
    }
}


//// [jsxReactApp.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TodoList = (function (_super) {
    __extends(TodoList, _super);
    function TodoList() {
        _super.apply(this, arguments);
    }
    TodoList.prototype.render = function () {
        return ;
    };
    return TodoList;
})(React.Component);
var TodoApp = (function (_super) {
    __extends(TodoApp, _super);
    function TodoApp() {
        var _this = this;
        _super.apply(this, arguments);
        this.state = { items: [], text: '' };
        this.onChange = function (e) {
            _this.setState({
                text: e.target.value
            });
        };
        this.handleSubmit = function (e) {
            e.preventDefault();
            var nextItems = _this.state.items.concat([_this.state.text]);
            var nextText = '';
            _this.setState({ items: nextItems, text: nextText });
        };
    }
    TodoApp.prototype.render = function () {
        return ();
    };
    return TodoApp;
})(React.Component);
