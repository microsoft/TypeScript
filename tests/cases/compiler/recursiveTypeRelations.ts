// Repro from #14896

type Attributes<Keys extends keyof any> = {
    [Key in Keys]: string;
}

class Query<A extends Attributes<keyof A>> {
    multiply<B extends Attributes<keyof B>>(x: B): Query<A & B>;
}

// Repro from #14940

type ClassName<S> = keyof S;
type ClassNameMap<S> = { [K in keyof S]?: boolean }
type ClassNameObjectMap<S> = object & ClassNameMap<S>;
type ClassNameArg<S> = ClassName<S> | ClassNameObjectMap<S>;

export function css<S extends { [K in keyof S]: string }>(styles: S, ...classNames: ClassNameArg<S>[]): string {
  const args = classNames.map(arg => {
    if (arg == null) {
      return null;
    }
    if (typeof arg == "string") {
      return styles[arg];
    }
    if (typeof arg == "object") {
      return Object.keys(arg).reduce<ClassNameObject>((obj: ClassNameObject, key: keyof S) => {
        const exportedClassName = styles[key];
        obj[exportedClassName] = (arg as ClassNameMap<S>)[key]; 
        return obj;
      }, {});
    }
  });
  return "";
}
