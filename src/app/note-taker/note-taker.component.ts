import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit  {
  errMessage: String;
  note: Note = new Note();
  notes: Array<Note> = [];
  constructor(private noteService: NotesService) { }
  ngOnInit() {
    this.noteService.getNotes().subscribe(
      notes => this.notes = notes,
      err => this.errMessage = err.message
    );
  }
  takeNotes() {
    if (this.note.noteTitle && this.note.noteContent) {
      this.notes.push(this.note);
      this.noteService.addNote(this.note).subscribe(
        data => {
          this.noteService.fetchNotesFromServer();
         },
        err => {
          const index = this.notes.findIndex(note => note.noteTitle === this.note.noteTitle);
        this.notes.splice(index, 1);
        this.errMessage = 'Http failure response for http://localhost:3000/api/v1/notes: 404 Not Found';
        }
      );
      this.note = new Note();
    } else {
        this.errMessage = 'Title and Text both are required fields';
    }
  }
}
