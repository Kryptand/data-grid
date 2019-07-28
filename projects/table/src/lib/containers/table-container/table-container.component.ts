import { SelectionModel } from "@angular/cdk/collections";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { distinctUntilChanged, map, delay } from "rxjs/operators";
import { ColDef } from "../../models/coldef";

const COLUMN_CHOOSER_COLUMN_NAME = "column-chooser-column";
const SELECTION_COLUMN_NAME = "selection-column";
@Component({
  selector: "kryptand-table-container",
  templateUrl: "./table-container.component.html",
  styleUrls: ["./table-container.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableContainerComponent implements OnInit {
  @Input() columns: ColDef[] = [];
  @Input()
  autoHideColumnsEnabled = true;
  @Input() columnChooserEnabled = false;
  @Input() selectionEnabled = false;
  @Input() virtualScrollEnabled = true;
  @Input() resizeableEnabled = false;
  @Input() dataSource: any = [];
  @Input() pageSizeOptions = [5, 10, 20];
  @Input() showFirstLastButtons = true;
  @Input()
  hidePageSize: boolean;
  @Input()
  length = 0;
  @Input()
  pageIndex = 0;
  @Input()
  pageSize = 20;
  @Input()
  initialScrollPositionIndex: number;
  @Output()
  page: EventEmitter<PageEvent> = new EventEmitter();
  @Output()
  scrollPositionChanged: EventEmitter<number> = new EventEmitter();
  @Output()
  selectionChangedEvent: EventEmitter<any> = new EventEmitter();
  @Input()
  allowMultiSelect: boolean;
  @Input()
  initialSelection: any;
  public columnChooserColumnName = COLUMN_CHOOSER_COLUMN_NAME;
  public selectionColumnName = SELECTION_COLUMN_NAME;

  selection: SelectionModel<any> = new SelectionModel();
  constructor() {}
  get colDefNames() {
    return this.columns.map(x => x.title);
  }
  get activeColumns() {
    let activeColumns = this.colDefNames;
    activeColumns = this.selectionEnabled
      ? [this.selectionColumnName, ...activeColumns]
      : activeColumns;
    activeColumns = this.columnChooserEnabled
      ? [...activeColumns, this.columnChooserColumnName]
      : activeColumns;
    return activeColumns;
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }
  ngOnInit() {
    this.selection = new SelectionModel<any>(
      this.allowMultiSelect,
      this.initialSelection
    );
    this.selection.changed
      .pipe(distinctUntilChanged())
      .subscribe(_ => this.selectionChangedEvent.emit(this.selection.selected));
  }
}
