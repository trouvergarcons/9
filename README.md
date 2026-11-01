# Weather API: AJAX with JSON Tutorial & Demo

This project demonstrates how to use **AJAX (Asynchronous JavaScript and XML)** with **JSON (JavaScript Object Notation)** to request data from a hypothetical weather API and dynamically display it on a web page without refreshing the browser.

---

## 📂 Project Structure

- [`index.html`](file:///c:/Users/natur/OneDrive/Desktop/9/index.html) — The HTML webpage structure (weather card, controls, tabbed JSON inspector).
- [`style.css`](file:///c:/Users/natur/OneDrive/Desktop/9/style.css) — Clean, modern styling with dark-mode aesthetic and responsive layout.
- [`app.js`](file:///c:/Users/natur/OneDrive/Desktop/9/app.js) — The core JavaScript demonstrating both `fetch()` (modern AJAX) and `XMLHttpRequest` (traditional AJAX), parsing JSON, and updating the DOM.
- [`weather.json`](file:///c:/Users/natur/OneDrive/Desktop/9/weather.json) — Sample hypothetical weather API response file in JSON format.

---

## 🚀 How to Run

You can open and test this project in any browser:

### Option A: Open directly in your browser
Double click [`index.html`](file:///c:/Users/natur/OneDrive/Desktop/9/index.html) to open it in Chrome, Edge, or Firefox.
> **Note:** Browsers enforce security (CORS) on `file:///` URLs which may block reading local files (`weather.json`). The demo includes built-in hypothetical endpoints (Tokyo, New York, London, Paris) that work immediately without a server!

### Option B: Using a local web server (Recommended)
If you want to test AJAX calls directly against the local `weather.json` file:
```bash
# Using Python
python -m http.server 8000

# Or using Node.js npx
npx serve .
```
Then visit `http://localhost:8000`.

---

## 🧠 Key Concepts: How AJAX + JSON Works

### 1. What is AJAX?
AJAX stands for **Asynchronous JavaScript and XML**. Despite the name, modern web development almost always uses **JSON** instead of XML because JSON is lightweight, fast, and directly maps to native JavaScript objects.

### 2. The AJAX Request Flow
1. **Trigger**: The user selects a city or clicks a button.
2. **Asynchronous Request**: JavaScript sends an HTTP `GET` request in the background. The page does not reload.
3. **Response**: The server responds with a JSON string (e.g., `{"temperature": 22, "condition": "Sunny"}`).
4. **Parsing**: JavaScript parses the JSON string into an Object:
   - Modern `fetch()`: `const data = await response.json();`
   - Classic `XHR`: `const data = JSON.parse(xhr.responseText);`
5. **DOM Manipulation**: JavaScript updates HTML elements using properties from the parsed object (e.g., `document.getElementById('temp').textContent = data.temperature`).
