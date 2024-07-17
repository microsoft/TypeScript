/// <reference path="fourslash.ts" />

// @strict: true
// @lib: esnext

//// interface ComponentOptions<Props> {
////   setup?: (props: Props) => void;
////   name?: string;
//// }
//// 
//// interface FunctionalComponent<P> {
////   (props: P): void;
//// }
//// 
//// type ConcreteComponent<Props> =
////   | ComponentOptions<Props>
////   | FunctionalComponent<Props>;
//// 
//// type Component<Props = {}> = ConcreteComponent<Props>;
//// 
//// type WithInstallPlugin = { _prefix?: string };
//// 
//// 
//// /**/
//// export function withInstall<C extends Component, T extends WithInstallPlugin>(
////   component: C | C[],
////   target?: T,
//// ): string {
////   const componentWithInstall = (target ?? component) as T;
////   const components = Array.isArray(component) ? component : [component];
//// 
////   const { name } = components[0];
////   if (name) {
////     return name;
////   }
//// 
////   return "";
//// }

verify.noErrors();

goTo.marker();
edit.insert("type C = Component['name']");

verify.noErrors();