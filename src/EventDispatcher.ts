import Context from './Context';
import EventDispatcherResponse from './EventDispatcherResponse';
import IEvent from './IEvent';
import IEventHandler from './IEventHandler';
import IEventHandlerMap from './IEventHandlerMap';
import Reflection from './Reflection';
import IEventDispatcherOptions from './IEventDispatcherOptions';

const reflection = new Reflection();

export class EventDispatcher {
  constructor(private eventHandlerMaps: IEventHandlerMap[], private options: IEventDispatcherOptions = {}) {}

  public async dispatch(event: IEvent, responseClass: typeof EventDispatcherResponse = EventDispatcherResponse) {
    const response = new responseClass();

    const eventMap = this.findEventMap(event);

    if (!eventMap) {
      return response;
    }

    for (const key in eventMap.handlers) {
      const handler = eventMap.handlers[key];

      if (handler) {
        try {
          response[reflection.getClassName(handler)] = await this.handle(event, handler);

          this.onHandlerSuccess(event, handler, response[reflection.getClassName(handler)]);
        } catch (error) {
          this.onHandlerError(event, handler, error);

          throw new error();
        }
      }
    }

    this.onDispatchSuccess(event, response);

    return response;
  }

  private onDispatchSuccess(event: IEvent, response: EventDispatcherResponse): void {
    reflection.isFunction(this.options.onDispatchSuccess) && this.options.onDispatchSuccess(event, response);
  }

  private onHandlerError(event: IEvent, handler: IEventHandler, error: object): void {
    reflection.isFunction(this.options.onHandlerError) && this.options.onHandlerError(event, handler, error);
  }

  private onHandlerSuccess(event: IEvent, handler: IEventHandler, handlerResponse: any): void {
    reflection.isFunction(this.options.onHandlerSuccess) &&
      this.options.onHandlerSuccess(event, handler, handlerResponse);
  }

  private handle = (event: IEvent, handler: IEventHandler) => {
    return handler.handle(event, this.getContext());
  };

  private getContext(): Context {
    const context = reflection.isFunction(this.options.context) ? this.options.context() : new Context();
    return context.setDispatcher(this);
  }

  private getMaps() {
    return this.eventHandlerMaps;
  }

  private findEventMap(event: IEvent) {
    return this.getMaps().filter((map) => reflection.hasSameClassName(map.event, event))[0] || null;
  }
}

export default EventDispatcher;
