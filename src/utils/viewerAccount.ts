import { VIEWER_ACCOUNT_STORAGE_KEY } from '../config/cats';
import type { ViewerAccount } from '@/types/cws';

const hasWindow = () => typeof window !== 'undefined';

export const loadViewerAccount = (): ViewerAccount | null => {
  if (!hasWindow()) {
    return null;
  }

  const raw = window.localStorage.getItem(VIEWER_ACCOUNT_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as ViewerAccount;
  } catch {
    return null;
  }
};

export const saveViewerAccount = (account: ViewerAccount) => {
  if (!hasWindow()) {
    return;
  }

  window.localStorage.setItem(VIEWER_ACCOUNT_STORAGE_KEY, JSON.stringify(account));
};

export const createViewerAccountNumber = () => {
  const randomChunk = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `cws-418-${randomChunk}`;
};
