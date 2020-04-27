import IEvent from './IEvent';
import EventDispatcherResponse from './EventDispatcherResponse';
import IEventHandler from './IEventHandler';

export default interface IPlugin {
  onDispatchSuccess?(event: IEvent, response: EventDispatcherResponse): void;

  onHandlerError?(event: IEvent, handler: IEventHandler, error: object): void;

  onHandlerSuccess?(event: IEvent, handler: IEventHandler, handlerResponse: any): void;
}
