import Context from './Context';
import EventDispatcherRequest from './EventDispatcherRequest';
import IContext from './IContext';
import IEventDispatcherOptions from './IEventDispatcherOptions';
import IEventDispatcherRequest from './IEventDispatcherRequest';
import IReflection from './IReflection';
import Reflection from './Reflection';

export default class EventDispatcherOptions implements IEventDispatcherOptions {
  public context: IContext = new Context();
  public reflection: IReflection = new Reflection();
  public request: IEventDispatcherRequest = new EventDispatcherRequest();
}
