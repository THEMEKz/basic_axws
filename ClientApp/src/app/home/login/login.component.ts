import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AxAuthenticationService } from '@atlasx/core/authentication'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

  constructor(formBuilder: FormBuilder, private authService: AxAuthenticationService) {
    // Create form group with required validation.
    this.loginForm = formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    })
  }

  ngOnInit(): void {}

  signIn() {
    // Mark form controls as dirty.
    for (const key in this.loginForm.controls) {
      if (this.loginForm.contains(key)) {
        this.loginForm.controls[key].markAsDirty()
        this.loginForm.controls[key].updateValueAndValidity()
      }
    }

    if (this.loginForm.valid) {
      const formValues = this.loginForm.getRawValue()
      this.authService
        .completeAuthorizationPasswordRequest(formValues.username, formValues.password)
        .then(() => {
          this.authService.authorizeCallback()
        })
        .catch(() => {
          window.alert(`User doesn't exist, or the username or password is incorrect.`)
        })
    } else {
      window.alert('Username and Password cannot be empty.')
    }
  }
}
