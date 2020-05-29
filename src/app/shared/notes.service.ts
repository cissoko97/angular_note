import { Injectable } from '@angular/core';
import { INote } from '../models/Note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notes: INote[] = new Array<INote>();
  id = 0;
  constructor() { }

  get(id: number): INote {
    return this.notes.find(value => value.id === id);
  }

  add(note: INote): INote {
    note.createdAt = new Date();
    note.id = ++this.id;
    this.notes.push(note);
    return note;
  }

  getAll(): INote[] {
    return this.notes;
  }

  update(note: INote): boolean {
    const index = this.notes.findIndex(value => value.id);
    let result;
    try {
      this.notes[index] = note;
      result = true;
    } catch (err) {
      result = false;
    }
    return result;
  }

  delete(note: INote): INote {
    const index = this.notes.findIndex(value => value.id === note.id);
    try {
      this.notes.splice(index, 1);
    } catch (err) {
      note = null;
    }
    this.id--;
    return note;
  }
}
