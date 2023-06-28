(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CoreEngine_1 = require("./CoreEngine");
var analizadorEntrada = new CoreEngine_1.AnalizadorEntrada();
var botonConvertir = document.getElementById('boton-convertir');
var opcionesDeEntrada = document.getElementsByName('sistema-de-origen');
var opcionesDeSalida = document.getElementsByName('sistema-de-destino');
botonConvertir.addEventListener('click', convertirEntrada);
var _loop_1 = function (op) {
    op.addEventListener('click', function () { bloquearOpcion(op.id); });
};
for (var _i = 0, opcionesDeEntrada_1 = opcionesDeEntrada; _i < opcionesDeEntrada_1.length; _i++) {
    var op = opcionesDeEntrada_1[_i];
    _loop_1(op);
}
var _loop_2 = function (op) {
    op.addEventListener('click', function () { bloquearOpcion(op.id); });
};
for (var _a = 0, opcionesDeSalida_1 = opcionesDeSalida; _a < opcionesDeSalida_1.length; _a++) {
    var op = opcionesDeSalida_1[_a];
    _loop_2(op);
}
function bloquearOpcion(opcionSeleccionada) {
    var index = opcionSeleccionada.substring(opcionSeleccionada.length - 3);
    var listaContraria;
    if (opcionSeleccionada.startsWith('origen')) {
        listaContraria = opcionesDeSalida;
    }
    else {
        listaContraria = opcionesDeEntrada;
    }
    for (var _i = 0, listaContraria_1 = listaContraria; _i < listaContraria_1.length; _i++) {
        var op = listaContraria_1[_i];
        if (op.id.endsWith(index)) {
            var botonDeRadio = op;
            botonDeRadio.checked = false;
        }
    }
}
function comprobarGramatica(valorEntrada, caracteresAdmitidos) {
    var cumpleConLaGramatica = true;
    for (var _i = 0, _a = valorEntrada.toString(); _i < _a.length; _i++) {
        var digito = _a[_i];
        if (!caracteresAdmitidos.includes(digito)) {
            cumpleConLaGramatica = false;
            break;
        }
    }
    if (!cumpleConLaGramatica) {
        alert("Los valores introducidos no son validos.");
        throw new Error();
    }
}
function convertirEntrada() {
    document.getElementById('origen-valor').innerText = '';
    document.getElementById('origen-sistema').innerHTML = '';
    document.getElementById('destino-valor').innerText = '';
    document.getElementById('destino-sistema').innerHTML = '';
    var entradaUsuario = document.getElementById('campo-de-texto');
    var formatoFuente = document.querySelector('input[name="sistema-de-origen"]:checked');
    var formatoSalida = document.querySelector('input[name="sistema-de-destino"]:checked');
    var valorEntrada = entradaUsuario.value.replace(/\s/g, '');
    ;
    var valorSalida = '';
    var etiquetaFuente = formatoFuente.value.substring(formatoFuente.value.length - 2);
    var etiquetaSalida = formatoSalida.value.substring(formatoSalida.value.length - 2);
    switch (formatoFuente.value) {
        case 'base02':
            comprobarGramatica(valorEntrada, ['0', '1']);
            switch (formatoSalida.value) {
                case 'base08':
                    valorSalida = analizadorEntrada.convertirNumeroBinarioAOctal(valorEntrada);
                    break;
                case 'base10':
                    valorSalida = analizadorEntrada.convertirNumeroBinarioADecimal(valorEntrada);
                    break;
                case 'base16':
                    valorSalida = analizadorEntrada.convertirNumeroBinarioAHexadecimal(valorEntrada);
                    break;
            }
            break;
        case 'base08':
            comprobarGramatica(valorEntrada, ['0', '1', '2', '3', '4', '5', '6', '7']);
            switch (formatoSalida.value) {
                case 'base02':
                    valorSalida = analizadorEntrada.convertirNumeroOctalABinario(valorEntrada);
                    break;
                case 'base10':
                    valorSalida = analizadorEntrada.convertirNumeroOctalADecimal(valorEntrada);
                    break;
                case 'base16':
                    valorSalida = analizadorEntrada.convertirNumeroOctalAHexadecimal(valorEntrada);
                    break;
            }
            break;
        case 'base10':
            comprobarGramatica(valorEntrada, ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
            switch (formatoSalida.value) {
                case 'base02':
                    valorSalida = analizadorEntrada.convertirNumeroDecimalABinario(valorEntrada);
                    break;
                case 'base08':
                    valorSalida = analizadorEntrada.convertirNumeroDecimalAOctal(valorEntrada);
                    break;
                case 'base16':
                    valorSalida = analizadorEntrada.convertirNumeroDecimalAHexadecimal(valorEntrada);
                    break;
            }
            break;
        case 'base16':
            comprobarGramatica(valorEntrada, ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']);
            switch (formatoSalida.value) {
                case 'base02':
                    valorSalida = analizadorEntrada.convertirNumeroHexadecimalABinario(valorEntrada);
                    break;
                case 'base08':
                    valorSalida = analizadorEntrada.convertirNumeroHexadecimalAOctal(valorEntrada);
                    break;
                case 'base10':
                    valorSalida = analizadorEntrada.convertirNumeroHexadecimalADecimal(valorEntrada);
                    break;
            }
            break;
    }
    document.getElementById('origen-valor').innerText = entradaUsuario.value;
    document.getElementById('origen-sistema').innerHTML = '<span>Base <br><span class="texto-resaltado">' + etiquetaFuente + '</span></span>';
    document.getElementById('destino-valor').innerText = valorSalida;
    document.getElementById('destino-sistema').innerHTML = '<span>Base <br><span class="texto-resaltado">' + etiquetaSalida + '</span></span>';
}

},{"./CoreEngine":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalizadorEntrada = void 0;
var CalculadoraBinaria = /** @class */ (function () {
    function CalculadoraBinaria() {
    }
    CalculadoraBinaria.prototype.convertirBinarioAOctal = function (enteroBase02) {
        var enteroBase08 = 0;
        var aux = '';
        var longuitudDeseada = Math.ceil(enteroBase02.length / 3) * 3;
        if (longuitudDeseada != enteroBase02.length) {
            enteroBase02 = enteroBase02.padStart(longuitudDeseada, '0');
        }
        for (var i = 0; i < longuitudDeseada - 2; i += 3) {
            var segmento = '';
            segmento += enteroBase02.charAt(i);
            segmento += enteroBase02.charAt(i + 1);
            segmento += enteroBase02.charAt(i + 2);
            aux += this.convertirBinarioADecimalEntero(segmento);
        }
        enteroBase08 = aux;
        return enteroBase08;
    };
    CalculadoraBinaria.prototype.convertirOctalABinario = function (enteroBase08) {
        var enteroBase02 = '';
        for (var _i = 0, _a = enteroBase08.toString(); _i < _a.length; _i++) {
            var digito = _a[_i];
            var segmento = this.convertirDecimalEnteroABinario(digito);
            if (segmento.length < 3) {
                segmento = segmento.padStart(3, '0');
            }
            enteroBase02 += segmento;
        }
        return enteroBase02;
    };
    CalculadoraBinaria.prototype.convertirBinarioADecimalEntero = function (enteroBase02) {
        var enteroBase10 = 0;
        for (var i = 0; i < enteroBase02.length; i++) {
            var indiceActual = (enteroBase02.length - 1) - i;
            enteroBase10 += (parseFloat(enteroBase02.charAt(indiceActual)) * Math.pow(2, i));
        }
        return enteroBase10;
    };
    CalculadoraBinaria.prototype.convertirDecimalEnteroABinario = function (enteroBase10) {
        var enteroBase02 = '';
        var aux = '';
        var resultadoCociente = enteroBase10;
        do {
            if (resultadoCociente % 2 == 0) {
                aux += '0';
            }
            else {
                aux += '1';
                resultadoCociente--;
            }
            resultadoCociente /= 2;
        } while (resultadoCociente > 0);
        for (var i = 0; i < aux.length; i++) {
            var indiceActual = (aux.length - 1) - i;
            enteroBase02 += aux.charAt(indiceActual);
        }
        return enteroBase02;
    };
    CalculadoraBinaria.prototype.convertirBinarioADecilmalFraccionario = function (fraccionarioBase02) {
        var fraccionarioBase10 = 0;
        for (var i = 0; i < fraccionarioBase02.length; i++) {
            var indiceActual = (fraccionarioBase02.length - 1) - i;
            fraccionarioBase10 += (parseFloat(fraccionarioBase02.charAt(i)) * Math.pow(2, -(i + 1)));
        }
        return fraccionarioBase10;
    };
    CalculadoraBinaria.prototype.convertirDecimalFraccionarioABinario = function (fraccionarioBase10) {
        var fraccionarioBase02 = '';
        for (var i = 0; i <= 5; i++) {
            fraccionarioBase10 *= 2;
            if (fraccionarioBase10 >= 1) {
                fraccionarioBase02 += '1';
                fraccionarioBase10--;
            }
            else {
                fraccionarioBase02 += '0';
            }
        }
        return fraccionarioBase02;
    };
    CalculadoraBinaria.prototype.convertirBinarioAHexadecimal = function (enteroBase02) {
        var enteroBase16 = '';
        var longuitudDeseada = Math.ceil(enteroBase02.length / 4) * 4;
        if (longuitudDeseada != enteroBase02.length) {
            enteroBase02 = enteroBase02.padStart(longuitudDeseada, '0');
        }
        for (var i = 0; i < longuitudDeseada - 3; i += 4) {
            var segmento = '';
            var aux = void 0;
            segmento += enteroBase02.charAt(i);
            segmento += enteroBase02.charAt(i + 1);
            segmento += enteroBase02.charAt(i + 2);
            segmento += enteroBase02.charAt(i + 3);
            aux = this.convertirBinarioADecimalEntero(segmento);
            if (aux >= 10) {
                aux = String.fromCharCode(55 + aux);
            }
            enteroBase16 += aux;
        }
        return enteroBase16;
    };
    CalculadoraBinaria.prototype.convertirHexadecimalABinario = function (enteroBase16) {
        var enteroBase02 = '';
        for (var _i = 0, _a = enteroBase16.toString(); _i < _a.length; _i++) {
            var digito = _a[_i];
            var aux = digito;
            if (aux.charCodeAt(0) >= 65) {
                aux = aux.charCodeAt(0) - 55;
            }
            var segmento = this.convertirDecimalEnteroABinario(aux);
            if (segmento.length < 4) {
                segmento = segmento.padStart(4, '0');
            }
            enteroBase02 += segmento;
        }
        return enteroBase02;
    };
    return CalculadoraBinaria;
}());
var AnalizadorEntrada = /** @class */ (function () {
    function AnalizadorEntrada() {
        this.calculadoraBinaria = new CalculadoraBinaria();
    }
    AnalizadorEntrada.prototype.convertirNumeroBinarioAOctal = function (numeroBinario) {
        var numeroOctal;
        numeroOctal = this.calculadoraBinaria.convertirBinarioAOctal(numeroBinario);
        return numeroOctal;
    };
    AnalizadorEntrada.prototype.convertirNumeroBinarioADecimal = function (numeroBinario) {
        var numeroDecimal;
        var index = numeroBinario.indexOf('.');
        if (index != -1) {
            numeroDecimal = this.calculadoraBinaria.convertirBinarioADecimalEntero(numeroBinario.substring(0, index)) + this.calculadoraBinaria.convertirBinarioADecilmalFraccionario(numeroBinario.substring(index + 1));
        }
        else {
            numeroDecimal = this.calculadoraBinaria.convertirBinarioADecimalEntero(numeroBinario);
        }
        return numeroDecimal;
    };
    AnalizadorEntrada.prototype.convertirNumeroBinarioAHexadecimal = function (numeroBinario) {
        var numeroHexadecimal;
        numeroHexadecimal = this.calculadoraBinaria.convertirBinarioAHexadecimal(numeroBinario);
        return numeroHexadecimal;
    };
    AnalizadorEntrada.prototype.convertirNumeroDecimalABinario = function (numeroDecimal) {
        var numeroBinario;
        var parteEntera;
        var parteDecimal;
        var mantisaNumeroBinario;
        parteEntera = Math.trunc(numeroDecimal);
        parteDecimal = numeroDecimal - parteEntera;
        mantisaNumeroBinario = '';
        if (parteDecimal != 0) {
            mantisaNumeroBinario = '.' + this.calculadoraBinaria.convertirDecimalFraccionarioABinario(parteDecimal);
        }
        numeroBinario = this.calculadoraBinaria.convertirDecimalEnteroABinario(parteEntera) + mantisaNumeroBinario;
        return numeroBinario;
    };
    AnalizadorEntrada.prototype.convertirNumeroDecimalAOctal = function (numeroDecimal) {
        var numeroOctal;
        numeroOctal = this.convertirNumeroBinarioAOctal(this.convertirNumeroDecimalABinario(numeroDecimal));
        return numeroOctal;
    };
    AnalizadorEntrada.prototype.convertirNumeroDecimalAHexadecimal = function (numeroDecimal) {
        var numeroHexadecimal;
        numeroHexadecimal = this.convertirNumeroBinarioAHexadecimal(this.convertirNumeroDecimalABinario(numeroDecimal));
        return numeroHexadecimal;
    };
    AnalizadorEntrada.prototype.convertirNumeroOctalABinario = function (numeroOctal) {
        var numeroBinario;
        numeroBinario = this.calculadoraBinaria.convertirOctalABinario(numeroOctal);
        return numeroBinario;
    };
    AnalizadorEntrada.prototype.convertirNumeroOctalADecimal = function (numeroOctal) {
        var numeroDecimal;
        numeroDecimal = this.convertirNumeroBinarioADecimal(this.convertirNumeroOctalABinario(numeroOctal));
        return numeroDecimal;
    };
    AnalizadorEntrada.prototype.convertirNumeroOctalAHexadecimal = function (numeroOctal) {
        var numeroHexadecimal;
        numeroHexadecimal = this.convertirNumeroBinarioAHexadecimal(this.convertirNumeroOctalABinario(numeroOctal));
        return numeroHexadecimal;
    };
    AnalizadorEntrada.prototype.convertirNumeroHexadecimalABinario = function (numeroHexadecimal) {
        var numeroBinario;
        numeroBinario = this.calculadoraBinaria.convertirHexadecimalABinario(numeroHexadecimal);
        return numeroBinario;
    };
    AnalizadorEntrada.prototype.convertirNumeroHexadecimalAOctal = function (numeroHexadecimal) {
        var numeroOctal;
        numeroOctal = this.convertirNumeroBinarioAOctal(this.convertirNumeroHexadecimalABinario(numeroHexadecimal));
        return numeroOctal;
    };
    AnalizadorEntrada.prototype.convertirNumeroHexadecimalADecimal = function (numeroHexadecimal) {
        var numeroDecimal;
        numeroDecimal = this.convertirNumeroBinarioADecimal(this.convertirNumeroHexadecimalABinario(numeroHexadecimal));
        return numeroDecimal;
    };
    return AnalizadorEntrada;
}());
exports.AnalizadorEntrada = AnalizadorEntrada;

},{}]},{},[1,2]);
