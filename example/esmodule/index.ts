import RollupTypescriptLibStarter from 'rollup-typescript-lib-starter'

const person = new RollupTypescriptLibStarter('shine')
console.log(person)
console.log(person.getName())
person.setName('shineshao')
console.log(person.getName())
