"use strict";

var btn_KhiGas = document.querySelector(".btn-khigas");
var btn_NhietDo = document.querySelector(".btn-nhietdo");
var btn_DoAm = document.querySelector(".btn-doam");
var btn_DuDoanNhietDo = document.querySelector(".btn-DuDoanNhietDo");
var btn_DuDoanKhiGas = document.querySelector(".btn-duDoanKhiGas");
var btn_DuDoanDoAm = document.querySelector(".btn-DuDoanDoAm");
btn_KhiGas.addEventListener("click", function (event) {
  window.location.href = "http://localhost:3001/admin/dashboard/cambienkhigas";
});
btn_NhietDo.addEventListener("click", function (event) {
  window.location.href = "http://localhost:3001/admin/dashboard/cambiennhietdo";
});
btn_DoAm.addEventListener("click", function (event) {
  window.location.href = "http://localhost:3001/admin/dashboard/cambiendoam";
});
btn_DuDoanKhiGas.addEventListener("click", function () {
  window.location.href = "http://localhost:3001/admin/dashboard/dudoankhigas";
});
btn_DuDoanNhietDo.addEventListener("click", function () {
  window.location.href = "http://localhost:3001/admin/dashboard/dudoannhietdo";
});
btn_DuDoanDoAm.addEventListener("click", function () {
  window.location.href = "http://localhost:3001/admin/dashboard/dudoandoam";
});