import Person from '../src'

/**
 * Dummy test
 */
describe('Person test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('PersonClass is instantiable', () => {
    expect(new Person('shine shao')).toBeInstanceOf(Person)
  })
  it('PersonClass getName', () => {
    expect(new Person('shine shao').getName()).toEqual('shine shao')
  })
  it('PersonClass reset name and getName', () => {
    const person = new Person('shine shao')
    person.setName('freeshine')
    expect(person.getName()).toBe('freeshine')
  })
})
