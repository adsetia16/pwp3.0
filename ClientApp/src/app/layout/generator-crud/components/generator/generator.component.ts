import { Component, OnInit } from '@angular/core';
import { PuiSnackbarService } from '../../../../shared/pusintek-ui/components/pui-snackbar/pui-snackbar.service';
import { MatDialog } from '@angular/material';
import { AttributeListComponent } from '../attribute-list/attribute-list.component';
import { EntityService } from '../../services/entity.service';
import { PuiConfirmDialogService } from '../../../../shared/pusintek-ui/components/pui-confirm-dialog/pui-confirm-dialog.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss'],
  animations: fuseAnimations,
  providers: [EntityService, PuiSnackbarService, PuiConfirmDialogService]
})
export class GeneratorComponent implements OnInit {

  models: string [] = []
  selectedModel: string = ""
  selectedAttr: string[] = []
  featuresArray: any[] = [
    {
    value: 'lazy_load',
    name: 'Lazy Load'
  },
  {
   value: 'server_pagination',
   name: 'Server Pagination'
  }]
  primaryKey: string = ""
  featureSelected: string[] = []
  moduleExist = false
  constructor(
    private _fuseSidebarService: FuseSidebarService,
    public snackBar: PuiSnackbarService,
    public service: EntityService,
    public dialog: MatDialog,
    public dialogsService: PuiConfirmDialogService
  ) { }

  ngOnInit() {
    this.service.getAll().subscribe((result) => {
      this.models = result
    })
  }

  loadAttribute() {
    if (this.selectedModel  === "") {
      this.snackBar.showSnackBar("error", "Pilih Entity terlebih dahulu!");
      return
    }
    this.selectedAttr = []
    let dialog = this.dialog.open(AttributeListComponent, {
      data: { model: this.selectedModel }
  })

    dialog.afterClosed().subscribe((result) => {
      if (result != null) {
        this.selectedAttr = result.attr
        this.primaryKey = result.primaryKey
      }
    })
  }

  attrSelected(feature: string): boolean{
    return this.featureSelected.indexOf(feature) != -1
  }

  selectChange(feature: any)
  {
    this.featureSelected = feature.selectedOptions.selected.map(x => x.value)
  }

  checkModuleExist(){
    this.service.CheckModuleExist(this.selectedModel).subscribe((result) => {
      this.moduleExist = result.Exist === "True"
    })
  }

  onSaveForm(){
    if (this.selectedAttr.length === 0 || this.primaryKey == "") {
      this.snackBar.showSnackBar("error", "Pilih Atribut terlebih dahulu!");
    }
    const params = {
      Model: this.selectedModel,
      Attribute: this.selectedAttr,
      Feature: this.featureSelected,
      PrimaryKey: this.primaryKey
    }
    if(this.moduleExist){
      this.dialogsService
      .confirm('Konfirmasi', 'Module ini sudah ada, apakah anda yakin untuk menimpa perubahan yang sudah ada ?')
      .subscribe(accept => {
        if (accept) {
          this.service.create(params).subscribe((result) => {
            this.snackBar.showSnackBar('success', 'Silahkan tunggu dan cek sampai component berhasil digenerate')
          })
        }
      })
    }else{
      this.service.create(params).subscribe((result) => {
        this.snackBar.showSnackBar('success', 'Silahkan tunggu dan cek sampai component berhasil digenerate')
      })
    }
  }


  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

}
