// @strict: true
// @lib: esnext, dom
// @noEmit: true

type Query = (
  container: HTMLElement,
  ...args: any[]
) =>
  | Error
  | HTMLElement
  | HTMLElement[]
  | Promise<HTMLElement[]>
  | Promise<HTMLElement>
  | null;

interface Queries {
  [T: string]: Query;
}

type FindByText<T extends HTMLElement = HTMLElement> = (
  container: HTMLElement,
  text: string,
) => Promise<T>;

declare function findByLabelText<T extends HTMLElement = HTMLElement>(
  ...args: Parameters<FindByText<T>>
): ReturnType<FindByText<T>>;

const queries = {
  findByLabelText,
};

type MapQueries<Q extends Queries = typeof queries> = {
  [P in keyof Q]: Q[P];
};
