import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {UserCredential} from "../../../model/dto/user-credential";
import {ModalService} from "../../../shared/component/modal/modal.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

    public form: FormGroup = new FormGroup({});
    public emailControl: FormControl = new FormControl({});
    public passwordControl: FormControl = new FormControl({});

    public emailErrorMessage: string = 'Email é obrigatório';

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private modalService: ModalService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.initForm();

        this.form.get('email')?.valueChanges.subscribe(() => {
            this.changeEmailErrorMessage();
        });
    }

    onSubmit(): void {
        const userCredential: UserCredential = {
            email: this.form.get('email')?.value,
            password: this.form.get('password')?.value
        }

        this.userService.login(userCredential).subscribe((resp: boolean) => {
            if (resp) {
                this.modalService.showMessage("Login realizado com sucesso");
                this.router.navigate(['/home']).then();
            } else {
                this.modalService.showMessage("E-mail ou Senha incorretos");
            }
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

    private initForm(): void {
        this.emailControl = this.fb.control(
            '', [Validators.required, Validators.email]
        );

        this.passwordControl = this.fb.control(
            '', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]
        );

        this.form = this.fb.group({
            email: this.emailControl,
            password: this.passwordControl
        });
    }

}
