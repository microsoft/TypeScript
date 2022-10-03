interface Thing1 {
    a: number;
    self(): this;
}

interface Thing2 {
    b: number;
    me(): this;
}

type Thing3 = Thing1 & Thing2;
type Thing4 = Thing3 & string[];

function f1(t: Thing3) {
    t = t.self();
    t = t.me().self().me();
}

interface Thing5 extends Thing4 {
    c: string;
}

function f2(t: Thing5) {
    t = t.self();
    t = t.me().self().me();
}

interface Component {
    extend<T>(props: T): this & T;
}

interface Label extends Component {
    title: string;
}

function test(label: Label) {
    const extended = label.extend({ id: 67 }).extend({ tag: "hello" });
    extended.id;  // Ok
    extended.tag;  // Ok
}
