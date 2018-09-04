interface IDirectiveLinkFn<TScope> {
    (scope: TScope): void;
}

interface IDirectivePrePost<TScope> {
    pre?: IDirectiveLinkFn<TScope>;
    post?: IDirectiveLinkFn<TScope>;
}

export let blah: IDirectiveLinkFn<number> | IDirectivePrePost<number> = (x: string) => {}
