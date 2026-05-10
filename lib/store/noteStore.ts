import { create } from 'zustand';

interface NoteDraft {
  title: string;
  content: string;
  tag: string;
}

interface NoteStore {
  draft: NoteDraft;
  setDraft: (data: Partial<NoteDraft>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()((set) => ({
  draft: {
    title: '',
    content: '',
    tag: 'Todo',
  },

  setDraft: (data) =>
    set((state) => ({
      draft: { ...state.draft, ...data },
    })),

  clearDraft: () =>
    set({
      draft: {
        title: '',
        content: '',
        tag: 'Todo',
      },
    }),
}));