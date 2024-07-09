declare module _ {
    interface Collection<T> { }
    interface List<T> extends Collection<T> {
        [index: number]: T;
        length: number;
    }

    interface ListIterator<T, TResult> {
        (value: T, index: number, list: T[]): TResult;
    }

    interface Dictionary<T> extends Collection<T> {
        [index: string]: T;
    }
    export function pluck<T extends {}>(
        list: Collection<T>,
        propertyName: string): any[];

    export function map<T, TResult>(
        list: List<T>,
        iterator: ListIterator<T, TResult>,
        context?: any): TResult[];

    export function first<T>(array: List<T>): T;
}

declare class View {
    model: any;
}

interface IData {
    series: ISeries[];
}

interface ISeries {
    items: any[];
    key: string;
}

class MyView extends View {
    public getDataSeries(): ISeries[] {
        var data: IData[] = this.model.get("data");
        var allSeries: ISeries[][] = _.pluck(data, "series");

        return _.map(allSeries, _.first);
    }
}
