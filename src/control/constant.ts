import { type UIControl } from '.';

export const UIControl_Primary_Color = '#0099e5';
export const UIControl_Active_Color = '#0099e5';
export const UIControl_Disable_Color = '#0099e5';

/**
 * @description 默认控件数据
 */
export const CONTROLS: UIControl[] = [
  // header
  {
    name: 'name1',
    position: 'header-left',
    htmlContent: '<div>name1<div>',
    disabled: true,
  },
  {
    name: 'name2',
    position: 'header-left',
    htmlContent: '<div>name2<div>',
    active: true,
  },
  {
    name: 'name3',
    position: 'header-left',
    htmlContent: '<div>name3<div>',
  },
  {
    name: 'name4',
    position: 'header-left',
    htmlContent: '<div>name4<div>',
  },
  {
    name: 'name11',
    position: 'header-left',
    htmlContent: '<div>name11<div>',
  },
  {
    name: 'name12',
    position: 'header-left',
    htmlContent: '<div>name12<div>',
  },

  {
    name: 'name5',
    position: 'header-left',
    htmlContent: '<div>name<div>',
  },

  {
    name: 'name4',
    position: 'header-center',
    htmlContent: '<div>name<div>',
  },
  {
    name: 'name5',
    position: 'header-center',
    htmlContent: '<div>name<div>',
  },

  {
    name: 'name6',
    position: 'header-right',
    htmlContent: '<div>name<div>',
  },
  {
    name: 'name7',
    position: 'header-right',
    htmlContent: '<div>name<div>',
  },

  // footer
  {
    name: 'play1',
    position: 'footer-left',
    htmlContent: '<div>play1<div>',
    disabled: true,
  },
  {
    name: 'play2',
    position: 'footer-left',
    htmlContent: '<div>play2<div>',
    active: true,
  },
  {
    name: 'play3',
    position: 'footer-left',
    htmlContent: '<div>play3<div>',
  },
  {
    name: 'play12',
    position: 'footer-left',
    htmlContent: '<div>play12<div>',
    active: true,
  },
  {
    name: 'play13',
    position: 'footer-left',
    htmlContent: '<div>play13<div>',
  },

  {
    name: 'play4',
    position: 'footer-center',
    htmlContent: '<div>name<div>',
  },
  {
    name: 'play6',
    position: 'footer-center',
    htmlContent: '<div>name<div>',
  },

  {
    name: 'play7',
    position: 'footer-right',
    htmlContent: '<div>name<div>',
  },
  {
    name: 'play8',
    position: 'footer-right',
    htmlContent: '<div>name<div>',
  },
];
