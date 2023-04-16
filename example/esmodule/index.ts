import RollupTypescriptLibStarter from 'rollup-typescript-lib-starter';

const eventEmitter = new RollupTypescriptLibStarter();

eventEmitter.on('click', () => {
  console.log('click');
});

eventEmitter.on('click', () => {
  console.log('click');
});

eventEmitter.emit('click');
