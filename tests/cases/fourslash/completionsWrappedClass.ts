/// <reference path="fourslash.ts" />

////class Client {
////    private close() { }
////    public open() { }
////}
////type Wrap<T> = T &
////{
////    [K in Extract<keyof T, string> as `${K}Wrapped`]: T[K];
////};
////class Service {
////    method() {
////        let service = undefined as unknown as Wrap<Client>;
////        const { /*a*/ } = service;
////    }
////}

verify.completions({ marker: "a", exact: ["open", "openWrapped"] });
