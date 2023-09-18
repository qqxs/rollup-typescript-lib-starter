import EventEmitter from '../src';

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
      done();
    });
    event.emit('click');
  });

  it('EventEmitterClass once', (done) => {
    const event = new EventEmitter();

    event.once('once-click', () => {
      done();
    });
    event.emit('once-click');
  });

  it('EventEmitterClass off', (done) => {
    const event = new EventEmitter();

    event.on('click', () => {
      done();
    });

    event.emit('click');
    event.off('click');
    event.emit('click');
  });

  it('EventEmitterClass emit', (done) => {
    const event = new EventEmitter();

    event.on('click', () => {});

    event.on('click', () => {
      done();
    });

    event.emit('click');
  });

  it('EventEmitterClass version', (done) => {
    const event = new EventEmitter();
    event.version();
    done();
  });
});
