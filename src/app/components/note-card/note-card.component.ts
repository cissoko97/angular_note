import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, ViewChildren, EventEmitter, Output } from '@angular/core';
import { INote } from 'src/app/models/Note';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @ViewChild('truncator', { static: true }) truncator: ElementRef<HTMLElement>;
  @ViewChild('bodyCard', { static: true }) bodyCard: ElementRef<HTMLElement>;
  @Input() note: INote;
  @Output() delete = new EventEmitter<INote>();
  constructor(private renderer: Renderer2) { }

  ngOnInit() {

    // hidden truncation when height
    const style = window.getComputedStyle(this.bodyCard.nativeElement, null);
    const viewableHeight = parseInt(style.height, 10);

    if (this.bodyCard.nativeElement.scrollHeight >= viewableHeight) {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');

    }
  }

  deleteNote() {
    this.delete.emit(this.note);
  }
}
