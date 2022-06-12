import { describe, expect, it } from '@jest/globals';

import { AsyncOperationManager } from "./async-operation-manager";

describe('AsyncOperationManager', () => {
    it('should return [id, promise]', () => {
        const manager = new AsyncOperationManager();
        expect(manager.add()).toStrictEqual([0, expect.any(Promise)]);
        expect(manager.add()).toStrictEqual([1, expect.any(Promise)]);
    });

    it('should accept custom start id', () => {
        const id = 65535;
        const manager = new AsyncOperationManager(id);
        expect(manager.add()).toStrictEqual([id, expect.any(Promise)]);
    });

    it('should be able to resolve an operation', () => {
        const manager = new AsyncOperationManager();
        const [id, promise] = manager.add<number>();

        expect(manager.resolve(id, 42)).toBe(true);
        expect(promise).resolves.toBe(42);
    });

    it('should return `false` when resolving a non-exist operation', () => {
        const manager = new AsyncOperationManager();
        expect(manager.resolve(0, 42)).toBe(false);
    });

    it('should be able to reject an operation', () => {
        const manager = new AsyncOperationManager();
        const [id, promise] = manager.add<number>();

        const message = Date.now().toString();
        expect(manager.reject(id, new Error(message))).toBe(true);
        expect(promise).rejects.toHaveProperty('message', message);
    });

    it('should return `false` when rejecting a non-exist operation', () => {
        const manager = new AsyncOperationManager();
        expect(manager.reject(0, new Error())).toBe(false);
    });
});
