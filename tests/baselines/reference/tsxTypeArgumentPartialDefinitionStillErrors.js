//// [file.tsx]
declare namespace JSX {
    interface Element {
        render(): Element | string | false;
    }
}

function SFC<T>(props: Record<string, T>) {
    return '';
}

<SFC<string> prop={1}></SFC>; // should error


//// [file.jsx]
function SFC(props) {
    return '';
}
<SFC prop={1}></SFC>; // should error
