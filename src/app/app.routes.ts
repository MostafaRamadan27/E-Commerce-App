import { authGuard } from './core/guards/auth-guard';
import { Routes } from '@angular/router';
import { Login } from './core/auth/login/login';
import { Register } from './core/auth/register/register';
import { AuthLayout } from './core/layout/auth-layout/auth-layout';
import { BlankLayout } from './core/layout/blank-layout/blank-layout';
import { Home } from './feature/home/home';
import { Products } from './feature/products/products';
import { Cart } from './feature/cart/cart';
import { Category } from './feature/category/category';
import { Details } from './feature/details/details';
import { Brands } from './feature/brands/brands';
import { Checkout } from './feature/checkout/checkout';
import { Notfound } from './feature/notfound/notfound';
import { isloggedGuard } from './core/guards/islogged-guard';
import { AllordersComponent } from './feature/allorders/allorders.component';
import { ForgetPasswordComponent } from './core/auth/forget-password/forget-password.component';

export const routes: Routes = [
    {path:'', redirectTo:'home' , pathMatch:"full"},
{path:"" , component:AuthLayout ,canActivate:[isloggedGuard] , children:[
    {path:"login" , loadComponent:()=>import('./core/auth/login/login').then((c)=>c.Login), title:"Login page"},
    {path:"register" , loadComponent:()=>import('./core/auth/register/register').then((c)=>c.Register), title:"register page"},
    {path:"forget" , loadComponent:()=>import('./core/auth/forget-password/forget-password.component').then((c)=>c.ForgetPasswordComponent), title:"forgetPassword page"},

]},
{path:"" , component:BlankLayout , canActivate:[authGuard]  , children:[
    {path:"home" , loadComponent:()=>import('./feature/home/home').then((c)=>c.Home), title:"Home page"},
    {path:"products" , loadComponent:()=>import('./feature/products/products').then((c)=>c.Products), title:"Products page"},
    {path:"cart" , loadComponent:()=>import('./feature/cart/cart').then((c)=>c.Cart), title:"Cart page"},
    {path:"categories" , loadComponent:()=>import('./feature/category/category').then((c)=>c.Category), title:"Category page"},
    {path:"allorders" , loadComponent:()=>import('./feature/allorders/allorders.component').then((c)=>c.AllordersComponent), title:"allorders page"},
    {path:"details/:id" , loadComponent:()=>import('./feature/details/details').then((c)=>c.Details), title:"Details page"},
    {path:"brands" , loadComponent:()=>import('./feature/brands/brands').then((c)=>c.Brands), title:"Brands page"},
    {path:"checkout/:id" , loadComponent:()=>import('./feature/checkout/checkout').then((c)=>c.Checkout), title:"Checkout page"},
] },
{
    path:"**" , component:Notfound , title:"Notfound page"
}




];
