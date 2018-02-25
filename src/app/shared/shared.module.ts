import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityPipe } from './pipes/city.pipe';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { ExitGuard } from './exit/exit.guard';
import { CustomPreloadStrategy } from './preloading/custom-preload-strategy';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { AuthInterceptor } from './auth/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TabComponent } from './tabbed-pane/tab/tab.component';
import { TabbedPaneComponent } from "./tabbed-pane/tabbed-pane/tabbed-pane.component";
import { PagerComponent } from './tabbed-pane/pager/pager.component';
import { BadComponent } from './tabbed-pane/bad/bad.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CityPipe,
    TabComponent,
    TabbedPaneComponent,
    PagerComponent,
    BadComponent
  ],

  exports: [
    CityPipe,
    TabComponent,
    TabbedPaneComponent,
    BadComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        CustomPreloadStrategy,
        ExitGuard,
        AuthService,
        AuthGuard,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    }
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    }
  }

}
