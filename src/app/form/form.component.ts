import { Component, OnDestroy } from '@angular/core';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Le but de cette exercice est d'améliorer un chouilla le fonctionnement, on est sur une méthode de fonctionnement assez ancienne et Angular est un monde merveilleux plein d'évolution, votre but sera donc d'améliorer ce code de merde fait par mes soins ( et oui j'ai pris plaisir à écrire un code de ce genre :D)
 * J'ai rajouté volontairement des indices pour ceux qui n'ont pas vraiment l'idée de quoi faire, vous n'êtes pas obligé de les consulter
 */

@Component({
  selector: 'sip-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.scss'],
})
export class FormComponent implements OnDestroy {
  public placeholder = 'Saississez un nombre';
  public formControl = new FormControl(15, [
    Validators.required,
    Validators.min(0),
  ]);
  public result = undefined;
  public subscription = new Subscription();

  constructor() {
    this.subscription.add(
      this.formControl.valueChanges
        .pipe(filter(() => this.result))
        .subscribe(() => {
          this.result = undefined;
        })
    );
  }

  public onSubmit() {
    this.result = 'Ca marche, bon il a pas de jambe mais ça marche';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
