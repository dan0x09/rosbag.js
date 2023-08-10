declare function nmerge<T>(key: (a: T, b: T) => number, ...iterables: Array<Iterator<T>>): {
    next: () => {
        done: boolean;
        value?: undefined;
    } | {
        value: T;
        done: boolean;
    };
};
export default nmerge;
//# sourceMappingURL=nmerge.d.ts.map