export type EventMap = HTMLElementEventMap & DocumentEventMap & WindowEventMap;

export type Target = EventTarget | null | undefined;

export type UseEventListener = <K extends keyof EventMap>(
  eventName: K,
  handler: (event: EventMap[K]) => void,
  element?: Target,
  options?: boolean | AddEventListenerOptions
) => void;
