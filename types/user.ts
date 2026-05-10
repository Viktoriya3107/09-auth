export interface User {
  email: string;
  username: string;
  avatar: string;
};
export type Note = {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt?: string;
};

export type CreateNoteDTO = {
  title: string;
  content: string;
  tag: string;
};