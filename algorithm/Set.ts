interface setItemsType<T> {
  [props: string]: T
}

export default class Set<T> {
  private items: setItemsType<T>
  constructor() {
    this.items = {}
  }
  has(element: any) {
    return Object.prototype.hasOwnProperty.call(this.items, element)
  }
  add(element: any) {
    if (!this.has(element)) {
      this.items[element] = element
      return true
    }
    return false
  }
  delete(element: any) {
    if (!this.has(element)) {
      return false
    }
    delete this.items[element]
    return true
  }
  clear() {
    this.items = {}
  }
  size() {
    let count = 0
    for (const key in this.items) {
      if (this.items.hasOwnProperty(key)) {
        count++
      }
    }
    return count
  }
  values() {
    let values = []
    for (const key in this.items) {
      if (this.items.hasOwnProperty(key)) {
        values.push(this.items[key])
      }
    }
    return values
  }
  union(otherSet: Set<T>) {
    const unionSet = new Set()
    this.values().forEach(item => unionSet.add(item))
    otherSet.values().forEach(item => unionSet.add(item))
    return unionSet
  }
  intersection(otherSet: Set<T>) {
    const intersectionSet = new Set()
    const values = this.values()
    const otherValues = otherSet.values()
    // 假设当前集合值最多
    let biggerSet = values
    let smallerSet = otherValues
    // 如果另一个集合的元素个数比当前集合的个数多，则交换位置
    if (biggerSet.length - smallerSet.length > 0) {
      biggerSet = otherValues
      smallerSet = values
    }
    smallerSet.forEach(item => {
      if (biggerSet.includes(item)) {
        intersectionSet.add(item)
      }
    })
    return intersectionSet
  }
  difference(otherSet: Set<T>) {
    const differenceSet = new Set()
    this.values().forEach(item => {
      if (!otherSet.has(item)) {
        differenceSet.add(item)
      }
    })
    return differenceSet
  }
  isSubsettOf(otherSet: Set<T>) {
    if (this.size() !== otherSet.size()) return false
    let isSubset = true
    this.values().every(item => {
      if (!otherSet.has(item)) {
        isSubset = false
        return false
      }
      return true
    })
    return isSubset
  }
}
