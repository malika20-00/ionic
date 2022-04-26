import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import { FireserviceService } from '../../services/fireservice.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  formationlist:any


  today: number = Date.now()



  async addNewItem() {
    const modal = await this.modalCtrl.create({
      component: AddNewTaskPage,
    })
    modal.onDidDismiss().then(newTaskObj =>(
     this.formationlist.push(newTaskObj.data)
    ))
    return await modal.present()
  }

  delete(index){
    this.formationlist.splice(index, 1)
    console.log(this.formationlist);
  }

  constructor(
    public modalCtrl:ModalController,
    public fireService:FireserviceService,
    public router:Router) {

       this.fireService.getMarker().subscribe(res => {
        this.formationlist = res.map(e => {
        return {
          docid: e.payload.doc.id,
          itemName: e.payload.doc.data()["itemName"],
          itemCategory: e.payload.doc.data()["itemCategory"],
          itemPriority: e.payload.doc.data()["itemPriority"],
          itemDueDate: e.payload.doc.data()["itemDueDate"]
        }
        })
        console.log(this.formationlist);

      },(err:any) => {
        console.log(err)
      })

    }

    showDetails(docid){
      this.router.navigateByUrl('details/' + docid);
    }
}
