class X {
    private y = 0;
    public getSettings(keys: string[]): any {
        var ret: any;
        return ret.always(() => {
            this.y = 0;
        }).promise();
    }
}