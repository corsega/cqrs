import EventDispatcher from '../EventDispatcher';
import handlers from './handlers';

class PizzaDispatcher extends EventDispatcher {}

export default new PizzaDispatcher(handlers);
