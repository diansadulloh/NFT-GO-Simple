import { toast } from "react-semantic-toasts";

export function toastSuccess(msg: string, duration = 4000) {
  toast({
    type: "success",
    title: 'SUCCESS',
    description: msg,
    time: duration
  })
}

export function toastWarning(msg: string, duration = 4000) {
  toast({
    type: "warning",
    title: 'WARNING',
    description: msg,
    time: duration
  })
}

export function toastError(msg: string, duration = 4000) {
  toast({
    type: 'error',
    title: 'ERROR',
    description: msg,
    time: duration
  })
}