import EventDispatcherResponse from '../EventDispatcherResponse';
import IEvent from '../IEvent';
import IEventHandler from '../IEventHandler';
import IPlugin from '../IPlugin';

export default class LoggerPlugin implements IPlugin {
  onDispatchSuccess(event: IEvent, response: EventDispatcherResponse) {
    console.log('onDispatchSuccess event', event);
    console.log('onDispatchSuccess response', JSON.stringify(response));
  }

  onHandlerSuccess(event: IEvent, handler: IEventHandler, handlerResponse: any) {
    console.log('onHandlerSuccess event', event);
    console.log('onHandlerSuccess handler', handler);
    console.log('onHandlerSuccess handlerResponse', JSON.stringify(handlerResponse));
  }

  onHandlerError(event: IEvent, handler: IEventHandler, error: object) {
    console.log('onHandlerError event', event);
    console.log('onHandlerError handler', handler);
    console.log('onHandlerError handlerResponse', error);
  }
}
