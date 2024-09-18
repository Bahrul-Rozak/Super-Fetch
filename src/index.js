import config from './config';
import { withRetry } from './core/retry';
import { setCache, getCache } from './core/cache';
import ConcurrencyManager from './core/concurrency';
import { applyRequestInterceptors } from './interceptors/requestInterceptor';
import { applyResponseInterceptors } from './interceptors/responseInterceptor';

const concurrencyManager = new ConcurrencyManager(config.concurrencyLimit);

async function fetchWithTimeout(url, options, timeout) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    options.signal = controller.signal;
    try {
        const response = await fetch(url, options);
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
}

async function request(url, options = {}) {
    // Terapkan interceptor request
    const { url: finalUrl, options: finalOptions } = await applyRequestInterceptors(url, options);

    // Cek cache
    const cachedResponse = getCache(finalUrl);
    if (cachedResponse) {
        return cachedResponse;
    }

    const task = async () => {
        const response = await fetchWithTimeout(finalUrl, finalOptions, config.timeout);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        setCache(finalUrl, data, config.cacheTTL);

        // Terapkan interceptor response
        const finalResponse = await applyResponseInterceptors(data);

        return finalResponse;
    };

    // Gunakan retry dan concurrency
    return concurrencyManager.run(() => withRetry(task, config.retries));
}

export default {
    request,
    get(url, headers = {}, options = {}) {
        return request(url, { ...options, method: 'GET', headers });
    },
    post(url, body, headers = {}, options = {}) {
        return request(url, { ...options, method: 'POST', headers, body: JSON.stringify(body) });
    },
    put(url, body, headers = {}, options = {}) {
        return request(url, { ...options, method: 'PUT', headers, body: JSON.stringify(body) });
    },
    delete(url, headers = {}, options = {}) {
        return request(url, { ...options, method: 'DELETE', headers });
    }
};
