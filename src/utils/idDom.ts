export const isDOM =
  typeof HTMLElement === 'object'
    ? function (obj: any) {
        return obj instanceof HTMLElement;
      }
    : function (obj: any) {
        return (
          obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string'
        );
      };
