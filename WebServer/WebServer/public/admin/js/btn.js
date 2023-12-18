const btn_KhiGas = document.querySelector(".btn-khigas");
const btn_NhietDo = document.querySelector(".btn-nhietdo");
const btn_DoAm = document.querySelector(".btn-doam");
const btn_DuDoanNhietDo = document.querySelector(".btn-DuDoanNhietDo");
const btn_DuDoanKhiGas = document.querySelector(".btn-duDoanKhiGas");
const btn_DuDoanDoAm = document.querySelector(".btn-DuDoanDoAm");

btn_KhiGas.addEventListener("click", (event) => {
  window.location.href = "http://localhost:3001/admin/dashboard/cambienkhigas";
});
btn_NhietDo.addEventListener("click", (event) => {
  window.location.href = "http://localhost:3001/admin/dashboard/cambiennhietdo";
});
btn_DoAm.addEventListener("click", (event) => {
  window.location.href = "http://localhost:3001/admin/dashboard/cambiendoam";
});

btn_DuDoanKhiGas.addEventListener("click", () => {
  window.location.href = "http://localhost:3001/admin/dashboard/dudoankhigas";
});

btn_DuDoanNhietDo.addEventListener("click", () => {
  window.location.href = "http://localhost:3001/admin/dashboard/dudoannhietdo";
});

btn_DuDoanDoAm.addEventListener("click", () => {
  window.location.href = "http://localhost:3001/admin/dashboard/dudoandoam";
});
