(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationController = void 0;
var CoreEngine_1 = require("./CoreEngine");
var ApplicationController = /** @class */ (function () {
    function ApplicationController() {
        this._barraSelectora = document.getElementById("seleccion-dimension");
        this._botonGenerarCampos = document.getElementById("btn-generar-campos");
        this._botonResolverSistema = document.getElementById("btn-resolver-sistema");
        this._botonMostrarVectorX = document.getElementById("mostrar-contenedor-vector-x");
        this._botonMostrarVectorY = document.getElementById("mostrar-contenedor-vector-y");
        this._botonMostrarMatrices = document.getElementById("mostrar-contenedor-matrices");
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
        this._botonMostrarVectorX.addEventListener("click", function () {
            var contenedor = document.getElementById("contenedor-solucion-vector-x");
            var superContenedor = document.getElementById("super-contenedor-vector-x");
            var newHeight = _this._botonMostrarVectorX.checked ? contenedor.clientHeight : 0;
            superContenedor.style.height = newHeight + "px";
        });
        this._botonMostrarVectorY.addEventListener("click", function () {
            var contenedor = document.getElementById("contenedor-solucion-vector-y");
            var superContenedor = document.getElementById("super-contenedor-vector-y");
            var newHeight = _this._botonMostrarVectorY.checked ? contenedor.clientHeight : 0;
            superContenedor.style.height = newHeight + "px";
        });
        this._botonMostrarMatrices.addEventListener("click", function () {
            var contenedor = document.getElementById("contenedor-solucion-matrices");
            var superContenedor = document.getElementById("super-contenedor-matrices");
            var newHeight = _this._botonMostrarMatrices.checked ? contenedor.clientHeight : 0;
            console.log(_this._botonMostrarVectorX.checked);
            superContenedor.style.height = newHeight + "px";
        });
    };
    ApplicationController.prototype.generarCampos = function (n) {
        var contenedor = document.getElementById("input-contenedor");
        contenedor.innerHTML = "";
        var tabla = document.createElement("table");
        this._elementosMatrizA = [];
        for (var i = 0; i < n; i++) {
            var fila = document.createElement("tr");
            this._elementosMatrizA[i] = [];
            for (var j = 0; j < n; j++) {
                var input = document.createElement("input");
                var celda = document.createElement("td");
                input.type = "number";
                this._elementosMatrizA[i][j] = input;
                celda.append(input);
                fila.append(celda);
            }
            tabla.append(fila);
        }
        contenedor.append(tabla);
        var tabla2 = document.createElement("table");
        for (var i = 0; i < n; i++) {
            var fila = document.createElement("tr");
            var celda = document.createElement("td");
            celda.innerHTML = "X" + (i + 1);
            fila.append(celda);
            tabla2.append(fila);
        }
        contenedor.append(tabla2);
        var tabla3 = document.createElement("table");
        this._elementosVectorB = [];
        for (var i = 0; i < n; i++) {
            var fila = document.createElement("tr");
            var input = document.createElement("input");
            var celda = document.createElement("td");
            input.type = "number";
            this._elementosVectorB[i] = input;
            celda.append(input);
            fila.append(celda);
            tabla3.append(fila);
        }
        contenedor.append(tabla3);
        document.getElementById("input-super-contenedor").style.height = (contenedor.clientHeight + 80) + "px";
        ;
    };
    ApplicationController.prototype.mostrarDesglose = function (paso, matriz, idContenedor) {
        var contenedor = document.getElementById(idContenedor);
        var tabla = document.createElement("table");
        var sub = document.createElement("h3");
        sub.innerHTML = "Paso " + paso;
        for (var i = 0; i < matriz.length; i++) {
            var fila = document.createElement("tr");
            for (var j = 0; j < matriz.length; j++) {
                var celda = document.createElement("td");
                var input = document.createElement("input");
                input.type = "number";
                input.value = matriz[i][j] + "";
                celda.append(input);
                fila.append(celda);
            }
            tabla.append(fila);
        }
        contenedor.appendChild(sub);
        contenedor.append(tabla);
    };
    ApplicationController.prototype.mostrarResultados = function (variable, matriz, vector, solucion, idContenedor) {
        var n = matriz.length;
        var contenedor = document.getElementById(idContenedor);
        contenedor.innerHTML = "";
        var tabla = document.createElement("table");
        for (var i = 0; i < n; i++) {
            var fila = document.createElement("tr");
            for (var j = 0; j < n; j++) {
                var celda = document.createElement("td");
                var input = document.createElement("input");
                input.type = "number";
                input.value = matriz[i][j] + "";
                celda.append(input);
                fila.append(celda);
            }
            tabla.append(fila);
        }
        contenedor.append(tabla);
        var tabla2 = document.createElement("table");
        for (var i = 0; i < n; i++) {
            var fila = document.createElement("tr");
            var celda = document.createElement("td");
            celda.innerHTML = variable + (i + 1);
            fila.append(celda);
            tabla2.append(fila);
        }
        contenedor.append(tabla2);
        var tabla3 = document.createElement("table");
        for (var i = 0; i < n; i++) {
            var fila = document.createElement("tr");
            var celda = document.createElement("td");
            var input = document.createElement("input");
            input.type = "number";
            input.value = vector[i] + "";
            celda.append(input);
            fila.append(celda);
            tabla3.append(fila);
        }
        contenedor.append(tabla3);
        var spanner = document.createElement("div");
        spanner.classList.add("flx-grow1");
        contenedor.append(spanner);
        var tabla4 = document.createElement("table");
        for (var i = 0; i < n; i++) {
            var fila = document.createElement("tr");
            var celda = document.createElement("td");
            celda.innerHTML = variable + (i + 1) + " = ";
            fila.append(celda);
            tabla4.append(fila);
        }
        contenedor.append(tabla4);
        var tabla5 = document.createElement("table");
        for (var i = 0; i < n; i++) {
            var fila = document.createElement("tr");
            var celda = document.createElement("td");
            var input = document.createElement("input");
            input.type = "number";
            input.value = solucion[i] + "";
            celda.append(input);
            fila.append(celda);
            tabla5.append(fila);
        }
        contenedor.append(tabla5);
    };
    ApplicationController.prototype.resolverSistema = function (n) {
        document.getElementById("super-contenedor-solucion").style.maxHeight = "10000vh";
        document.getElementById("contenedor-solucion-matriz-l").innerHTML = "";
        document.getElementById("contenedor-solucion-matriz-u").innerHTML = "";
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
        this.mostrarResultados("Y", this._factorizadorDeMatrices.matrizL, vectorB, this._factorizadorDeMatrices.vectorY, "contenedor-solucion-vector-y");
        this.mostrarResultados("X", this._factorizadorDeMatrices.matrizU, this._factorizadorDeMatrices.vectorY, this._factorizadorDeMatrices.vectorX, "contenedor-solucion-vector-x");
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
                this.controller.mostrarDesglose(contador, this.matrizL, "contenedor-solucion-matriz-l");
                this.controller.mostrarDesglose(contador, this.matrizU, "contenedor-solucion-matriz-u");
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
