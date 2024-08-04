// import { upperCamel } from '@skax/camel';

import type UI from '../main';
import { type FOOTER_POSITION_NODE_NAME, type HEADER_POSITION_NODE_NAME } from '../constant';

export type UIControlPosition =
  | (typeof HEADER_POSITION_NODE_NAME)[number]
  | (typeof FOOTER_POSITION_NODE_NAME)[number];

export interface UIControl {
  // 控件名
  name: string;
  position: UIControlPosition;
  /** 图标的优先级 比 text 高, 推荐  */
  // icon?: string;
  // activeIcon?: string;
  /**  */
  // text?: string;
  activeColor?: string;
  /**  */
  cssText?: string;
  className?: string;
  htmlContent: ((control: Control, ui: UI) => string) | string;
  disabled?: boolean;
  active?: boolean;
}

class Control {
  options: UIControl;
  $span: HTMLSpanElement;

  // private
  private readonly _ui: UI;
  private _disabled: boolean;
  private _active: boolean;

  private _handleClick: (e: MouseEvent) => void;

  private readonly _ActiveClassName: string;
  private readonly _DisabledClassName: string;

  constructor(options: UIControl, ui: UI) {
    this.options = options;
    this._ui = ui;
    this._ActiveClassName = `${this._ui.options.classPrefix}-control-active`;
    this._DisabledClassName = `${this._ui.options.classPrefix}-control-disabled`;

    this._disabled = !!this.options.disabled;
    this.disabled = !!this.options.disabled;
    this._active = !!this.options.active;
    this.active = !!this.options.active;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this._handleClick = null!;
  }

  render($parent: HTMLElement) {
    if (this.$span) {
      return;
    }

    this.$span = document.createElement('span');
    // prettier-ignore
    this.$span.classList.add(`${this._ui.options.classPrefix}-control`, `${this._ui.options.classPrefix}-control-${this.options.name}`);
    if (this.options?.className) this.$span.classList.add(`${this.options?.className}`);
    if (this.options?.cssText) this.$span.style.cssText += this.options?.cssText || '';

    this.renderHtmlContent();

    if ($parent) $parent.appendChild(this.$span);

    this.disabled = this._disabled;
    this.active = this._active;

    this._addEventListener();
  }

  set disabled(disabled: boolean) {
    if (this.$span) {
      if (disabled) {
        this.$span.classList.remove(this._ActiveClassName);
        this.$span.classList.add(this._DisabledClassName);
      } else {
        this.$span.classList.remove(this._DisabledClassName);
      }
    }
    this._disabled = disabled;
  }

  get disabled() {
    return this._disabled;
  }

  set active(active: boolean) {
    if (this.$span) {
      if (active) {
        this.$span.classList.remove(this._DisabledClassName);
        this.$span.classList.add(this._ActiveClassName);
      } else {
        this.$span.classList.remove(this._ActiveClassName);
      }
    }
    this._active = active;
  }

  get active() {
    return this._active;
  }

  reset() {
    this.active = false;
    this.disabled = false;
  }

  renderHtmlContent() {
    if (!this.$span) {
      return;
    }
    if (typeof this.options.htmlContent === 'string') {
      this.$span.innerHTML = this.options.htmlContent;
    } else if (typeof this.options.htmlContent === 'function') {
      //
      this.$span.innerHTML = this.options.htmlContent(this, this._ui);
    } else {
      console.warn('control options htmlContent is invalid!');
    }
  }

  destroy() {
    this._removeEventListener();
    this._active = false;
    this._disabled = false;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.$span = null!;
  }

  /**
   * @description 添加事件
   */
  private _addEventListener() {
    if (this.$span) {
      this._handleClick = () => {
        if (!this._disabled) this.active = !this.active;
      };
      this.$span.addEventListener('click', this._handleClick);
    }
  }

  /**
   * @description 移除事件
   */
  private _removeEventListener() {
    if (this.$span) {
      this.$span.removeEventListener('click', this._handleClick);
    }
  }
}

export default Control;
