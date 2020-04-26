import EventDispatcher from '../EventDispatcher';
import OrderPizza from './Event/OrderPizza';
import OrderSaved from './Event/OrderSaved';
import NotifyCustomerHandler from './Handler/NotifyCustomerHandler';
import SaveOrderHandler from './Handler/SaveOrderHandler';
import SendInvoiceHandler from './Handler/SendInvoiceHandler';
import Context from '../Context';
import IEvent from '../IEvent';
import EventDispatcherResponse from '../EventDispatcherResponse';
import IEventHandler from '../IEventHandler';
import InvalidOrder from './Event/InvalidOrder';
import InvalidOrderHandler from './Handler/InvalidOrderHandler';

class PizzaDispatcher extends EventDispatcher {}

export default new PizzaDispatcher(
  [
    {
      event: OrderPizza,
      handlers: [new SaveOrderHandler(), new NotifyCustomerHandler()],
    },
    {
      event: OrderSaved,
      handlers: [new SendInvoiceHandler()],
    },
    {
      event: InvalidOrder,
      handlers: [new InvalidOrderHandler()],
    },
  ],
  {
    onDispatchSuccess: (event: IEvent, response: EventDispatcherResponse) => {
      console.log('onDispatchSuccess event', event);
      console.log('onDispatchSuccess response', JSON.stringify(response));
    },
    onHandlerSuccess: (event: IEvent, handler: IEventHandler, handlerResponse: any) => {
      console.log('onHandlerSuccess event', event);
      console.log('onHandlerSuccess handler', handler);
      console.log('onHandlerSuccess handlerResponse', JSON.stringify(handlerResponse));
    },
    onHandlerError: (event: IEvent, handler: IEventHandler, error: object) => {
      console.log('onHandlerError event', event);
      console.log('onHandlerError handler', handler);
      console.log('onHandlerError handlerResponse', error);
    },
  },
);
