export default interface IReflection {
  isObject(obj: any): boolean;

  isFunction(obj: any): boolean;

  getClassName(obj: any | object): string;

  hasSameClassName(obj1: any, obj2: any): boolean;
}
