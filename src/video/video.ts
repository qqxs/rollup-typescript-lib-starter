import CommonLoader, { type CommonLoaderOptions } from './common';

export interface VideoLoaderOptions extends CommonLoaderOptions {}

class VideoLoader extends CommonLoader {
  $videoElement: HTMLVideoElement;
  constructor($content: HTMLElement, options: VideoLoaderOptions) {
    super($content, options);
    this.render();
  }

  render() {
    if (this.$videoElement) {
      return;
    }
    this.$videoElement = document.createElement('video');
    this.$videoElement.classList.add(`${this.options.classPrefix}-video`);
    this._$content.appendChild(this.$videoElement);
  }
}

export default VideoLoader;
