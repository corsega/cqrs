import EventDispatcher from '../EventDispatcher';
import OrderPizza from './event/OrderPizza';
import OrderSaved from './event/OrderSaved';
import NotifyCustomerHandler from './handler/NotifyCustomerHandler';
import SaveOrderHandler from './handler/SaveOrderHandler';
import SendInvoiceHandler from './handler/SendInvoiceHandler';
import Context from '../Context';
import IEvent from '../IEvent';
import EventDispatcherResponse from '../EventDispatcherResponse';
import IEventHandler from '../IEventHandler';
import InvalidOrder from './event/InvalidOrder';
import InvalidOrderHandler from './handler/InvalidOrderHandler';

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
