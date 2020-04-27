import EventDispatcherOptions from '../EventDispatcherOptions';
import CustomReflection from './CustomReflection';
import CustomContext from './CustomContext';
import CustomEventDispatcherRequest from './CustomEventDispatcherRequest';

export default class CustomOptions extends EventDispatcherOptions {
  public context = new CustomContext();
  public reflection = new CustomReflection('_getFullyQualifiedClassName');
  public request = new CustomEventDispatcherRequest();
}
