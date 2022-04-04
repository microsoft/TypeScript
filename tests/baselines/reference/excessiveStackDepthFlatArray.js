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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
configureStore({
    middleware: __spreadArray([], defaultMiddleware, true)
});
var Component = function () {
    var categories = ['Fruit', 'Vegetables'];
    return (React.createElement("ul", null,
        React.createElement("li", null, "All"),
        categories.map(function (category) { return (React.createElement("li", { key: category }, category) // Error about 'key' only
        ); })));
};
