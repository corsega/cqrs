import OrderPizza from '../Event/OrderPizza';

export default class SendInvoiceHandler {
  public handle(event: OrderPizza) {
    return {
      invoice: {
        id: 'invoice-id',
        ...event,
      },
    };
  }
}
