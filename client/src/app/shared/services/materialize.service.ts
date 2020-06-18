declare var M: {
  toast: Function,
  updateTextFields: Function,
  Datepicker: {
    init: Function,
  },
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

export interface MaterialDatepicker extends MaterialInstance {
  date?: Date;
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

  static datepickerInit(nativeElement: any, onClose: () => void): MaterialDatepicker {
    const i18n = {
      cancel: 'Скасувати',
      clear: 'Очистити',
      done: 'Ок',
      months: [
        'Січень',
        'Лютий',
        'Березень',
        'Квітень',
        'Травень',
        'Червень',
        'Липень',
        'Серпень',
        'Вересень',
        'Жовтень',
        'Листопад',
        'Грудень',
      ],
      monthsShort: [
        'Січ',
        'Лют',
        'Бер',
        'Кві',
        'Тра',
        'Чер',
        'Лип',
        'Сер',
        'Вер',
        'Жов',
        'Лис',
        'Гру',
      ],
      weekdays: [
        'Неділя',
        'Понеділок',
        'Вівторок',
        'Середа',
        'Четвер',
        'П`ятниця',
        'Субота',
      ],
      weekdaysShort: [
        'Нд',
        'Пн',
        'Вт',
        'Ср',
        'Чт',
        'Пт',
        'Сб',
      ],
      weekdaysAbbrev: ['Н', 'П', 'В', 'С', 'Ч', 'П', 'С'],
    };

    return M.Datepicker.init(nativeElement, {
      autoClose: true,
      format: 'dd.mm.yyyy',
      firstDay: 1,
      showClearBtn: true,
      i18n,
      onClose,
    });
  }

  static updateTextFields() {
    M.updateTextFields();
  }
}
