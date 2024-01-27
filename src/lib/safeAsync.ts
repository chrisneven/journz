/**
 * Inspired by Zod's safeParse, transforms a promise into a promise that always resolves.
 * The resolution is an object that indicates whether the promise was fulfilled or rejected,
 * and contains the corresponding data or error.
 *
 * @param promise - The promise to handle.
 * @param errorExt - Additional information to augment the error object.
 * @returns A promise that resolves to an object with the operation status and data or error.
 */

type Success<T> = {
    data: T;
    success: true;
};

type Failure<U> = {
    error: U;
    success: false;
};

export function safeAsync<T, U extends Error = Error>(
    promise: Promise<T>,
    errorExt?: object
): Promise<Success<T> | Failure<U>> {
    return promise
        .then((data: T) => ({ success: true, data } as const))
        .catch((err: U) => {
            if (errorExt) {
                Object.assign(err, errorExt);
            }
            return { success: false, error: err } as const;
        });
}
