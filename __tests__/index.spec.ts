import EventEmitter from '../src';
import Logger from '../src/utils/logger';

/**
 * EventEmitter test
 */
describe('EventEmitter test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy();
  });

  it('EventEmitterClass is instantiable', () => {
    expect(new EventEmitter()).toBeInstanceOf(EventEmitter);
  });

  it('EventEmitterClass on', (done) => {
    const event = new EventEmitter();

    event.on('click', () => {
      Logger.v('click');
      done();
    });
    event.emit('click');
  });

  it('EventEmitterClass once', (done) => {
    const event = new EventEmitter();

    event.once('once-click', () => {
      Logger.v('once-click');
      done();
    });
    event.emit('once-click');
  });

  it('EventEmitterClass off', (done) => {
    const event = new EventEmitter();

    event.on('click', () => {
      Logger.v('once-click');
      done();
    });

    event.emit('click');
    event.off('click');
    event.emit('click');
  });

  it('EventEmitterClass emit', (done) => {
    const event = new EventEmitter();

    event.on('click', () => {
      Logger.v('click');
    });

    event.on('click', () => {
      Logger.v('click');
      done();
    });

    event.emit('click');
  });
});
