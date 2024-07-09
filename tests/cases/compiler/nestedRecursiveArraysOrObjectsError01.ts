type Style = StyleBase | StyleArray;
interface StyleArray extends Array<Style> {}
interface StyleBase {
    foo: string;
}

const blah: Style = [
    [[{
        foo: 'asdf',
        jj: 1 // intentional error
    }]]
];

