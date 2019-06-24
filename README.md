# Async Operation Manager

This package contains utilities to manage RPC operations.

- [Async Operation Manager](#Async-Operation-Manager)
  - [PromiseResolver](#PromiseResolver)
  - [AsyncOperationManager](#AsyncOperationManager)

## PromiseResolver

``` ts
export type PromiseResolverState = 'running' | 'resolved' | 'rejected';

export class PromiseResolver<T> {
    readonly promise: Promise<T>;
    readonly state: PromiseResolverState;

    resolve(value?: T | PromiseLike<T>): void;
    reject(reason?: any): void;
}
```

C#, the origin of the async/await pattern, uses [`TaskCompletionSource`](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.taskcompletionsource-1) to manage `Task`s manually.

V8, the most commonly used JavaScript engine, uses `PromiseResolver` to manage `Promise`s manually.

But in JavaScript, we only have the `Promise` constructor, and there is no way to know the `Promise`'s state.

Now you can use this `PromiseResolver` class to create and manage `Promise`s more convinced.

``` ts
function delay(timeout: number): Promise<void> {
    const resolver = new PromiseResolver<void>();
    setTimeout(() => resolver.resolve(), timeout);
    return resolver.promise;
}
```

## AsyncOperationManager

``` ts
export interface AsyncOperationInfo<T> {
    id: number;
    promise: Promise<T>;
}

export default class AsyncOperationManager {
    add<T>(): AsyncOperationInfo<T>;

    resolve<T>(id: number, result: T): void;
    reject(id: number, reason: Error): void;
}
```

Assume you have an RPC service, every operation has an ID, and the remote will return the result with this ID.

`AsyncOperationManager` can help you manage the IDs and convert callbacks to `Promise`s.

``` ts
declare const MyService;
const manager = new AsyncOperationManager();

MyService.on('complete', (id: number, result: number) => {
    manager.resolve(id, result);
});

MyService.on('error', (id: number, message: string) => {
    manager.reject(id, new Error(message);
});

function callService(payload: number): Promise<number> {
    const { id, promise } = manager.add<number>();
    MyService.post({ id, payload });
    return promise;
}
```
