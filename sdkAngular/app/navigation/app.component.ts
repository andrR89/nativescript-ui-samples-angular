import { Component } from "@angular/core";
import { Routes } from '@angular/router';
import { ExamplesListDepth1Component, ExamplesListDepth2Component, ExamplesListDepth3Component } from "./examples-list/examples-list.component";
import { OptionsComponent } from "./options/options.component";
import { ExampleItem } from "./exampleItem";
import { ExampleItemService } from "./exampleItemService.service";
import { AppExampleComponents } from "./appExamples";
import { EXAMPLEITEMS } from "./mock-exampleItems";

@Component({
  selector: "tk-app",
  template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent {

}

export function createRouteEntryArray(components) {
  var service = new ExampleItemService;
  APP_ROUTES.push({ path: "", redirectTo: "examples-depth-1/root/root", pathMatch: 'full' });
  APP_ROUTES.push({ path: "examples-depth-1/:parentTitle/:tappedTitle", component: ExamplesListDepth1Component });
  APP_ROUTES.push({ path: "examples-depth-2/:parentTitle/:tappedTitle", component: ExamplesListDepth2Component });
  APP_ROUTES.push({ path: "examples-depth-3/:parentTitle/:tappedTitle", component: ExamplesListDepth3Component });
  APP_ROUTES.push({ path: "options", component: OptionsComponent });

  for (let component of components) {
    var exampleItem = service.getExampleItemByComponent(EXAMPLEITEMS, component.name);
    if (exampleItem) {
      APP_ROUTES.push({ path: exampleItem.path, component: component, data: { title: exampleItem.title } });
    }
  }
}

export const APP_ROUTES: Routes = [];