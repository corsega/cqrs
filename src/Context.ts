import EventDispatcher from './EventDispatcher';
import IEvent from './IEvent';

export default class Context {
  private dispatcher: EventDispatcher;

  public setDispatcher(dispatcher: EventDispatcher): Context {
    this.dispatcher = dispatcher;
    return this;
  }

  public dispatch = (event: IEvent) => {
    return this.dispatcher.dispatch(event);
  };
}
