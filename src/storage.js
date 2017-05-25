class Entry {
  constructor(holder, key) {
    this._holder = holder
    this._key = key
  }

  get key() {
    return this._key
  }

  orInsert(value) {
    if (!this._holder.has(this._key)) {
      this._holder.set(this._key, value)
    }
    return this._holder.get(this._key)
  }

  async orInsertWith(fn) {
    if (!this._holder.has(this._key)) {
      this._holder.set(this._key, await fn())
    }
    return this._holder.get(this._key)
  }
}

export default {
  get(key) {
    const value = localStorage.getItem(key)
    if (value) {
      try {
        return JSON.parse(value)
      }
      catch (e) {
                // Ignore value
      }
    }
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },

  has(key) {
    return localStorage.hasOwnProperty(key)
  },

  delete(key) {
    localStorage.removeItem(key)
  },

  entry(key) {
    return new Entry(this, key)
  },
}
