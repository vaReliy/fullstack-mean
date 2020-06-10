declare var M: {
  toast: Function,
  FloatingActionButton: {
    init: Function,
  },
};

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
}
