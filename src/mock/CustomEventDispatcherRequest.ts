import IEventDispatcherRequest from '../IEventDispatcherRequest';
import IEvent from '../IEvent';
import IEventHandler from '../IEventHandler';
import IContext from '../IContext';

export default class CustomEventDispatcherRequest implements IEventDispatcherRequest {
  handle(event: IEvent, handler: IEventHandler, context: IContext) {
    // do something custom with the handler
    // i.e. serialize and send to a queue
    return handler.handle(event, context);
  }
}
