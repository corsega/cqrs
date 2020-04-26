import InvalidOrder from '../event/InvalidOrder';

export default class InvalidOrderHandler {
  public handle(event: InvalidOrder) {
    throw Error('InvalidOrderError');
  }
}
