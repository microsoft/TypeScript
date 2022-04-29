// Repro from #12511

type HTML = { [K in 'div']: Block<HTML> };
type Block<P> = <T>(func: HTML) => {};

declare var h: HTML;
h.div(h);