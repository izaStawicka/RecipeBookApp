import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
  })

export class HeaderComponent{
  @Output() featureLoaded = new EventEmitter<string>()

  onLoadFeature(feature: string){
    this.featureLoaded.emit(feature)
  }
}
