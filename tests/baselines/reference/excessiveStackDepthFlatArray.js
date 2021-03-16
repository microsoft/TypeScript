//// [index.tsx]
interface MiddlewareArray<T> extends Array<T> {}
declare function configureStore(options: { middleware: MiddlewareArray<any> }): void;

declare const defaultMiddleware: MiddlewareArray<any>;
configureStore({
  middleware: [...defaultMiddleware], // Should not error
});

declare namespace React {
  type DetailedHTMLProps<E extends HTMLAttributes<T>, T> = E;
  interface HTMLAttributes<T> {
    children?: ReactNode;
  }
  type ReactNode = ReactChild | ReactFragment | boolean | null | undefined;
  type ReactText = string | number;
  type ReactChild = ReactText;
  type ReactFragment = {} | ReactNodeArray;
  interface ReactNodeArray extends Array<ReactNode> {}
}
declare namespace JSX {
  interface IntrinsicElements {
    ul: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
    li: React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>;
  }
}
declare var React: any;

const Component = () => {
  const categories = ['Fruit', 'Vegetables'];

  return (
    <ul>
      <li>All</li>
      {categories.map((category) => (
        <li key={category}>{category}</li> // Error about 'key' only
      ))}
    </ul>
  );
};


//// [index.js]
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
configureStore({
    middleware: __spreadArray([], defaultMiddleware)
});
var Component = function () {
    var categories = ['Fruit', 'Vegetables'];
    return (React.createElement("ul", null,
        React.createElement("li", null, "All"),
        categories.map(function (category) { return (React.createElement("li", { key: category }, category) // Error about 'key' only
        ); })));
};
