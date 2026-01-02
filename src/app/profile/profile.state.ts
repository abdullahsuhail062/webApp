// profile.state.ts
import { signal } from '@angular/core';

export const profileSignal = signal<{
  username: string;
  image: File | string | null;
}>({
  username: '',
  image: null
});
