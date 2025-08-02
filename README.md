# 🧠 better-hooks

**A modern collection of reusable, fully typed React hooks.**

> Clean. Composable. Fully typed. Zero dependencies.

---

## ✨ Features

* ⚡️ **Typed from the core** – Built with TypeScript, with excellent inference
* 💡 **Simple APIs** – Follows the conventions of native React hooks
* 🧹 **Composable** – Designed to integrate seamlessly in real-world apps
* 🩸 **Lightweight** – No runtime dependencies, just hooks
* ✅ **Tested with Bun** – Ready for modern tooling

---

## 📦 Installation

```bash
bun add better-hooks
# or
pnpm add better-hooks
# or
yarn add better-hooks
# or
npm install better-hooks
```

> Requires React 16.8.0 or higher.

---

## 🧰 Available Hooks

| Hook                  | Description                                            |
|-----------------------|--------------------------------------------------------|
| `useBoolean`          | Manages a boolean state with toggle and set functions  |
| `useClipboard`        | Handles clipboard operations                           |
| `useClipboardHistory` | Tracks clipboard history for advanced use cases        |
| `useCounter`          | A simple counter hook with useful helpers              |
| `useDebounce`         | Debounces a value or function for performance          |
| `useEventListener`    | Attaches event listeners to DOM elements or window     |
| `useIsClient`         | Detects if the code is running on the client side      |
| `useIsMounted`        | Tracks whether a component is currently mounted        |
| `useLocalStorage`     | Manages state in localStorage with sync capabilities   |
| `usePrevious`         | Tracks the previous value of a state or prop           |
| `useSessionStorage`   | Manages state in sessionStorage with sync capabilities |
| `useStep`             | Manages step-based flows (e.g., wizards or forms)      |
| `useThrottle`         | Throttles a value or function for performance          |
| `useToggle`           | Simplified boolean state toggling                      |

> More hooks coming soon. Feel free to contribute or suggest new ones!

---

## 📚 Documentation

Documentation is being written using [Nextra](https://nextra.site/), coming soon.

---

## 🧐 Philosophy

> Hooks should be simple to use, easy to type, and never surprising.
