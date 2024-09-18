import { delay, isRetryableError } from './utils';

export async function withRetry(requestFn, retries, delayTime = 1000) {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            return await requestFn();
        } catch (error) {
            if (attempt < retries && isRetryableError(error.response?.status)) {
                await delay(delayTime * Math.pow(2, attempt)); // Exponential backoff
            } else {
                throw error;
            }
        }
    }
}
