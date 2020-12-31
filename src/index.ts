import { PromiseResolver } from './promise-resolver';

export default class AsyncOperationManager {
    private operationId: number;

    private operations: Map<number, PromiseResolver<any>> = new Map();

    public constructor(initialId: number = 0) {
        this.operationId = initialId;
    }

    public add<T>(): [id: number, promise: Promise<T>] {
        const id = this.operationId++;
        const resolver = new PromiseResolver<T>();
        this.operations.set(id, resolver);
        return [id, resolver.promise];
    }

    private getResolver(id: number): PromiseResolver<unknown> | null {
        if (!this.operations.has(id)) {
            return null;
        }

        const resolver = this.operations.get(id)!;
        this.operations.delete(id);
        return resolver;
    }

    public resolve<T>(id: number, result: T): boolean {
        const resolver = this.getResolver(id);
        if (resolver !== null) {
            resolver.resolve(result);
            return true;
        }
        return false;
    }

    public reject(id: number, reason: Error): boolean {
        const resolver = this.getResolver(id);
        if (resolver !== null) {
            resolver.reject(reason);
            return true;
        }
        return false;
    }
}

export * from './promise-resolver';
