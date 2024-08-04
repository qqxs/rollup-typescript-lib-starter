import ResizeObserver from 'resize-observer-polyfill';
import { IMAGE_FORMAT_TYPE, IMAGE_SCREENSHOT_TYPE } from '../constant';
import { dataURLToFile, saveAs } from '../utils/file';

export interface CommonLoaderOptions {
  nodeName: 'video' | 'canvas';
  classPrefix: string;
}

class CommonLoader {
  options: CommonLoaderOptions;
  $videoElement: HTMLCanvasElement | HTMLVideoElement;

  _$content: HTMLElement;

  private _width: number;
  private _height: number;

  constructor($content: HTMLElement, options: CommonLoaderOptions) {
    this.options = options;
    this._$content = $content;
    this.render();
    this._autoResize();
  }

  render() {
    throw new Error('overload render');
    // if (this.$videoElement) {
    //   return;
    // }
    // this.$videoElement = document.createElement(this.options.nodeName);
    // this.$videoElement.classList.add(`${this.options.classPrefix}-video`);
    // this._$content.appendChild(this.$videoElement);
    // (this.$videoElement as HTMLVideoElement).src = './mov_bbb.mp4';
  }

  /**
   * @description resize
   * @param {number} width
   * @param {number} height
   */
  resize(width: number, height: number) {
    this._resize(width, height);
  }

  /**
   * @description 截图
   * @param {string} filename 文件名
   * @param {keyof typeof IMAGE_FORMAT_TYPE} format 图片格式
   * @param {number} quality 图片质量 (0-1]
   * @param {keyof typeof IMAGE_SCREENSHOT_TYPE} type 文件类型 （base64 , blob,  download）
   *
   * @returns {string | Blob | undefined} // download 没有返回值
   */
  // prettier-ignore
  screenshot(filename?: string, format: keyof typeof IMAGE_FORMAT_TYPE = 'jpeg', quality: number = 0.92, type: keyof typeof IMAGE_SCREENSHOT_TYPE = 'download'){
    filename = filename || new Date().getTime() + '';

    quality = +quality || 0.92

    if (this.$videoElement.nodeName === 'VIDEO') {
      // 视频（video）截图
      return this._videoScreenshot(filename, format, quality, type)
    } else if(this.$videoElement.nodeName === 'CANVAS') {
      // canvas 截图
      return this._canvasScreenshot(this.$videoElement as HTMLCanvasElement, filename, format, quality, type)
    } else {
      console.warn("screenshot fail!")
    }
  }

  /**
   * @description 视频截图
   * @param {string} filename 文件名
   * @param {keyof typeof IMAGE_FORMAT_TYPE} format 图片格式
   * @param {number} quality 图片质量 (0-1]
   * @param {keyof typeof IMAGE_SCREENSHOT_TYPE} type 文件类型 （base64 , blob,  download）
   */
  // prettier-ignore
  private _videoScreenshot(filename: string, format: keyof typeof IMAGE_FORMAT_TYPE = 'jpeg', quality: number = 0.92, type: keyof typeof IMAGE_SCREENSHOT_TYPE = 'download') {
    let $canvasElement = document.createElement("canvas")
    $canvasElement.width = this.width;
    $canvasElement.height = this.height;
    
    /** @type {CanvasRenderingContext2D} */
    const canvasContext = $canvasElement.getContext('2d') as CanvasRenderingContext2D;
    canvasContext.drawImage(this.$videoElement, 0, 0, $canvasElement.width, $canvasElement.height);
    this._canvasScreenshot($canvasElement, filename, format, quality, type)
    // release memory
    canvasContext.clearRect(0, 0, $canvasElement.width, $canvasElement.height);
    $canvasElement.width = 0;
    $canvasElement.height = 0;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    $canvasElement = null!;
  }

  /**
   * @description canvas 截图
   * @param {HTMLCanvasElement} $canvas canvas 元素
   * @param {string} filename 文件名
   * @param {keyof typeof IMAGE_FORMAT_TYPE} format 图片格式
   * @param {number} quality 图片质量 (0-1]
   * @param {keyof typeof IMAGE_SCREENSHOT_TYPE} type 文件类型 （base64 , blob,  download）
   * @returns
   */
  // prettier-ignore
  private _canvasScreenshot($canvas: HTMLCanvasElement, filename: string, format: keyof typeof IMAGE_FORMAT_TYPE = 'jpeg', quality: number = 0.92, type: keyof typeof IMAGE_SCREENSHOT_TYPE = 'download') {
    // prettier-ignore
    const dataURL = $canvas.toDataURL(IMAGE_FORMAT_TYPE[format] || IMAGE_FORMAT_TYPE.jpeg, quality);
    if (type === IMAGE_SCREENSHOT_TYPE.base64) {
      return dataURL;
    } else {
      const file = dataURLToFile(dataURL);
      if (type === IMAGE_SCREENSHOT_TYPE.blob) {
        return file;
      } else if (type === IMAGE_SCREENSHOT_TYPE.download) {
        saveAs(file, filename);
      }
    }
  }

  /**
   * @description
   * @param width
   * @param height
   */
  private _resize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  /**
   * @description 宽
   * @memberof Video
   */
  set width(width: number) {
    this._width = width;
  }

  /**
   * @description 宽
   * @returns {number}
   * @memberof Video
   */
  get width() {
    return this._width;
  }

  /**
   * @description 高
   *
   * @memberof Video
   */
  set height(height: number) {
    this._height = height;
  }

  /**
   * @description 高
   *
   * @returns {number}
   * @memberof Video
   */
  get height() {
    return this._height;
  }

  /**
   * @description 根据父节点的变化（大小变化）重置video/canvas 大小
   * @returns {void}
   */
  private _autoResize() {
    const ro = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        const { left, top, width, height } = entry.contentRect;
        if (entry.target === this._$content) {
          // console.log('Element:', entry.target);
          console.log(`Element's size: width: ${width}px  height:${height}px`);
          this._resize(width, height);
        }
      }
    });
    ro.observe(this._$content);
  }
}

export default CommonLoader;
