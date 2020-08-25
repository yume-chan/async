import AsyncOperationManager, { PromiseResolver } from "../src";

describe('promise resolver', () => {
    test('resolve void', () => {
        const resolver = new PromiseResolver<void>();

        expect(resolver.state).toBe('running');

        resolver.resolve();

        expect(resolver.state).toBe('resolved');
        expect(resolver.promise).resolves.toBe(undefined);
    });

    test('resolve value', () => {
        const resolver = new PromiseResolver<number>();

        resolver.resolve(42);

        expect(resolver.state).toBe('resolved');
        expect(resolver.promise).resolves.toBe(42);
    });

    test('reject', () => {
        const resolver = new PromiseResolver<void>();

        const message = Date.now().toString();
        resolver.reject(new Error(message));

        expect(resolver.state).toBe('rejected');
        expect(resolver.promise).rejects.toHaveProperty('message', message);
    })
});

describe('async operation manager', () => {
    test('return value', () => {
        const manager = new AsyncOperationManager();
        expect(manager.add()).toStrictEqual([0, expect.any(Promise)]);
    });

    test('custom initial id', () => {
        const id = 65535;
        const manager = new AsyncOperationManager(id);
        expect(manager.add()).toStrictEqual([id, expect.any(Promise)]);
    })

    test('resolve', () => {
        const manager = new AsyncOperationManager();
        const [id, promise] = manager.add<number>();

        expect(manager.resolve(id, 42)).toBe(true);
        expect(promise).resolves.toBe(42);
    });

    test('resolve non-exist operation', () => {
        const manager = new AsyncOperationManager();
        expect(manager.resolve(0, 42)).toBe(false);
    });

    test('reject', () => {
        const manager = new AsyncOperationManager();

        const [id, promise] = manager.add<number>();

        const message = Date.now().toString();
        expect(manager.reject(id, new Error(message))).toBe(true);
        expect(promise).rejects.toHaveProperty('message', message);
    });

    test('reject non-exist operation', () => {
        const manager = new AsyncOperationManager();
        expect(manager.reject(0, new Error())).toBe(false);
    });
});
