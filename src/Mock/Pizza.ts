export default class Pizza {
  public size?: string;
  public ingredients: string[];
  constructor(
    options: {
      size?: string;
      ingredients?: string[];
    } = {},
  ) {
    this.size = options.size || 'large';
    this.ingredients = options.ingredients || [];
  }
}
