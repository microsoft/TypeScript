interface Example {
    /** Something generic */
    [p: string]: any;
    /** Something specific */
    property: number;
}

function example(e: Example) {
    console.log(e.property); // works, shows type and description on hover
    console.log(e.anything); // shows type of property but not description on hover
}