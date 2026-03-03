import { initFlowbite } from 'flowbite';
import { FlowbiteService } from './../../../core/services/flowbite';
import { Component, computed, inject, Input, PLATFORM_ID, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/service/auth.service';
import { CartService } from '../../../feature/cart/services/cart.service';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
 constructor(private flowbiteService: FlowbiteService) {}
 private readonly authService = inject(AuthService)
 private readonly cartService = inject(CartService)
 private readonly id = inject(PLATFORM_ID)
count : Signal<number> = computed(()=> this.cartService.countNumber()) ;
 @Input({required :true }) isLogin! : boolean


  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    if(isPlatformBrowser(this.id)){
    this.getAllDataCart()
    }
  }



getAllDataCart():void{
  this.cartService.getLoggedUserCart().subscribe({
next:(res)=>{
this.cartService.countNumber.set(res.numOfCartItems)
}

  }
  )
}


  signOut(){
  this.authService.signOut();
}
}


