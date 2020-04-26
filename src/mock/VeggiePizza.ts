import Pizza from './Pizza';

export default class VeggiePizza extends Pizza {
  public _getFullyQualifiedClassName() {
    return `${this.constructor.name}With${this.ingredients.join('')}`;
  }
}
