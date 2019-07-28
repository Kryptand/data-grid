import { NgModule } from "@angular/core";
import { TableContainerComponent } from "./containers/table-container/table-container.component";
import { CdkTableModule } from "@angular/cdk/table";
import { MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatListModule } from "@angular/material/list";
import { ColumnChooserComponent } from "./components/column-chooser/column-chooser.component";
@NgModule({
  declarations: [TableContainerComponent, ColumnChooserComponent],
  imports: [CdkTableModule, MatTableModule, MatCheckboxModule, MatListModule],
  exports: [TableContainerComponent]
})
export class TableModule {}
