import { describe, expect, it } from '@jest/globals';

import { AsyncOperationManager, PromiseResolver } from './index';

describe('Index', () => {
    it('should export `AsyncOperationManager`', () => {
        expect(AsyncOperationManager).toBeDefined();
    });

    it('should export `PromiseResolver`', () => {
        expect(PromiseResolver).toBeDefined();
    });
});
