export default class Storage {
  static set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key: string): any {
    const val = localStorage.getItem(key);
    try {
      const n = JSON.parse(val);
      return n;
    } catch (e) {
      return val;
    }
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }
}