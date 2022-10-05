class UseStorage {
  private storage: Storage

  constructor(isLocal?: boolean) {
    this.storage = isLocal ? localStorage : sessionStorage
  }

  set(key: string, data: any) {
    this.storage.setItem(key, JSON.stringify(data))
  }

  get(key: string) {
    const data = this.storage.getItem(key)

    if (data) {
      return JSON.parse(data)
    }
  }

  remove(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

export const useLocalStorage = new UseStorage(true)
export const useSessionStorage = new UseStorage(false)
