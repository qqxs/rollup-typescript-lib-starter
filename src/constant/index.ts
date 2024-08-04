/**
 *
 */
export const HEADER_POSITION_NODE_NAME = ['header-left', 'header-right'] as const;

/**
 *
 */
export const FOOTER_POSITION_NODE_NAME = ['footer-left', 'footer-right'] as const;

export const IMAGE_FORMAT_TYPE = {
  png: 'image/png',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
};

export const IMAGE_SCREENSHOT_TYPE = {
  download: 'download',
  base64: 'base64',
  blob: 'blob',
};
