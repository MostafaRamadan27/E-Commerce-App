import { Pipe, PipeTransform } from '@angular/core';
import { Generic } from '../../core/models/generic.interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform<T1>(arr:Generic<T1> ):T1[]  {
  
    const {keys , list ,searchText} = arr

if (!searchText){
  return list
}

const lower = searchText.toLowerCase()

    return list.filter((item)=> keys.some((key)=> String(item[key] ).toLowerCase().includes(lower)    )    )
  }

}
