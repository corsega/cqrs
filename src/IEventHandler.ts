import IContext from './IContext';
import IEvent from './IEvent';

export default interface IEventHandler {
  handle(event: IEvent, context: IContext): any;
}
