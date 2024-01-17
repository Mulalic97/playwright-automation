// Takes in any type T and returns it as Readonly<T>
export type Immutable<T> = T extends boolean | number | string | null | undefined
    ? T
    : T extends Array<infer U>
        ? ReadonlyArray<Immutable<U>>
        : T extends Map<infer K, infer V>
            ? ReadonlyMap<Immutable<K>, Immutable<V>>
            : T extends Set<infer S>
                ? ReadonlySet<Immutable<S>>
                : { readonly [P in keyof T]: Immutable<T[P]> };