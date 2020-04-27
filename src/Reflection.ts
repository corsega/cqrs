import IReflection from './IReflection';

export default class Reflection implements IReflection {
  constructor(private getClassNameMethod: string = '_getFullyQualifiedClassName') {}

  public isObject(obj: any) {
    return typeof obj === 'object';
  }

  public isFunction(obj: any) {
    return typeof obj === 'function';
  }

  public getClassName(obj: any): string {
    if (this.isObject(obj) && this.isFunction(obj[this.getClassNameMethod])) {
      return obj[this.getClassNameMethod]();
    } else if (this.isFunction(obj)) {
      return obj.name;
    } else if (obj.constructor && obj.constructor.name !== 'Object') {
      return obj.constructor.name;
    }
    return null;
  }

  public hasSameClassName(obj1: any, obj2: any) {
    return this.getClassName(obj1) === this.getClassName(obj2);
  }
}
