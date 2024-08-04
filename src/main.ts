import './style';
import merge from 'deepmerge';
import screenfull from 'screenfull';
import { isDOM } from './utils/idDom';
import Control, { type UIControl } from './control';
import { CONTROLS } from './control/constant';
import {
  HEADER_POSITION_NODE_NAME,
  FOOTER_POSITION_NODE_NAME,
  type IMAGE_FORMAT_TYPE,
  type IMAGE_SCREENSHOT_TYPE,
} from './constant';
import type VideoLoader from './video/video';
import type CanvasLoader from './video/canvas';
import createLoader from './video';

export interface UIOptions {
  id: string | HTMLElement;
  width?: number;
  height?: number;
  classPrefix?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  controls: Array<string | UIControl>;
  controlsOptions?: Record<string, any>;
  nodeName: 'canvas' | 'video';
}

const DEFAULT_OPTIONS = {
  id: '',
  width: 600,
  height: 400,
  classPrefix: 'ez-player',
  showHeader: true,
  showFooter: true,
  controls: [],
  nodeName: 'canvas',
  controlsOptions: {},
};

class UI {
  options: Required<UIOptions>;
  $container: HTMLElement;
  $header: HTMLDivElement;
  $footer: HTMLDivElement;
  $content: HTMLDivElement;
  videoLoader: VideoLoader | CanvasLoader;

  static controls: Record<string, Control>;

  constructor(options: Partial<UIOptions>) {
    this.options = merge(DEFAULT_OPTIONS, options) as Required<UIOptions>;

    console.log(JSON.stringify(this.options));

    if (typeof this.options.id === 'string') {
      this.$container = document.getElementById(this.options.id) as HTMLElement;
    } else if (isDOM(this.options.id)) {
      this.$container = this.options.id;
    } else {
      throw new Error('id node does not exist!');
    }
    this._renderBody();
    this._fullscreenEvent();
  }

  // ------------------------ private -------------------

  private _renderBody() {
    this.$container.innerHTML = '';
    this.$container.classList.add(`${this.options.classPrefix}`);
    this.$container.style.cssText += `width: ${this.options.width}px; height: ${this.options.height}px`;
    this._renderHeader();
    this._renderContent();
    if (this.options.showFooter) this._renderFooter();
    // this._addEventListener();
  }

  /**
   * @description 重新渲染, 事件需要重新绑定
   */
  private _reRender() {
    this.$container.innerHTML = '';
    this._renderBody();
  }

  /**
   * @description 渲染头部区 (options.showHeader = false 不展示 header)
   * @returns
   */
  private _renderHeader() {
    if (this.$header || !this.options.showHeader) {
      return;
    }

    this.$header = document.createElement('div');
    this.$header.classList.add(`${this.options.classPrefix}-header`);
    this.$container.appendChild(this.$header);

    HEADER_POSITION_NODE_NAME.forEach((classNameSuffix) => {
      const $children = document.createElement('div');
      $children.classList.add(`${this.options.classPrefix}-${classNameSuffix}`);
      this.$header.appendChild($children);
    });

    this._renderControl(this.$header, (item) => /^header-/.test(item.position));
  }

  /**
   * @description 渲染内容区
   * @returns
   */
  private _renderContent() {
    if (this.$content) {
      return;
    }

    this.$content = document.createElement('div');
    this.$content.classList.add(`${this.options.classPrefix}-content`);
    this.$container.appendChild(this.$content);

    this.videoLoader = createLoader(this.$content, {
      nodeName: this.options.nodeName,
      classPrefix: this.options.classPrefix,
    });
  }

  /**
   * @description 渲染footer区  (options.showFooter = false 不展示 footer)
   * @returns
   */
  private _renderFooter() {
    if (this.$footer || !this.options.showFooter) {
      return;
    }

    this.$footer = document.createElement('div');
    this.$footer.classList.add(`${this.options.classPrefix}-footer`);
    this.$container.appendChild(this.$footer);

    FOOTER_POSITION_NODE_NAME.forEach((classNameSuffix) => {
      const $children = document.createElement('div');
      $children.classList.add(`${this.options.classPrefix}-${classNameSuffix}`);
      this.$footer.appendChild($children);
    });

    this._renderControl(this.$footer, (item) => /^footer-/.test(item.position));
  }

  private _renderControl($parent: HTMLElement, filter: (item: UIControl) => boolean) {
    CONTROLS.filter(filter).forEach((controlOpt) => {
      // eslint-disable-next-line no-new
      const control = new Control(controlOpt, this);
      // prettier-ignore
      const $children = $parent.querySelector(`.${this.options.classPrefix}-${controlOpt.position}`) as HTMLElement;
      if ($children) {
        control.render($children);
      } else {
        console.warn(`position ${controlOpt.position} node does not exist!`);
      }
    });
  }

  /**
   * @description 全局全屏事件监听
   */
  private _fullscreenEvent() {
    if (screenfull.isEnabled) {
      // $container change
      screenfull.on('change', (e) => {
        if (e.target === this.$container) {
          // event fullscreenChange
        }
      });
      // $container error
      screenfull.on('error', (event) => {
        if (event.target === this.$container) {
          // event fullscreenError
        }
        // console.error('Failed to enable fullscreen', event.target);
      });
    }
  }

  // ------------------------ public -------------------

  /**
   * @description 设置尺寸
   * @param {number} width 宽
   * @param {number} height 高
   *
   * @returns {void}
   */
  resize(width: number, height: number) {
    try {
      width = +width;
      height = +height;

      if (typeof width === 'number' && typeof height === 'number' && width > 0 && height > 0) {
        this.options.width = width;
        this.options.height = height;
        this.$container.style.width = width + 'px';
        this.$container.style.height = height + 'px';
      } else {
        console.warn('width and height must be greater than 0!');
      }
    } catch (error) {
      //
    }
  }

  /**
   * @description 截图
   * @param {string} filename 文件名
   * @param {keyof typeof IMAGE_FORMAT_TYPE} format 图片格式
   * @param {number} quality 图片质量 (0-1]
   * @param {keyof typeof IMAGE_SCREENSHOT_TYPE} type 文件类型 （base64 , blob,  download）
   *
   * @returns {string | Blob | undefined} download 没有返回值
   */
  // prettier-ignore
  screenshot (filename?: string, format: keyof typeof IMAGE_FORMAT_TYPE = 'jpeg', quality: number = 0.92, type: keyof typeof IMAGE_SCREENSHOT_TYPE = 'download') {
    return this.videoLoader.screenshot(filename, format, quality, type)
  }

  /**
   * @description 全局全屏
   * @returns {Promise<void>}
   */
  async fullscreen() {
    if (screenfull.isEnabled) {
      return await screenfull.request(this.$container);
    }
  }

  /**
   * @description 退出全屏
   * @returns {Promise<void>}
   */
  async exitFullscreen() {
    if (screenfull.isEnabled) {
      return await screenfull.exit();
    }
  }

  async webFullscreen() {
    throw new Error('webFullscreen');
  }

  // updateOptions(options: Partial<UIOptions>) {
  //   if (options.id) {
  //     delete options.id;
  //   }
  //   this.options = merge(this.options, options) as Required<UIOptions>;
  // }

  /**
   * @description 销毁
   * @returns {void}
   */
  destroy() {
    this.$container.innerHTML = '';
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.$container = null!;
    this.$header.innerHTML = '';
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.$header = null!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.videoLoader = null!;
    this.$content.innerHTML = '';
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.$content = null!;
    this.$footer.innerHTML = '';
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.$footer = null!;
  }
}

export default UI;
