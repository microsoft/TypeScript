// @removeComments: true

class C {
    /*! remove pinned comment anywhere else */
    public foo(x: string, y: any)
    public foo(x: string, y: number) { }
}

var x = 10;

/*! remove pinned comment anywhere else */
declare var OData: any;