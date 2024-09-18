const requestInterceptors = [];

export function addRequestInterceptor(interceptor) {
    requestInterceptors.push(interceptor);
}

export async function applyRequestInterceptors(url, options) {
    let updatedUrl = url;
    let updatedOptions = options;

    for (const interceptor of requestInterceptors) {
        ({ url: updatedUrl, options: updatedOptions } = await interceptor(updatedUrl, updatedOptions));
    }

    return { url: updatedUrl, options: updatedOptions };
}
