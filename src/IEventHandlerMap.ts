import IEvent from './IEvent';
import IEventHandler from './IEventHandler';

export default interface IEventHandlerMap {
  event: IEvent;
  handlers: IEventHandler[];
}
