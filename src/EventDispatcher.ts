import EventDispatcherOptions from './EventDispatcherOptions';
import EventDispatcherResponse from './EventDispatcherResponse';
import IEvent from './IEvent';
import IEventHandler from './IEventHandler';
import IEventHandlerMap from './IEventHandlerMap';
import IPlugin from './IPlugin';
import IEventDispatcherOptions from './IEventDispatcherOptions';

export class EventDispatcher {
  private plugins: IPlugin[] = [];

  constructor(
    private eventHandlerMaps: IEventHandlerMap[],
    private options: IEventDispatcherOptions = new EventDispatcherOptions(),
  ) {}

  public async dispatch(event: IEvent, responseClass: typeof EventDispatcherResponse = EventDispatcherResponse) {
    const response = new responseClass();

    for (const handler of this.getEventHandlers(event)) {
      try {
        const handlerResponse = (response[this.getReflection().getClassName(handler)] = await this.getRequest().handle(
          event,
          handler,
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

  public plugin(plugin: IPlugin) {
    this.plugins.push(plugin);
    return this;
  }

  private onDispatchSuccess(event: IEvent, response: EventDispatcherResponse): void {
    for (const plugin of this.plugins) {
      this.getReflection().isFunction(plugin.onDispatchSuccess) && plugin.onDispatchSuccess(event, response);
    }
  }

  private onHandlerSuccess(event: IEvent, handler: IEventHandler, handlerResponse: any): void {
    for (const plugin of this.plugins) {
      this.getReflection().isFunction(plugin.onHandlerSuccess) &&
        plugin.onHandlerSuccess(event, handler, handlerResponse);
    }
  }

  private onHandlerError(event: IEvent, handler: IEventHandler, error: object): void {
    for (const plugin of this.plugins) {
      this.getReflection().isFunction(plugin.onHandlerError) && plugin.onHandlerError(event, handler, error);
    }
  }

  private getContext() {
    return this.options.context.setDispatcher(this);
  }

  private getReflection() {
    return this.options.reflection;
  }

  private getRequest() {
    return this.options.request;
  }

  private getEventHandlers(event: IEvent) {
    return this.findEventMap(event)?.handlers || [];
  }

  private findEventMap(event: IEvent) {
    return this.eventHandlerMaps.filter((map) => this.getReflection().hasSameClassName(map.event, event))[0] || null;
  }
}

export default EventDispatcher;
