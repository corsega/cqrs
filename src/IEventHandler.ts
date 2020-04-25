import Context from './Context';
import IEvent from './IEvent';

export default interface IEventHandler {
  handle(event: IEvent, context: Context): any;
}
