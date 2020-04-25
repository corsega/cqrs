import Context from './Context';

export default class EventDispatcherOptions {
  context: () => Context = () => new Context();
}
