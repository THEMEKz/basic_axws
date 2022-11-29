import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core'
import { AxAuthenticationService } from '@atlasx/core/authentication'

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CallbackComponent implements OnInit {
  constructor(private authService: AxAuthenticationService) {}

  ngOnInit(): void {
    this.authService.authorizeCallback()
  }
}
