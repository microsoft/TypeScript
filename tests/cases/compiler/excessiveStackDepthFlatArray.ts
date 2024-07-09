// @lib: es2019,dom
// @jsx: react

// @Filename: index.tsx
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
