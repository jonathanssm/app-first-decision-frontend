import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {User} from "../../../model/dto/user";
import {ModalService} from "../../../shared/component/modal/modal.service";
import {Router} from "@angular/router";
import {SpinnerService} from "../../../shared/component/spinner/spinner.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public form: FormGroup = new FormGroup({});
  public nameControl: FormControl = new FormControl({});
  public emailControl: FormControl = new FormControl({});
  public passwordControl: FormControl = new FormControl({});
  public passwordConfirmationControl: FormControl = new FormControl({});

  public passwordErrorMessage: string = 'Senha deve ter de 6-20 caracteres';
  public emailErrorMessage: string = 'Email é obrigatório';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modalService: ModalService,
    private spinnerService: SpinnerService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initForm();

    this.form.get('email')?.valueChanges.subscribe(() => {
      this.changeEmailErrorMessage();
    });

    this.form.get('password')?.valueChanges.subscribe(() => {
      this.markPasswordValid();
    });

    this.form.get('passwordConfirmation')?.valueChanges.subscribe(() => {
      this.validPassword();
    });
  }

  onSubmit(): void {
    const user: User = {
      name: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    }

    this.spinnerService.showSpinner();
    this.userService.insert(user).subscribe((resp: User) => {
      this.modalService.showMessage(`${resp.name}, seu cadastro foi realizado com sucesso`);
      this.router.navigate(['/sign-in']).then();
      this.spinnerService.hideSpinner();
    });
  }

  private changeEmailErrorMessage(): void {
    if (this.form.get('email')?.value.length > 0 && this.form.get('email')?.invalid) {
      this.emailErrorMessage = "Email inválido";
    }

    if (this.form.get('email')?.value.length === 0) {
      this.emailErrorMessage = 'Email é obrigatório';
    }
  }

  private validPassword(): void {
    if (this.form.get('passwordConfirmation')?.invalid) {
      this.passwordErrorMessage = 'Senha deve ter de 6-20 caracteres';
      this.markPasswordInvalid();
    }

    if (this.form.get('password')?.value != this.form.get('passwordConfirmation')?.value) {
      this.passwordErrorMessage = 'Senhas não conferem';
      this.markPasswordInvalid();
    }
  }

  private markPasswordInvalid(): void {
    this.form.get('passwordConfirmation')?.markAsTouched();
    this.form.get('passwordConfirmation')?.setErrors({'customError': true});
  }

  private markPasswordValid(): void {
    if (this.form.get('password')?.value === this.form.get('passwordConfirmation')?.value) {
      this.form.get('passwordConfirmation')?.setErrors(null);
    } else {
      this.markPasswordInvalid();
    }
  }

  private initForm(): void {
    this.nameControl = this.fb.control(
      '', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
    );

    this.emailControl = this.fb.control(
      '', [Validators.required, Validators.email]
    );

    this.passwordControl = this.fb.control(
      '', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]
    );

    this.passwordConfirmationControl = this.fb.control(
      '', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]
    );

    this.form = this.fb.group({
      name: this.nameControl,
      email: this.emailControl,
      password: this.passwordControl,
      passwordConfirmation: this.passwordConfirmationControl
    });
  }

}
