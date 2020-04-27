import IEvent from './IEvent';
import IEventHandler from './IEventHandler';
import IContext from './IContext';
import IEventDispatcherRequest from './IEventDispatcherRequest';

export default class EventDispatcherRequest implements IEventDispatcherRequest {
  handle(event: IEvent, handler: IEventHandler, context: IContext) {
    return handler.handle(event, context);
  }
}
