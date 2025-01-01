// @strict: true
// @noEmit: true

type ComponentType<P> = (p: P) => any;
type ComponentProps<C> = C extends ComponentType<infer P> ? P : never;

type Attrs<P, A extends Partial<P>> = A;

interface StyledFunction<
  C extends ComponentType<any>,
  O extends object = {},
  A extends keyof any = never,
> {
  attrs<
    U,
    NewA extends Partial<ComponentProps<C> & U> & {
      [others: string]: any;
    } = {},
  >(
    attrs: Attrs<ComponentProps<C> & U, NewA>,
  ): StyledFunction<C, O & NewA, A | keyof NewA>;
}

interface StyledInterface {
  <C extends ComponentType<any>>(component: C): StyledFunction<C>;
}

declare const styled: StyledInterface;

interface BaseProps {
  as?: "select" | "input";
}

declare const Flex: (props: BaseProps) => null;

export const StyledSelect = styled(Flex).attrs({
  as: "select",
});
