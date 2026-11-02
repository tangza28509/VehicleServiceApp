const KEY="vehicle-service-pwa-v1";
const empty={cars:[],records:[],profile:{name:"",phone:""}};
let data=load();
function load(){try{return {...empty,...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch{return structuredClone(empty)}}
function save(){localStorage.setItem(KEY,JSON.stringify(data));render()}
function esc(v=""){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function toast(msg){const el=document.querySelector("#toast");el.textContent=msg;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2200)}
function go(id){document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id===id));document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active",b.dataset.go===id));window.scrollTo(0,0)}
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));
function emptyHtml(msg){return `<div class="empty">${msg}</div>`}
function carCard(c){return `<article class="item-card"><div class="item-top"><div><h3>${esc(c.brand)} ${esc(c.model)}</h3><div class="muted">ทะเบียน ${esc(c.plate)}</div><div class="muted">เลขไมล์ ${Number(c.mileage||0).toLocaleString("th-TH")} กม.</div></div><span class="pill">รถยนต์</span></div><div class="actions"><button class="small-btn" data-edit="${c.id}">แก้ไข</button><button class="small-btn danger" data-delete-car="${c.id}">ลบ</button></div></article>`}
function recordCard(r){const c=data.cars.find(x=>x.id===r.carId);return `<article class="item-card"><div class="item-top"><div><h3>${esc(r.title)}</h3><div class="muted">${esc(c?c.plate:"รถที่ถูกลบ")} · ${esc(r.date)}</div><div class="muted">เลขไมล์ ${Number(r.mileage||0).toLocaleString("th-TH")} กม.</div></div><span class="pill">${Number(r.cost||0).toLocaleString("th-TH")} ฿</span></div>${r.note?`<p class="muted">${esc(r.note)}</p>`:""}<div class="actions"><button class="small-btn danger" data-delete-record="${r.id}">ลบรายการ</button></div></article>`}
function render(){
 document.querySelector("#homeCars").innerHTML=data.cars.length?data.cars.slice(0,3).map(carCard).join(""):emptyHtml("ยังไม่มีข้อมูลรถ เพิ่มรถคันแรกได้ที่เมนูรถยนต์");
 document.querySelector("#carList").innerHTML=data.cars.length?data.cars.map(carCard).join(""):emptyHtml("ยังไม่มีรถยนต์ในรายการ");
 document.querySelector("#homeRecords").innerHTML=data.records.length?data.records.slice().reverse().slice(0,3).map(recordCard).join(""):emptyHtml("ยังไม่มีประวัติการเข้ารับบริการ");
 document.querySelector("#recordList").innerHTML=data.records.length?data.records.slice().reverse().map(recordCard).join(""):emptyHtml("ยังไม่มีประวัติบริการ");
 document.querySelector("#recordCar").innerHTML=data.cars.length?data.cars.map(c=>`<option value="${c.id}">${esc(c.plate)} · ${esc(c.brand)} ${esc(c.model)}</option>`).join(""):`<option value="">กรุณาเพิ่มรถก่อน</option>`;
 document.querySelector("#recordForm button[type=submit]").disabled=!data.cars.length;
 document.querySelector("#profileName").value=data.profile.name||"";document.querySelector("#profilePhone").value=data.profile.phone||"";
 document.querySelector("#connection").textContent=navigator.onLine?"พร้อมใช้งาน":"ออฟไลน์";
}
document.querySelector("#carForm").addEventListener("submit",e=>{e.preventDefault();const id=document.querySelector("#carId").value;const c={id:id||crypto.randomUUID(),plate:document.querySelector('#plate').value.trim(),brand:document.querySelector('#brand').value.trim(),model:document.querySelector('#model').value.trim(),mileage:Number(document.querySelector('#mileage').value||0)};if(id)data.cars=data.cars.map(x=>x.id===id?c:x);else data.cars.push(c);e.target.reset();document.querySelector('#carId').value="";save();toast("บันทึกข้อมูลรถแล้ว")});
document.querySelector("#cancelCar").onclick=()=>{document.querySelector("#carForm").reset();document.querySelector('#carId').value=""};
document.addEventListener("click",e=>{const edit=e.target.closest("[data-edit]");if(edit){const c=data.cars.find(x=>x.id===edit.dataset.edit);if(!c)return;document.querySelector('#carId').value=c.id;document.querySelector('#plate').value=c.plate;document.querySelector('#brand').value=c.brand;document.querySelector('#model').value=c.model;document.querySelector('#mileage').value=c.mileage;go("cars");window.scrollTo(0,0)}const dc=e.target.closest("[data-delete-car]");if(dc&&confirm("ต้องการลบรถคันนี้หรือไม่?")){data.cars=data.cars.filter(c=>c.id!==dc.dataset.deleteCar);save();toast("ลบรถแล้ว")}const dr=e.target.closest("[data-delete-record]");if(dr&&confirm("ต้องการลบประวัตินี้หรือไม่?")){data.records=data.records.filter(r=>r.id!==dr.dataset.deleteRecord);save();toast("ลบประวัติแล้ว")}});
document.querySelector("#recordDate").value=new Date().toISOString().slice(0,10);
document.querySelector("#recordForm").addEventListener("submit",e=>{e.preventDefault();if(!data.cars.length)return;data.records.push({id:crypto.randomUUID(),carId:document.querySelector('#recordCar').value,date:document.querySelector('#recordDate').value,mileage:Number(document.querySelector('#recordMileage').value||0),title:document.querySelector('#recordTitle').value.trim(),cost:Number(document.querySelector('#recordCost').value||0),note:document.querySelector('#recordNote').value.trim()});e.target.reset();document.querySelector('#recordDate').value=new Date().toISOString().slice(0,10);save();toast("เพิ่มประวัติบริการแล้ว")});
document.querySelector("#profileForm").addEventListener("submit",e=>{e.preventDefault();data.profile={name:document.querySelector('#profileName').value.trim(),phone:document.querySelector('#profilePhone').value.trim()};save();toast("บันทึกโปรไฟล์แล้ว")});
document.querySelector("#exportData").onclick=()=>{const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="VehicleService-backup.json";a.click();URL.revokeObjectURL(a.href)};
document.querySelector("#importButton").onclick=()=>document.querySelector("#importFile").click();
document.querySelector("#importFile").onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const x=JSON.parse(await f.text());if(!Array.isArray(x.cars)||!Array.isArray(x.records))throw Error();data={...empty,...x};save();toast("นำเข้าข้อมูลแล้ว")}catch{alert("ไฟล์สำรองไม่ถูกต้อง")}e.target.value=""};
window.addEventListener("online",render);window.addEventListener("offline",render);
if("serviceWorker" in navigator && location.protocol!=="file:"){navigator.serviceWorker.register("./sw.js").catch(()=>{})}
render();
