interface ConstructableA {
  new(): { somePropA: any };
}

interface IDirectiveLinkFn<TScope> {
    (scope: TScope): void;
}

interface IDirectivePrePost<TScope> {
    pre?: IDirectiveLinkFn<TScope>;
    post?: IDirectiveLinkFn<TScope>;
}

export let blah: IDirectiveLinkFn<number> | ConstructableA | IDirectivePrePost<number> = (x: string) => {}

export let ctor: IDirectiveLinkFn<number> | ConstructableA | IDirectivePrePost<number> = class {
    someUnaccountedProp: any;
}
