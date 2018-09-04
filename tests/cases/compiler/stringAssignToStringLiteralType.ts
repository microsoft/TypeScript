interface IceCreamOptions {
    readonly cherry: "yes" | "no"
}
declare function iceCream(options: IceCreamOptions): void;
const options = { cherry: "yes" };
iceCream(options);
