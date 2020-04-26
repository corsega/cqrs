import Context from './Context';
import EventDispatcherOptions from './EventDispatcherOptions';
import EventDispatcherResponse from './EventDispatcherResponse';
import IEvent from './IEvent';
import IEventHandler from './IEventHandler';
import IEventHandlerMap from './IEventHandlerMap';
import Reflection from './Reflection';

const reflection = new Reflection();

export class EventDispatcher {
  constructor(
    private eventHandlerMaps: IEventHandlerMap[],
    private options: EventDispatcherOptions = new EventDispatcherOptions(),
  ) {}

  public async dispatch(event: IEvent, responseClass: typeof EventDispatcherResponse = EventDispatcherResponse) {
    const response = new responseClass();

    const eventMap = this.findEventMap(event);

    if (!eventMap) {
      return response;
    }

    for (const key in eventMap.handlers) {
      if (eventMap.handlers[key]) {
        response[reflection.getClassName(eventMap.handlers[key])] = await this.handle(event, eventMap.handlers[key]);
      }
    }

    return response;
  }

  protected handle = (event: IEvent, handler: IEventHandler) => {
    return handler.handle(event, this.getContext());
  };

  private getContext(): Context {
    return this.options.context().setDispatcher(this);
  }

  private getMaps() {
    return this.eventHandlerMaps;
  }

  private findEventMap(event: IEvent) {
    return this.getMaps().filter((map) => reflection.hasSameClassName(map.event, event))[0] || null;
  }
}

export default EventDispatcher;
