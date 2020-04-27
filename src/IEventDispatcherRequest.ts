import IContext from './IContext';
import IEvent from './IEvent';
import IEventHandler from './IEventHandler';

export default interface IEventDispatcherRequest {
  handle(event: IEvent, handler: IEventHandler, context: IContext): any;
}
