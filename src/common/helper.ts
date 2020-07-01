import { toast } from "react-semantic-toasts";
import { IPFS_GATEWAY } from "../blockchain/config";
import Storage from "./storage";
import { MetaDataJson } from "./datatype";

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

export async function fetchMetadata(uri: string): Promise<MetaDataJson> {
  const cache = Storage.get(uri);
  if (cache) return cache;
  const url = IPFS_GATEWAY + uri.replace("ipfs://", '');
  const metadata = await (await fetch(url)).json();
  if (!metadata) {
    Storage.set(url, metadata);
  }
  return metadata;
}