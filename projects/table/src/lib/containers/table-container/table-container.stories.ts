import {
  array,
  boolean,
  number,
  withKnobs,
  object
} from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/angular";
import { TableContainerComponent } from "./table-container.component";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { CdkTableModule, DataSource } from "@angular/cdk/table";
import { CommonModule } from "@angular/common";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { action } from "@storybook/addon-actions";
import { ColumnChooserComponent } from "../../components/column-chooser/column-chooser.component";
import { MatListModule } from "@angular/material/list";

storiesOf("Table", module)
  .addParameters({
    knobs: {
      disableDebounce: true
    }
  })
  .addDecorator(withKnobs)
  .add("basic", () => {
    const autoHideColumnsEnabled = boolean("Automatically hide columns", true);
    const columnChooserEnabled = boolean("Enable column chooser", true);
    const selectionEnabled = boolean("Enable selection", true);
    const virtualScrollEnabled = boolean("Enable virtual scrolling", true);
    const resizeableEnabled = boolean("Enable resizing", true);
    const pageSizeOptions = array(
      "Pagesize Options are reflected in Mat Paginators",
      [5, 10, 20]
    );
    const showFirstLastButtons = boolean(
      "Show first and last button in paginator",
      true
    );
    const columns = array("Columns", [
      {
        title: "TestColumn",
        type: "text",
        width: 80,
        resizeable: true
      },
      {
        title: "Bla",
        type: "text",
        width: 80,
        resizeable: true
      }
    ]);
    const dataSource = new MatTableDataSource<any>([
      { TestColumn: "asdasdasdas", id: "asd" },
      { TestColumn: "asdasdasdas", Bla: "asdasdasd", id: "asf" },
      { TestColumn: "asdasdasdas", id: "asa" },
      { TestColumn: "asdasdasdas", id: "asd" },
      { TestColumn: "asdasdasdas", id: "ass" }
    ]);
    const hidePageSize = boolean("Hide page size in paginator", false);
    const length = number("Count of total items in DataSource", 0);
    const pageSize = number("Initial Page size", 20);
    const initialScrollPositionIndex = number(
      "Initial Scroll Position Index",
      0
    );
    const allowMultiSelect = boolean("Allow multiple selected entries", true);
    return {
      moduleMetadata: {
        entryComponents: [TableContainerComponent],
        declarations: [TableContainerComponent, ColumnChooserComponent],
        imports: [
          MatTableModule,
          CdkTableModule,
          MatCheckboxModule,
          MatListModule
        ]
      },
      template: `
      <kryptand-table-container
      [autoHideColumnsEnabled]="autoHideColumnsEnabled"
      [columnChooserEnabled]="columnChooserEnabled"
      [selectionEnabled]="selectionEnabled"
      [dataSource]="dataSource"
      [virtualScrollEnabled]="virtualScrollEnabled"
      [resizeableEnabled]="resizeableEnabled"
      [pageSizeOptions]="pageSizeOptions"
      [showFirstLastButtons]="showFirstLastButtons"
      [hidePageSize]="hidePageSize"
      [length]="length"
      [pageSize]="pageSize"
      [columns]="columns"
      [initialScrollPositionIndex]="initialScrollPositionIndex"
      [allowMultiSelect]="allowMultiSelect"
      (selectionChangedEvent)="selectionChangedEvent($event)"
      ></kryptand-table-container>
      `,
      props: {
        autoHideColumnsEnabled,
        columnChooserEnabled,
        selectionEnabled,
        virtualScrollEnabled,
        resizeableEnabled,
        columns,
        dataSource,
        pageSizeOptions,
        showFirstLastButtons,
        hidePageSize,
        length,
        pageSize,
        initialScrollPositionIndex,
        allowMultiSelect,
        selectionChangedEvent: action("Selection of table Changed")
      }
    };
  });
