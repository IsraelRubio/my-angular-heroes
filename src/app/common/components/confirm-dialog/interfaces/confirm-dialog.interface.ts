export interface SimpleDialogData {
    title: string
    subtitle: string
    icon: ConfirmDialogIcon
    descriptionName?: string
    isNotification: boolean
  }

  export type ConfirmDialogIcon =
  | 'check_circle'
  | 'info'