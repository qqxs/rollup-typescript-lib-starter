import CommonLoader, { type CommonLoaderOptions } from './common';

export interface CanvasLoaderOptions extends CommonLoaderOptions {}

class CanvasLoader extends CommonLoader {
  $videoElement: HTMLCanvasElement;
  constructor($content: HTMLElement, options: CanvasLoaderOptions) {
    super($content, options);
    this.render();
  }

  render() {
    if (this.$videoElement) {
      return;
    }
    this.$videoElement = document.createElement('canvas');
    this.$videoElement.classList.add(`${this.options.classPrefix}-video`);
    this._$content.appendChild(this.$videoElement);
  }
}

export default CanvasLoader;
