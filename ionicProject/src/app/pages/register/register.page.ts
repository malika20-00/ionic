import { Component, OnInit } from '@angular/core';
import { FireserviceService } from '../../services/fireservice.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public email:any;
  public password:any;
  public prenom:any;
  public nom:any;
  constructor(
    public router:Router,
    public fireService:FireserviceService

  ) { }
  ngOnInit() {}

  register(){
    this.fireService.register({email:this.email,password:this.password}).then(res=>{
      if(res.user.uid){
        let data = {
          email:this.email,
          password:this.password,
          prenom:this.prenom,
          nom:this.nom,
          uid:res.user.uid
        }
        this.fireService.saveDetails(data).then(res=>{
         alert('Account Created!');
         this.router.navigateByUrl('home');
        },err=>{
          console.log(err);
        })
      }
    },err=>{
      alert(err.message);

      console.log(err);
    })
  }


  // infoGeneral: FormGroup;
  // constructor(
  //   private fb: FormBuilder,
  //   private loadingController: LoadingController,
  //   private alertController: AlertController,
  //   private fireserviceService: FireserviceService,
  //   private router: Router
  // ) { }

  // get email() {
  //   return this.infoGeneral.get('email');
  // }
  // get password() {
  //   return this.infoGeneral.get('password');
  // }
  // get prenom() {
  //   return this.infoGeneral.get('prenom');
  // }
  // get nom() {
  //   return this.infoGeneral.get('nom');
  // }

  // ngOnInit() {

  //   this.infoGeneral = this.fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.minLength(6)]],
  //     prenom: ['', [Validators.required, Validators.minLength(2)]],
  //      nom: ['', [Validators.required, Validators.minLength(2)]],
  //      reserve:null


  //   });
  // }
  // async register() {
  //   const loading = await this.loadingController.create();
  //   await loading.present();
  //   const user = await this.fireserviceService.register(this.infoGeneral.value);
  //   await loading.dismiss();

  //   if (user) {
  //     this.router.navigateByUrl('/home', { replaceUrl: true });
  //   } else {
  //     this.showAlert('l\'inscription a été échoué', 'Veuillez essayer à nouveau!');
  //   }

  //  }


  // async showAlert(header, message) {
  //   const alert = await this.alertController.create({
  //     header,
  //     message,
  //     buttons: ['OK']
  //   });
  //   await alert.present();
  // }

}
