import {Directive, forwardRef} from '@angular/core';
import {FormControl, NG_VALIDATORS} from '@angular/forms';

@Directive({
    selector: '[appValidRut][ngModel],[appValidRut][formControl]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: forwardRef(() => ValidRutDirective), multi: true}
    ]
})
export class ValidRutDirective {

    validator: Function;

    constructor() {
        this.validator = this.validateRut();
    }

    validate(c: FormControl) {
        return this.validator(c);
    }

    clearFormat(value) {
        return value.replace(/[\.\-]/g, '');
    }

    validateRut() {
        return (c: FormControl) => {
            let result: boolean;
            const rut = c.value;

            if (typeof(rut) !== 'string') {
                return {
                    validRut: {
                        valid: false
                    }
                };
            }
            var cRut = this.clearFormat(rut);

            var cDv = cRut.charAt(cRut.length - 1).toUpperCase();
            var nRut = parseInt(cRut.substr(0, cRut.length - 1));
            if (isNaN(nRut)) {
                return {
                    validRut: {
                        valid: false
                    }
                };
            }

            result = this.computeDv(nRut).toString().toUpperCase() === cDv;
            return result ? null : {
                validRut: {
                    valid: false
                }
            };

        };
    }

    computeDv(rut) {

        var suma = 0;
        var mul = 2;
        if (typeof(rut) !== 'number') {
            return;
        }
        rut = rut.toString();
        for (var i = rut.length - 1; i >= 0; i--) {
            suma = suma + rut.charAt(i) * mul;
            mul = ( mul + 1 ) % 8 || 2;
        }
        switch (suma % 11) {
            case 1    :
                return 'k';
            case 0    :
                return 0;
            default    :
                return 11 - (suma % 11);
        }
    }
}
