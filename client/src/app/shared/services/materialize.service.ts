declare var M: {
  toast: Function,
  updateTextFields: Function,
  FloatingActionButton: {
    init: Function,
  },
  Modal: {
    init: Function,
  },
  Tooltip: {
    init: Function,
  },
};

export interface MaterialInstance {
  open?(): void;
  close?(): void;
  destroy?(): void;
}

export class MaterializeService {
  static showMessage(message: string) {
    M.toast({ html: message, classes: 'rounded green' });
  }

  static showErrorMessage(message: string) {
    M.toast({ html: message, classes: 'rounded red' });
  }

  static initFloatingActionButton(nativeElement: any) {
    M.FloatingActionButton.init(nativeElement);
  }

  static modalInit(nativeElement: any, options?: any): MaterialInstance {
    return M.Modal.init(nativeElement, options);
  }

  static tooltipInit(nativeElement: any, options?: any): MaterialInstance {
    return M.Tooltip.init(nativeElement, options);
  }

  static updateTextFields() {
    M.updateTextFields();
  }
}
