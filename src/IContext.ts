import EventDispatcher from './EventDispatcher';
import EventDispatcherResponse from './EventDispatcherResponse';
import IEvent from './IEvent';

export default interface IContext {
  setDispatcher(dispatcher: EventDispatcher): IContext;

  dispatch(event: IEvent): EventDispatcherResponse;
}
