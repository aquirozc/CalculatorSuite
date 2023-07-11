(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationController = void 0;
var CoreEngine_1 = require("./CoreEngine");
var ApplicationController = /** @class */ (function () {
    function ApplicationController() {
        this._barraSelectora = document.getElementById("sldr-escoger-tamaño");
        this._botonGenerarCampos = document.getElementById("btn-generar-campos");
        this._botonResolverSistema = document.getElementById("btn-resolver-sistema");
        this._idElementosOcultables = ["contenedor-vector-x", "contenedor-vector-y", "contenedor-matrices"];
        this._factorizadorDeMatrices = new CoreEngine_1.FactorizadorDeMatrices(this);
    }
    ApplicationController.prototype.onCreate = function () {
        var _this = this;
        this._barraSelectora.addEventListener("input", function () {
            var valor = _this._barraSelectora.value;
            var min = _this._barraSelectora.min;
            var max = _this._barraSelectora.max;
            var porcentaje = (valor - min) / (max - min) * 100;
            _this._barraSelectora.nextElementSibling.innerHTML = _this._barraSelectora.value;
            _this._barraSelectora.style.background = "linear-gradient(90deg, #0078D7 ".concat(porcentaje, "%, #999999 ").concat(porcentaje, "%)");
        });
        this._botonGenerarCampos.addEventListener("click", function (event) {
            event.preventDefault();
            _this.generarCampos(_this._barraSelectora.value);
        });
        this._botonResolverSistema.addEventListener("click", function (event) {
            event.preventDefault();
            _this.resolverSistema(_this._barraSelectora.value);
        });
        var _loop_1 = function (id) {
            var botonMostrarSuperContenedor = document.getElementById("mostrar-super-" + id);
            botonMostrarSuperContenedor.addEventListener('click', function () {
                var superContenedor = document.getElementById("super-" + id);
                var contenedor = document.getElementById(id);
                var newHeight = botonMostrarSuperContenedor.checked ? contenedor.clientHeight : 0;
                superContenedor.style.height = newHeight + "px";
            });
        };
        for (var _i = 0, _a = this._idElementosOcultables; _i < _a.length; _i++) {
            var id = _a[_i];
            _loop_1(id);
        }
    };
    ApplicationController.prototype.generarCampos = function (n) {
        this._elementosMatrizA = [];
        this._elementosVectorB = [];
        var contenedor = document.getElementById("contenedor-input");
        var tabla;
        contenedor.innerHTML = "";
        tabla = this.generarMatrizInputs(n, this._elementosMatrizA, "number", "fluent-input", false, false, "", [], "");
        contenedor.append(tabla);
        tabla = this.generarVectorInputs(n, [], "text", "blank-input", true, true, "X", this.generarRango(1, n), "");
        contenedor.append(tabla);
        tabla = this.generarVectorInputs(n, this._elementosVectorB, "number", "fluent-input", false, false, "", [], "");
        contenedor.append(tabla);
        document.getElementById("super-contenedor-input").style.height = (contenedor.clientHeight + 100) + "px";
    };
    ApplicationController.prototype.mostrarDesglose = function (paso, matriz, idContenedor) {
        var contenedor = document.getElementById(idContenedor);
        var tabla;
        var sub = document.createElement("h3");
        sub.innerHTML = "Paso " + paso;
        tabla = this.generarMatrizInputs(matriz.length, [], "number", "fluent-input", true, true, "", matriz, "");
        contenedor.append(sub);
        contenedor.append(tabla);
    };
    ApplicationController.prototype.mostrarResultados = function (variable, matriz, vector, solucion, idContenedor) {
        var n = matriz.length;
        var contenedor = document.getElementById(idContenedor);
        var tabla;
        contenedor.innerHTML = "";
        tabla = this.generarMatrizInputs(n, [], "number", "fluent-input", true, true, "", matriz, "");
        contenedor.append(tabla);
        tabla = this.generarVectorInputs(n, [], "text", "blank-input", true, true, variable, this.generarRango(1, n), "");
        contenedor.append(tabla);
        tabla = this.generarVectorInputs(n, [], "number", "fluent-input", true, true, "", vector, "");
        contenedor.append(tabla);
        var spanner = document.createElement("div");
        spanner.classList.add("flx-grow1");
        contenedor.append(spanner);
        tabla = this.generarVectorInputs(n, [], "text", "blank-input", true, true, variable, this.generarRango(1, n), " =");
        contenedor.append(tabla);
        tabla = this.generarVectorInputs(n, [], "number", "fluent-input", true, true, "", solucion, "");
        contenedor.append(tabla);
    };
    ApplicationController.prototype.resolverSistema = function (n) {
        document.getElementById("contenedor-matriz-l").innerHTML = "";
        document.getElementById("contenedor-matriz-u").innerHTML = "";
        var matrizA = [];
        var vectorB = [];
        for (var i = 0; i < n; i++) {
            matrizA[i] = [];
            for (var j = 0; j < n; j++) {
                matrizA[i][j] = this._elementosMatrizA[i][j].value;
            }
        }
        for (var i = 0; i < n; i++) {
            vectorB[i] = this._elementosVectorB[i].value;
        }
        this._factorizadorDeMatrices.factorizarMatrizOriginal(matrizA);
        this._factorizadorDeMatrices.resolverSistemaDeEcuaciones(vectorB);
        this.mostrarResultados("Y", this._factorizadorDeMatrices.matrizL, vectorB, this._factorizadorDeMatrices.vectorY, "contenedor-vector-y");
        this.mostrarResultados("X", this._factorizadorDeMatrices.matrizU, this._factorizadorDeMatrices.vectorY, this._factorizadorDeMatrices.vectorX, "contenedor-vector-x");
        document.getElementById("super-contenedor-solucion").style.maxHeight = "10000vh";
    };
    ApplicationController.prototype.generarMatrizInputs = function (n, contenedor, tipo, clase, readOnly, remplazarValor, cadenaBase, valores, cadenaTerminal) {
        var tabla = document.createElement("table");
        for (var i = 0; i < n; i++) {
            var fila = document.createElement("tr");
            contenedor[i] = [];
            for (var j = 0; j < n; j++) {
                var celda = document.createElement("td");
                var input = document.createElement("input");
                input.type = tipo;
                input.value = remplazarValor ? cadenaBase + valores[i][j] + cadenaTerminal : "";
                input.readOnly = readOnly;
                input.classList.add(clase);
                contenedor[i][j] = input;
                celda.append(input);
                fila.append(celda);
            }
            tabla.append(fila);
        }
        return tabla;
    };
    ApplicationController.prototype.generarVectorInputs = function (n, contenedor, tipo, clase, readOnly, remplazarValor, cadenaBase, valores, cadenaTerminal) {
        var tabla = document.createElement("table");
        for (var i = 0; i < n; i++) {
            var celda = document.createElement("td");
            var fila = document.createElement("tr");
            var input = document.createElement("input");
            input.type = tipo;
            input.value = remplazarValor ? cadenaBase + valores[i] + cadenaTerminal : "";
            input.readOnly = readOnly;
            input.classList.add(clase);
            contenedor[i] = input;
            celda.append(input);
            fila.append(celda);
            tabla.append(fila);
        }
        return tabla;
    };
    ApplicationController.prototype.generarRango = function (a, b) {
        var rango = [];
        for (var i = 0; i <= b - a; i++) {
            rango[i] = i + 1;
        }
        return rango;
    };
    return ApplicationController;
}());
exports.ApplicationController = ApplicationController;
var thisPageApplicationController = new ApplicationController();
thisPageApplicationController.onCreate();

},{"./CoreEngine":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactorizadorDeMatrices = void 0;
var FactorizadorDeMatrices = /** @class */ (function () {
    function FactorizadorDeMatrices(c) {
        this.controller = c;
    }
    FactorizadorDeMatrices.prototype.factorizarMatrizOriginal = function (matrizA) {
        var contador = 0;
        this.dimension = matrizA.length;
        this._matrizU = matrizA;
        this._matrizL = this.generarMatrizDeIdentidad(this._matrizL, this.dimension);
        for (var i = 0; i < this.dimension; i++) {
            for (var j = i + 1; j < this.dimension; j++) {
                var pivote = this._matrizU[j][i] / this._matrizU[i][i];
                this._matrizL[j][i] = pivote;
                for (var k = 0; k < this.dimension; k++) {
                    this._matrizU[j][k] = this._matrizU[j][k] - (pivote * this._matrizU[i][k]);
                }
                contador++;
                this.controller.mostrarDesglose(contador, this.matrizL, "contenedor-matriz-l");
                this.controller.mostrarDesglose(contador, this.matrizU, "contenedor-matriz-u");
            }
        }
    };
    FactorizadorDeMatrices.prototype.generarMatrizDeIdentidad = function (matriz, n) {
        matriz = [];
        for (var i = 0; i < n; i++) {
            matriz[i] = [];
            for (var j = 0; j < n; j++) {
                matriz[i][j] = (i == j) ? 1 : 0;
            }
        }
        return matriz;
    };
    FactorizadorDeMatrices.prototype.resolverSistemaDeEcuaciones = function (vectorB) {
        this._vectorX = [];
        this._vectorY = [];
        for (var i = 0; i < this.dimension; i++) {
            var combinaciónLineal = 0;
            for (var j = 0; j < i && i > 0; j++) {
                combinaciónLineal += this._matrizL[i][j] * this._vectorY[j];
            }
            this._vectorY[i] = (vectorB[i] - combinaciónLineal) / this._matrizL[i][i];
        }
        for (var i = this.dimension - 1; i >= 0; i--) {
            var combinaciónLineal = 0;
            for (var j = i + 1; j < this.dimension && i < this.dimension - 1; j++) {
                combinaciónLineal += this._matrizU[i][j] * this._vectorX[j];
            }
            this._vectorX[i] = (this._vectorY[i] - combinaciónLineal) / this._matrizU[i][i];
        }
    };
    Object.defineProperty(FactorizadorDeMatrices.prototype, "matrizL", {
        get: function () {
            return this._matrizL;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FactorizadorDeMatrices.prototype, "matrizU", {
        get: function () {
            return this._matrizU;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FactorizadorDeMatrices.prototype, "vectorX", {
        get: function () {
            return this._vectorX;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FactorizadorDeMatrices.prototype, "vectorY", {
        get: function () {
            return this._vectorY;
        },
        enumerable: false,
        configurable: true
    });
    return FactorizadorDeMatrices;
}());
exports.FactorizadorDeMatrices = FactorizadorDeMatrices;

},{}]},{},[1,2]);
