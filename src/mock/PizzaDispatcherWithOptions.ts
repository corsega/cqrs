import EventDispatcher from '../EventDispatcher';
import handlers from './handlers';
import CustomOptions from './CustomOptions';

class PizzaDispatcherWithOptions extends EventDispatcher {}

const options = new CustomOptions();

export default new PizzaDispatcherWithOptions(handlers, options);
