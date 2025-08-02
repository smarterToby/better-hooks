import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html lang="en"><body></body></html>', {
  url: 'http://localhost',
});

globalThis.window = dom.window as never;
globalThis.document = dom.window.document;
globalThis.navigator = { userAgent: 'node.js' } as never;
globalThis.localStorage = dom.window.localStorage;
globalThis.sessionStorage = dom.window.sessionStorage;
globalThis.navigator = dom.window.navigator;
globalThis.MouseEvent = dom.window.MouseEvent;
globalThis.Event = dom.window.Event;
globalThis.HTMLElement = dom.window.HTMLElement;
