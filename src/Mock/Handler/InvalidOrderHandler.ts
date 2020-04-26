import InvalidOrder from '../Event/InvalidOrder';

export default class InvalidOrderHandler {
  public handle(event: InvalidOrder) {
    throw Error('InvalidOrderError');
  }
}
