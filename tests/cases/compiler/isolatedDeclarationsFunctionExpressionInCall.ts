// @isolatedDeclarations: true
// @declaration: true

declare function observer<T>(fn: T): T;
declare function action<T>(fn: T): T;

export const Component = observer(() => {
  return "hello";
});

export const thing = action(function () {
  return Component;
});

export const arrowWithType = observer((): string => {
  return "typed";
});

export const functionWithType = action(function (): typeof Component {
  return Component;
});