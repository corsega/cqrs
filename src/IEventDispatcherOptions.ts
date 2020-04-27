import IContext from './IContext';
import IEventDispatcherRequest from './IEventDispatcherRequest';
import IReflection from './IReflection';

export default interface IEventDispatcherOptions {
  context: IContext;
  reflection: IReflection;
  request: IEventDispatcherRequest;
}
