import Context from './Context';

export default class EventDispatcherOptions {
  public context: () => Context = () => new Context();
}
