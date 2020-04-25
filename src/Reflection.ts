export default class Reflection {
  constructor(private getClassNameMethod: string = '_getFullyQualifiedClassName') {}

  public isObject(obj: any) {
    return typeof obj === 'object';
  }

  public isFunction(obj: any) {
    return typeof obj === 'function';
  }

  public getClassName(obj: any | object): string {
    if (this.isObject(obj) && this.isFunction(obj[this.getClassNameMethod])) {
      return obj[this.getClassNameMethod]();
    } else if (this.isFunction(obj)) {
      return obj.name;
    }
    return obj.constructor ? obj.constructor.name : null;
  }

  public hasSameClassName(obj1: any, obj2: any) {
    return this.getClassName(obj1) === this.getClassName(obj2);
  }
}
