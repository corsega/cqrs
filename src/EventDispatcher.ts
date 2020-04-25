import Context from './Context';
import EventDispatcherResponse from './EventDispatcherResponse';
import EventHandlerResponse from './EventHandlerResponse';
import IEvent from './IEvent';
import IEventHandler from './IEventHandler';
import IEventHandlerMap from './IEventHandlerMap';
import Reflection from './Reflection';
import EventDispatcherOptions from './EventDispatcherOptions';

const reflection = new Reflection();

export class EventDispatcher {
  constructor(
    private eventHandlerMaps: IEventHandlerMap[],
    private options: EventDispatcherOptions = new EventDispatcherOptions(),
  ) {}

  public async dispatch(event: IEvent): Promise<EventDispatcherResponse<EventHandlerResponse>> {
    const response = this.newResponse();

    const eventMap = this.findEventMap(event);

    if (!eventMap) {
      return response;
    }

    for (const key in eventMap.handlers) {
      if (eventMap.handlers[key]) {
        response[reflection.getClassName(eventMap.handlers[key])] = this.newHandlerResponse(
          await this.handle(event, eventMap.handlers[key]),
        );
      }
    }

    return response;
  }

  protected handle = (event: IEvent, handler: IEventHandler) => {
    return handler.handle(event, this.getContext());
  };

  protected newResponse(): EventDispatcherResponse<EventHandlerResponse> {
    return new EventDispatcherResponse();
  }

  protected newHandlerResponse(data: any) {
    return new EventHandlerResponse(data);
  }

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
