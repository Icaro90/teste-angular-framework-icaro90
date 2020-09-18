import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/utils/common-services/common-services';
import { DialogConfirm } from 'src/app/utils/dialog-confirm/dialog-confirm';
import { Todo } from 'src/app/utils/interface/to-do-interface';
import { User } from 'src/app/utils/interface/user-interface';
import { ToDoDialog } from './to-do-dialog/to-do-dialog';
import { ToDoService } from './to-do.component.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})

export class ToDoComponent implements OnInit {
  users: User[];
  displayedColumns: string[] = ['id', 'title', 'userId', 'completed', 'acctions'];
  dataSource: MatTableDataSource<Todo>;
  confirmDialogRef: MatDialogRef<DialogConfirm>;
  modalTodo: MatDialogRef<ToDoDialog>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private _ToDoService: ToDoService,
    public _matDialog: MatDialog,
    public _snackBar: MatSnackBar,
    private _commonService: CommonService
  ) {

  }

  ngOnInit(): void {
    this._commonService.getUsers().then(result => {
      this.users = result;
    });
  }

  ngAfterViewInit(): void {
    this._ToDoService.getTodos().then(results => {
      this.createNewDataSource(results);
    })
  }

  createNewDataSource(todos: any[]): void {
    this.dataSource = new MatTableDataSource<Todo>(todos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  saveOrEditTodo(todo: Todo): void {
    this.modalTodo = this._matDialog.open(ToDoDialog, {
      disableClose: false,
      data: {
        todo: todo,
        users: this.users
      },
      width: '620px',
      height: '250px'
    });

    this.modalTodo.afterClosed().subscribe(response => {
      if (response) {
        //Chamando apenas a API para teste
        this._ToDoService.saveTodo(response).then(result => {
          this._snackBar.open('Salvo com sucesso!!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        });
        if (response && response.id != undefined) {
          this.editTodo(response);
        } else {
          this.createTodo(response);
        }
      }
    });
  }

  createTodo(object: Todo): void{
    let newId = Math.max(...this.dataSource.data.map(d => d.id));
    object.id = newId + 1;
    this.dataSource.data.push(object);
    this.createNewDataSource(this.dataSource.data);
  }

  editTodo(object: Todo): void{
    let todo = this.dataSource.data.filter(a => a.id == object.id)[0];
    let index = this.dataSource.data.indexOf(todo);
    this.dataSource.data[index] = object;
    this.createNewDataSource(this.dataSource.data);
  }

  deleteTodo(todo: Todo): void {
    this.confirmDialogRef = this._matDialog.open(DialogConfirm, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = "Deseja deletar o To-Do selecionado?"
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._ToDoService.deleteTodo(todo.id).then(result => {
          this._snackBar.open('Deletado com sucesso!!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.dataSource.data = this.dataSource.data.filter(a => a.id != todo.id);
        }).catch(() => {
        });
      }
    });
  }

  getUserName(idUser): any {
    return this.users.filter(u => u.id == idUser)[0].name;
  }
}
