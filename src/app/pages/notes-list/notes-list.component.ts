import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { INote } from 'src/app/models/Note';
import { NotesService } from 'src/app/shared/notes.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      transition('void => *', [
        // initiale state
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),
        animate('50ms', style({
          opacity: 0,
          height: 0,
          'margin-bottom': 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        })),
        animate(100)
      ]),
      transition('* => void',
        [
          animate(50, style({
            transform: 'scale(1.05)'
          })),
          // then scale down back to normal size while beginnind to fade
          animate(50, style({
            transform: 'scale(1)',
            opacity: 0.7
          })),
          // Scale down and fade out completely
          animate('150ms ease-out', style({
            opacity: 0,
            transform: 'scale(0.68)'
          })),
          // then animate the spacing (which includes heigth , margin and padding)
          animate('150ms ease-out', style({
            height: 0,
            'margin-bottom': 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
          }))
        ])
    ]),
    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0
          }),
          stagger(100, [
            animate('0.2s ease')
          ])
        ], {
          optional: true
        })
      ])
    ])
  ]
})
export class NotesListComponent implements OnInit {

  filter: string;
  notes: Array<INote>;
  cloneNotes: Array<INote>;
  @ViewChild('list', { static: true }) list: ElementRef<HTMLElement>;

  constructor(private notesService: NotesService, private renderer: Renderer2) {

    // window.addEventListener('resize')
  }

  ngOnInit() {
    // let init list of note;
    this.notes = this.notesService.getAll();
    this.cloneNotes = this.notes.slice();
    // dinamiccaly set the even
    let width = window.innerWidth;
    const height = window.innerHeight - (65 + 45 + 30);

    this.setHeightDynamicaly(width, height);
    window.addEventListener('resize', () => {
      width = window.innerWidth;
      this.setHeightDynamicaly(width, height);
    });
  }

  filterNote(keyWords: string) {
    // if (keyWords) {
    this.notes = this.cloneNotes.filter(value => {
      if (value.title && value.title.toLowerCase().includes(keyWords.toLowerCase())) {
        return true;
      }
      if (value.body && value.body.toLowerCase().includes(keyWords.toLowerCase())) {
        return true;
      }
      return false;
    });
    // }
  }

  delete(note: INote) {
    this.notesService.delete(note);
  }

  // sortResult(searchResult: INote[]) {
  //   let notCountObj: object = {}; // format => -key:value => NoteId:number (note object id : count)

  //   searchResult.forEach(note => {
  //     let noteId = note.id;

  //     if (notCountObj[noteId]) {
  //       notCountObj[noteId] += 1;
  //     } else {
  //       notCountObj[noteId] = 1;
  //     }
  //   });
  //   this.
  // }

  setHeightDynamicaly(width: number, height: number) {
    if (width <= 450) {
      this.renderer.setStyle(this.list.nativeElement, 'max-height', height + 'px');
      this.renderer.setStyle(this.list.nativeElement, 'min-height', height + 'px');
    } else {
      this.renderer.setStyle(this.list.nativeElement, 'max-height', (height - 30) + 'px');
      this.renderer.setStyle(this.list.nativeElement, 'min-height', (height - 30) + 'px');
    }
  }
}
