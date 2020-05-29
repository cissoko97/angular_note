import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { INote } from 'src/app/models/Note';
import { NotesService } from 'src/app/shared/notes.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {
  noteForm = this.fb.group({
    title: ['', Validators.required],
    body: [''],
  });
  new = true;
  id: number;
  note: INote;
  constructor(private fb: FormBuilder, private notesService: NotesService, private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    //
    this.activatedRouter.params.subscribe((params: Params) => {
      if (params.id) {
        this.note = this.notesService.get(parseInt(params.id, 0));
        this.id = params.id;
        this.noteForm.setValue({ title: this.note.title, body: this.note.body });
        this.new = false;
      }
    });
  }

  formSubmit() {
    let not: INote = this.noteForm.value;

    if (this.new) {
      not = this.notesService.add(not);
    } else {
      not.id = this.note.id;
      not.createdAt = this.note.createdAt;
      this.notesService.update(not);
    }
    this.router.navigateByUrl('/note');
  }
}
