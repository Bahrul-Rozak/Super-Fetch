# SuperFetch

**SuperFetch** is an advanced HTTP client library designed to provide enhanced features over traditional libraries like `fetch` and `axios`. It includes capabilities such as caching, automatic retries, concurrency management, and interceptors for efficient and flexible data fetching.

## Features

- **Caching**: Cache responses to reduce redundant network requests.
- **Automatic Retries**: Retry failed requests with configurable backoff strategies.
- **Concurrency Management**: Manage and limit concurrent requests.
- **Interceptors**: Customize global request and response handling.

## Installation

### Direct Download

1. **Clone the Repository**

   Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Bahrul-Rozak/Super-Fetch.git
   cd Super-Fetch
   ```

2. **Build the Library**

   Install dependencies and build the library:

   ```bash
   npm install
   npm run build
   ```

   The built file will be available in the `dist/` folder.

3. **Include in Your Project**

   For browser usage, include the built script in your HTML:

   ```html
   <script src="path/to/superfetch.min.js"></script>
   ```

   For Node.js usage, require the built library:

   ```javascript
   const SuperFetch = require('./path/to/superfetch.min.js');
   ```

## Usage

### In the Browser

Here’s how to use SuperFetch with JSONPlaceholder in a browser environment:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SuperFetch Example</title>
    <script src="path/to/superfetch.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // Example GET request
            SuperFetch.get('https://jsonplaceholder.typicode.com/posts/1')
                .then(data => console.log('GET Data:', data))
                .catch(error => console.error('GET Error:', error));
            
            // Example POST request
            SuperFetch.post('https://jsonplaceholder.typicode.com/posts', {
                title: 'foo',
                body: 'bar',
                userId: 1
            })
                .then(response => console.log('POST Response:', response))
                .catch(error => console.error('POST Error:', error));
        });
    </script>
</head>
<body>
</body>
</html>
```

### In Node.js

Here’s how to use SuperFetch with JSONPlaceholder in a Node.js environment:

```javascript
const SuperFetch = require('./path/to/superfetch.min.js');

// Example GET request
SuperFetch.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(data => console.log('GET Data:', data))
    .catch(error => console.error('GET Error:', error));

// Example POST request
SuperFetch.post('https://jsonplaceholder.typicode.com/posts', {
    title: 'foo',
    body: 'bar',
    userId: 1
})
    .then(response => console.log('POST Response:', response))
    .catch(error => console.error('POST Error:', error));
```

## API Reference

### `SuperFetch.get(url, headers = {}, options = {})`

- **`url`**: The URL to send the GET request to.
- **`headers`**: Optional headers for the request.
- **`options`**: Optional settings such as query parameters.

**Returns**: A Promise resolving to the response data.

### `SuperFetch.post(url, body, headers = {}, options = {})`

- **`url`**: The URL to send the POST request to.
- **`body`**: The data to be sent in the request body.
- **`headers`**: Optional headers for the request.
- **`options`**: Optional settings.

**Returns**: A Promise resolving to the response data.

### `SuperFetch.put(url, body, headers = {}, options = {})`

- **`url`**: The URL to send the PUT request to.
- **`body`**: The data to be sent in the request body.
- **`headers`**: Optional headers for the request.
- **`options`**: Optional settings.

**Returns**: A Promise resolving to the response data.

### `SuperFetch.delete(url, headers = {}, options = {})`

- **`url`**: The URL to send the DELETE request to.
- **`headers`**: Optional headers for the request.
- **`options`**: Optional settings.

**Returns**: A Promise resolving to the response data.

## Configuration

### Global Settings

Configure global settings like timeout, retries, and caching in `config.js`:

```javascript
const config = {
  timeout: 5000, // Request timeout in milliseconds
  retries: 3,    // Number of retry attempts
  cacheTTL: 60000, // Cache time-to-live in milliseconds
  concurrencyLimit: 5 // Maximum concurrent requests
};

export default config;
```

## Interceptors

### Adding a Request Interceptor

```javascript
SuperFetch.addRequestInterceptor((url, options) => {
  // Modify URL or options before sending the request
  return { url, options };
});
```

### Adding a Response Interceptor

```javascript
SuperFetch.addResponseInterceptor(response => {
  // Modify the response data before returning it
  return response;
});
```

## Contributing

We welcome contributions! To contribute:

1. **Fork** the repository.
2. **Create** a new branch.
3. **Make** your changes and test thoroughly.
4. **Submit** a pull request with a description of your changes.

## License

SuperFetch is licensed under the MIT License. See the `LICENSE` file for more details.

