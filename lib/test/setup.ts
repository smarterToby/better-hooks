import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
globalThis.window = dom.window as never;
globalThis.document = dom.window.document;
globalThis.navigator = {
  userAgent: 'node.js',
} as never;
