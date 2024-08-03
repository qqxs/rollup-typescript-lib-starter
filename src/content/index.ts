interface ContentOptions {
  nodeName: 'video' | 'canvas';
  classPrefix: string;
}

class Video {
  options: ContentOptions;
  $video: HTMLVideoElement | HTMLCanvasElement;
  private readonly _$content: HTMLElement;

  constructor($content: HTMLElement, options: ContentOptions) {
    this.options = options;
    this._$content = $content;
    this._render();
  }

  _render() {
    if (this.$video) {
      return;
    }
    this.$video = document.createElement(this.options.nodeName);
    this.$video.classList.add(`${this.options.classPrefix}-video`);
    this._$content.appendChild(this.$video);
  }

  resize() {}
}

export default Video;
