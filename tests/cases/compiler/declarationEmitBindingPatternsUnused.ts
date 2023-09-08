// @declaration: true
// @target: esnext
// @skipLibCheck: false

function shouldNotKeep({ name: alias }: { name: string }) {

}

function shouldNotKeepButIsKept({ name: alias }: { name: string }) {
    return alias;
}

function shouldKeep({ name: alias }: { name: string }): typeof alias {
    return alias;
}
