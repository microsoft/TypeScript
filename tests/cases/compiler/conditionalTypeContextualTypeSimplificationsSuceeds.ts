// @strict: true
// repro from https://github.com/Microsoft/TypeScript/issues/26395
interface Props {
    when: (value: string) => boolean;
}

function bad<P extends Props>(
    attrs: string extends keyof P ? { [K in keyof P]: P[K] } : { [K in keyof P]: P[K] }) { }
function good1<P extends Props>(
    attrs: string extends keyof P ? P : { [K in keyof P]: P[K] }) { }
function good2<P extends Props>(
    attrs: { [K in keyof P]: P[K] }) { }

bad({ when: value => false });
good1({ when: value => false });
good2({ when: value => false });