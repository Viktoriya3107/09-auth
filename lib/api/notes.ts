import axios from 'axios';
import { Note, CreateNoteDTO } from '@/types/user';

const BASE_URL = 'https://your-api-url.com';

export type NotesResponse = {
  items: Note[];
  totalPages: number;
};

export const getNotes = async (
  tag?: string,
  search?: string,
  page: number = 1
): Promise<NotesResponse> => {
  const { data } = await axios.get(`${BASE_URL}/notes`, {
    params: {
      tag,
      search,
      page,
    },
  });

  return data;
};

export const getNoteById = async (id: string): Promise<Note> => {
  const { data } = await axios.get(`${BASE_URL}/notes/${id}`);
  return data;
};

export const createNote = async (note: CreateNoteDTO): Promise<Note> => {
  const { data } = await axios.post(`${BASE_URL}/notes`, note);
  return data;
};