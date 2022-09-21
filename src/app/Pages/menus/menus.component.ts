import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ServiceService } from 'src/app/shared/service.service';
import { FileUploader } from 'ng2-file-upload';
import { MENUS } from 'src/app/shared/model/menus';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {
  @ViewChild("contentEdit") contentEdit:any;
  submitted: boolean = true;
  submittedAdd = false;
  supportedFile: boolean = true;
  isUploading: boolean = true;
  isLoading: boolean = false;
  hasBaseDropZoneOver: boolean | undefined;
  uploader: FileUploader | any;
  imageSrc: any;
  files: any;
  DataMenus: MENUS | any;
  FirstItem: MENUS | any;
  idItem: FormGroup | any;
  MenuForm: FormGroup | any;
  UpdataForm: FormGroup | any;
  allowedFileType: string[] = [
    "image/png",
    "image/jpeg",
    "image/jpg"
  ];
  constructor(
    public Service: ServiceService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getData();
    this.initForm();
    this.EditForm();
    this.IDForm();
    this.initUploader();
    this.getfirstItem(this.idItem.value?.id);
  }

  initForm() {
    this.MenuForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      categorys: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
    });
  }
  private EditForm(): void {
    this.UpdataForm = this.formBuilder.group({
      id: [""],
      title: [""],
      categorys: [""],
      description: [""],
      price: [""]
    });
  }
  initUploader() {
    this.uploader = new FileUploader({ url: "", autoUpload: false });
    console.log(this.uploader);
  }

  IDForm() {
    this.idItem = new FormGroup({
      id: new FormControl(1),
    });
  }
  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
  openEdit(data:any) {
    console.log(data)
    this.modalService.open(this.contentEdit);
    this.UpdataForm.controls["id"].setValue(data.id);
    this.UpdataForm.controls["title"].setValue(data.title);
    this.UpdataForm.controls["categorys"].setValue(data.categorys);
    this.UpdataForm.controls["description"].setValue(data.description);
    this.UpdataForm.controls["price"].setValue(data.price);
  }
  // get Data 
  getData() {
    this.Service.getData().subscribe(
      (Respone: any) => {
        console.log('Respone', Respone);
        this.DataMenus = Respone;
      }
    )
  }
  getfirstItem(id: any) {
    this.idItem.value.id = id;
    console.log(this.idItem.value.id);
    this.Service.firstItem(this.idItem.value).subscribe(
      (Respone: any) => {
        console.log('FirstItem', Respone);
        this.FirstItem = Respone[0];
      }
    )
  }

  Delete(id: any) {
    this.idItem.value.id = id;
    console.log(this.idItem.value.id);
    this.isLoading = true;
    this.Service.Delete(this.idItem.value).subscribe(
      (Respone: any) => {
        this.isLoading = false;
        this.getData();
        this.getfirstItem(this.idItem.value?.id);
        console.log('FirstItem', Respone);
      },
      (err) => {
        this.isLoading = false;
        console.log('res error', err);
      },
      ()=>{
        this.isLoading = false;
        this.getData();
        this.getfirstItem(this.idItem.value?.id);
      }
    )
  }
  updateDate() {
    console.log('form', this.UpdataForm);
    const uploadItems: any[] = this.uploader.getNotUploadedItems(); // Uploader's uploaded items
    console.log('uploader item', uploadItems);
    const formData = new FormData(this.UpdataForm.nativeElement); // Holds the files and data
    uploadItems.forEach((item) => {  formData.append("image", item._file)});
    formData.append("id",this.UpdataForm.get("id").value);
    formData.append("title",this.UpdataForm.get("title").value);
    formData.append("categorys", this.UpdataForm.get("categorys").value);
    formData.append("description", this.UpdataForm.get("description").value);
    formData.append("price", this.UpdataForm.get("price").value);
    console.log(formData);
    this.isLoading = true;
    this.Service.EditData(formData).subscribe(
      (res: any) => {
        this.isLoading = false;
        console.log('res success', res);
      },
      (err) => {
        this.isLoading = false;
        this.isUploading = false;
        console.log('res error', err);
      },
      ()=>{
        this.isLoading = false;
        this.getData();
        this.modalService.dismissAll();
      }
    );
  }
  onFileSelected(event: any) {
    const uploadItems: any[] = this.uploader.queue; // Uploader's uploaded items
    console.log(uploadItems);
    uploadItems.forEach((file) => {
      if (this.allowedFileType.indexOf(file.file.type) > -1) {
        console.log(file.file.type);
      } else {
        setTimeout(() => {
          console.log(file);
          this.supportedFile = true;
        }, 2000);
        this.supportedFile = false;
        file.remove();
      }
    });
    console.log('uploadItems' , uploadItems[0].FileItem.file)
    this.imageSrc = uploadItems[0].FileItem;
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  addNewMenu() {
    console.log('form', this.MenuForm);
    const uploadItems: any[] = this.uploader.getNotUploadedItems(); // Uploader's uploaded items
    console.log('uploader item', uploadItems);
    const formData = new FormData(this.MenuForm.nativeElement); // Holds the files and data
    uploadItems.forEach((item) => {  formData.append("image", item._file)});
    formData.append("title",this.MenuForm.get("title").value);
    formData.append("categorys", this.MenuForm.get("categorys").value);
    formData.append("description", this.MenuForm.get("description").value);
    formData.append("price", this.MenuForm.get("price").value);
    console.log(formData);
    this.submittedAdd = true;
    this.isLoading = true;
    this.Service.AddMenu(formData).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.getData();
        this.getfirstItem(this.idItem.value?.id);
        console.log('res success', res);
      },
      (err) => {
        this.isLoading = false;
        this.isUploading = false;
        console.log('res error', err);
      },
      ()=>{
        this.isLoading = false;
        this.getData();
        this.modalService.dismissAll();
      }
    );
  }

  get addSaveValid() {
    return this.MenuForm.controls;
  }
}
