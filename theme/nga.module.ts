import {NgModule} from '@angular/core';
import {NgaComponent} from './nga.component';
import {Name2AvatarPipe} from './pipes/name2Avatar/name2Avatar.pipe';
import {NumFormat} from './pipes/numFormat/numFormat.pipe';
import {ScrollComponent} from './components/scroll/scroll.component';

@NgModule({
  declarations: [
    NgaComponent,
    Name2AvatarPipe,
    NumFormat,
    ScrollComponent,
  ],
  imports: [],
  entryComponents: [],
  exports: [
    Name2AvatarPipe,
    NumFormat,
    ScrollComponent,
  ]
})

export class NgaModule {
}
