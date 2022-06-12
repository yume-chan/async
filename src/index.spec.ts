import { describe, expect, it } from '@jest/globals';

import { AsyncOperationManager, delay, PromiseResolver } from './index';

describe('Index', () => {
    it('should export `AsyncOperationManager`', () => {
        expect(AsyncOperationManager).toBeDefined();
    });

    it('should export `delay`', () => {
        expect(delay).toBeDefined();
    });

    it('should export `PromiseResolver`', () => {
        expect(PromiseResolver).toBeDefined();
    });
});
