import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "kryptand-column-chooser",
  templateUrl: "./column-chooser.component.html",
  styleUrls: ["./column-chooser.component.css"]
})
export class ColumnChooserComponent implements OnInit {
  @Input()
  get columns() {
    return this.columnsValue;
  }

  set columns(val: any[]) {
    this.columnsValue = val;
    this.columnsChanged.emit(this.columnsValue);
  }

  @Output()
  columnsChanged = new EventEmitter();
  private columnsValue = [];

  constructor() {}
  ngOnInit() {}
}
