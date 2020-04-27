import EventDispatcher from './EventDispatcher';
import IContext from './IContext';
import IEvent from './IEvent';

export default class Context implements IContext {
  public getDispatcher: () => EventDispatcher;

  public setDispatcher(dispatcher: EventDispatcher): Context {
    this.getDispatcher = () => dispatcher;
    return this;
  }

  public dispatch = (event: IEvent) => {
    return this.getDispatcher().dispatch(event);
  };
}
