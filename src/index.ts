export type PromiseResolverState = 'running' | 'resolved' | 'rejected';

export class PromiseResolver<T>{
    private _promise: Promise<T>;
    public get promise(): Promise<T> { return this._promise; }

    private _resolve!: (value?: T | PromiseLike<T>) => void;
    private _reject!: (reason?: any) => void;

    private _state: PromiseResolverState = 'running';
    public get state(): PromiseResolverState { return this._state; }

    public constructor() {
        this._promise = new Promise<T>((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }

    public resolve(value?: T | PromiseLike<T>): void {
        this._resolve(value);
        this._state = 'resolved';
    }

    public reject(reason?: any): void {
        this._reject(reason);
        this._state = 'rejected';
    }
}

export interface AsyncOperationInfo<T> {
    id: number;

    promise: Promise<T>;
}

export default class AsyncOperationManager {
    private operationId: number;

    private operations: Map<number, PromiseResolver<any>> = new Map();

    public constructor(initialId: number = 0) {
        this.operationId = initialId;
    }

    public add<T>(): AsyncOperationInfo<T> {
        const id = this.operationId++;
        const resolver = new PromiseResolver<T>();
        this.operations.set(id, resolver);
        return { id, promise: resolver.promise };
    }

    private getResolver(id: number): PromiseResolver<unknown> | null {
        if (!this.operations.has(id)) {
            return null;
        }

        const resolver = this.operations.get(id)!;
        this.operations.delete(id);
        return resolver;
    }

    public resolve<T>(id: number, result: T): void {
        const resolver = this.getResolver(id);
        if (resolver !== null) {
            resolver.resolve(result);
        }
    }

    public reject(id: number, reason: Error): void {
        const resolver = this.getResolver(id);
        if (resolver !== null) {
            resolver.reject(reason);
        }
    }
}
