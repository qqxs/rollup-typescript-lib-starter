import CanvasLoader, { type CanvasLoaderOptions } from './canvas';
import VideoLoader, { type VideoLoaderOptions } from './video';

export interface LoaderOptions extends VideoLoaderOptions, CanvasLoaderOptions {
  nodeName: 'canvas' | 'video';
}

/**
 * @description create canvas loader
 * @param $content
 * @param options
 * @returns
 */
function createLoader($content: HTMLElement, options: LoaderOptions) {
  if (options.nodeName === 'canvas') {
    return new CanvasLoader($content, options);
  } else if (options.nodeName === 'video') {
    return new VideoLoader($content, options);
  } else {
    throw new Error('loader is error!');
  }
}

export default createLoader;
