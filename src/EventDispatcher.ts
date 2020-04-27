import Context from './Context';
import EventDispatcherResponse from './EventDispatcherResponse';
import IEvent from './IEvent';
import IEventHandler from './IEventHandler';
import IEventHandlerMap from './IEventHandlerMap';
import Reflection from './Reflection';
import IEventDispatcherOptions from './IEventDispatcherOptions';

export class EventDispatcher {
  constructor(
    private eventHandlerMaps: IEventHandlerMap[],
    private options: IEventDispatcherOptions = {},
    private reflection: Reflection = new Reflection(),
  ) {}

  public async dispatch(event: IEvent, responseClass: typeof EventDispatcherResponse = EventDispatcherResponse) {
    const response = new responseClass();

    for (const handler of this.getEventHandlers(event)) {
      try {
        const handlerResponse = (response[this.reflection.getClassName(handler)] = await handler.handle(
          event,
          this.getContext(),
        ));

        this.onHandlerSuccess(event, handler, handlerResponse);
      } catch (error) {
        this.onHandlerError(event, handler, error);

        throw new error();
      }
    }

    this.onDispatchSuccess(event, response);

    return response;
  }

  private onDispatchSuccess(event: IEvent, response: EventDispatcherResponse): void {
    this.reflection.isFunction(this.options.onDispatchSuccess) && this.options.onDispatchSuccess(event, response);
  }

  private onHandlerError(event: IEvent, handler: IEventHandler, error: object): void {
    this.reflection.isFunction(this.options.onHandlerError) && this.options.onHandlerError(event, handler, error);
  }

  private onHandlerSuccess(event: IEvent, handler: IEventHandler, handlerResponse: any): void {
    this.reflection.isFunction(this.options.onHandlerSuccess) &&
      this.options.onHandlerSuccess(event, handler, handlerResponse);
  }

  private getContext(): Context {
    return (this.reflection.isFunction(this.options.context) ? this.options.context() : new Context()).setDispatcher(
      this,
    );
  }

  private getEventHandlers(event: IEvent) {
    return this.findEventMap(event)?.handlers || [];
  }

  private findEventMap(event: IEvent) {
    return this.eventHandlerMaps.filter((map) => this.reflection.hasSameClassName(map.event, event))[0] || null;
  }
}

export default EventDispatcher;
