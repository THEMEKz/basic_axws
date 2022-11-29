import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core'
import { AxAuthenticationService } from '@atlasx/core/authentication'
import { AxConfigurationService } from '@atlasx/core/configuration'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HomeComponent implements OnInit {
  constructor(public configService: AxConfigurationService, public authService: AxAuthenticationService) {}

  ngOnInit(): void {}
}
