(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationController = void 0;
var CoreEngine_1 = require("./CoreEngine");
var ApplicationController = /** @class */ (function () {
    function ApplicationController() {
        this._barraSelectora = document.getElementById("campo-n");
        this._botonGenerarCampos = document.getElementById("btn-generar-campos");
        this._botonResolverSistema = document.getElementById("btn-resolver-sistema");
        this._factorizadorDeMatrices = new CoreEngine_1.FactorizadorDeMatrices();
    }
    ApplicationController.prototype.onCreate = function () {
        var _this = this;
        this._barraSelectora.addEventListener("input", function () {
            _this._barraSelectora.nextElementSibling.innerHTML = _this._barraSelectora.value;
        });
        this._botonGenerarCampos.addEventListener("click", function (event) {
            event.preventDefault();
            document.getElementById("input-super-contenedor").classList.remove("display-none");
            document.getElementById("input-super-contenedor").classList.add("flex");
            document.getElementById("input-super-contenedor").classList.add("flex-column");
            _this.generarCampos(_this._barraSelectora.value);
        });
        this._botonResolverSistema.addEventListener("click", function (event) {
            event.preventDefault();
            _this.resolverSistema(_this._barraSelectora.value);
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
            var span = document.createElement("span");
            var celda = document.createElement("td");
            span.innerHTML = "X" + (i + 1);
            celda.append(span);
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
    };
    ApplicationController.prototype.resolverSistema = function (n) {
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
        console.log("Matriz L", this._factorizadorDeMatrices.matrizL);
        console.log("Matriz U", this._factorizadorDeMatrices.matrizU);
        console.log("Vector X", this._factorizadorDeMatrices.vectorX);
        console.log("Vector X", this._factorizadorDeMatrices.vectorY);
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
    function FactorizadorDeMatrices() {
    }
    FactorizadorDeMatrices.prototype.factorizarMatrizOriginal = function (matrizA) {
        this.dimension = matrizA.length;
        this._matrizU = matrizA;
        this._matrizL = this.inicializarMatrizVacia(this._matrizL, this.dimension);
        for (var i = 0; i < this.dimension; i++) {
            this._matrizL[i][i] = 1;
            for (var j = i + 1; j < this.dimension; j++) {
                var pivote = this._matrizU[j][i] / this._matrizU[i][i];
                this._matrizL[j][i] = pivote;
                for (var k = 0; k < this.dimension; k++) {
                    this._matrizU[j][k] = this._matrizU[j][k] - (pivote * this._matrizU[i][k]);
                }
            }
        }
    };
    FactorizadorDeMatrices.prototype.inicializarMatrizVacia = function (matriz, n) {
        matriz = [];
        for (var i = 0; i < n; i++) {
            matriz[i] = [];
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
