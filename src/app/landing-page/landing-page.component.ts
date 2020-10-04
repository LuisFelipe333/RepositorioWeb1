import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service'

//Decoradores
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})

//clase principal de la logica de negocios

export class LandingPageComponent implements OnInit {

  products = [];
  info = "No hay datos";
  boton="Enviar";

  constructor(private serviceService : ServiceService) { }

  ngOnInit(): void {

    

  }


  onSendMe()
  {
    this.serviceService.getProduct("products/").subscribe((data : any[]) => {
      console.log(data);
      this.products=data;
      this.boton="Limpiar";

    }); 
    //this.info="xdxdxd";
  }

  onCleanMe(){
    this.products=[];
  }

}
