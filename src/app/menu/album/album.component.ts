import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { DialogConfirm } from 'src/app/utils/dialog-confirm/dialog-confirm';
import { AlbumDialog } from './album-dialog/album-dialog';
import { AlbumService } from './album.component.service';
import { Album } from '../../utils/interface/album-interface';
import { CommonService } from 'src/app/utils/common-services/common-services';
import { User } from 'src/app/utils/interface/user-interface';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  users: User[];
  displayedColumns: string[] = ['id', 'title', 'userId', 'acctions'];
  dataSource: MatTableDataSource<Album>;
  confirmDialogRef: MatDialogRef<DialogConfirm>;
  modalAlbum: MatDialogRef<AlbumDialog>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private _albumService: AlbumService,
    public _matDialog: MatDialog,
    public _snackBar: MatSnackBar,
    public _commonService: CommonService,
  ) {

  }

  ngOnInit(): void {
    this._commonService.getUsers().then(result => {
      this.users = result;
    });
  }

  ngAfterViewInit(): void {
    this._albumService.getAlbuns().then(results => {
      this.createNewDataSource(results);
    });
  }

  createNewDataSource(albums: any[]): void {
    this.dataSource = new MatTableDataSource<Album>(albums);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  saveOrEditAlbum(album: Album): void {
    this.modalAlbum = this._matDialog.open(AlbumDialog, {
      disableClose: false,
      data: {
        album: album,
        users: this.users
      },
      width: '500px',
      height: '250px'
    });

    this.modalAlbum.afterClosed().subscribe(response => {
      if (response) {
        this._albumService.saveAlbum(response).then(result => {
          this._snackBar.open('Salvo com sucesso!!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        });
        if (response && response.id != undefined) {
          this.editAlbum(response);
        } else {
          this.createAlbum(response);
        }
      }
    });
  }

  createAlbum(object: Album): void {
    let newId = Math.max(...this.dataSource.data.map(d => d.id));
    object.id = newId + 1;
    this.dataSource.data.push(object);
    this.createNewDataSource(this.dataSource.data);
  }

  editAlbum(object: Album): void {
    let album = this.dataSource.data.filter(a => a.id == object.id)[0];
    let index = this.dataSource.data.indexOf(album);
    this.dataSource.data[index] = object;
    this.createNewDataSource(this.dataSource.data);
  }

  deleteAlbum(album: Album): void {
    this.confirmDialogRef = this._matDialog.open(DialogConfirm, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = "Deseja deletar o album selecionado?"
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._albumService.deleteAlbum(album.id).then(result => {
          this._snackBar.open('Deletado com sucesso!!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.dataSource.data = this.dataSource.data.filter(a => a.id != album.id);
        }).catch(() => {
        });
      }
    });
  }

  getUserName(idUser): any {
    return this.users.filter(u => u.id == idUser)[0].name;
  }

}

