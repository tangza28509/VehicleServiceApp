# VehicleServiceApp — PWA

เว็บแอปภาษาไทยสำหรับ iPhone / iPad ผ่าน Safari ไม่ต้องใช้ IPA, Xcode หรือ Apple Developer Account

## ความสามารถ
- หน้าแรกสรุปรถและประวัติบริการ
- เพิ่ม/แก้ไข/ลบข้อมูลรถ: ทะเบียน ยี่ห้อ รุ่น เลขไมล์
- เพิ่ม/ลบประวัติบริการ: วันที่ รายการ เลขไมล์ ค่าใช้จ่าย หมายเหตุ
- โปรไฟล์ชื่อและเบอร์โทร
- ส่งออก/นำเข้าข้อมูลสำรอง JSON
- Service Worker สำหรับเปิดใช้งานออฟไลน์หลังเข้าครั้งแรก

## เผยแพร่ด้วย GitHub Pages โดยใช้ iPhone
1. เปิด https://github.com/ และสร้างบัญชี/ลงชื่อเข้าใช้
2. สร้าง Repository ใหม่ชื่อ `VehicleServiceApp` ตั้งเป็น Public
3. อัปโหลดไฟล์และโฟลเดอร์ทั้งหมดใน ZIP นี้ โดยคงโครงสร้างเดิมไว้ (รวม `.github/workflows`)
4. เปิด Settings → Pages แล้วเลือก Deploy from a branch → Branch `main` → Folder `/ (root)` → Save
5. รอให้ GitHub Pages เผยแพร่ แล้วเปิด URL ที่ GitHub แสดง (ปกติรูปแบบ `https://ชื่อผู้ใช้.github.io/VehicleServiceApp/`)

## เพิ่มลงหน้าจอ iPhone
1. เปิด URL ด้วย Safari
2. แตะปุ่ม Share
3. เลือก Add to Home Screen
4. เปิดตัวเลือก Open as Web App (ถ้ามี) แล้วแตะ Add

## ข้อควรทราบ
- ข้อมูลเก็บใน localStorage ของเบราว์เซอร์/เว็บแอปบนเครื่องนี้ ไม่มีระบบบัญชีหรือซิงก์ข้ามเครื่อง
- แนะนำส่งออก JSON สำรองเป็นระยะ
- ต้องเปิดผ่าน HTTPS เพื่อให้ Service Worker ทำงาน; GitHub Pages ให้ HTTPS
- ฟอนต์ Noto Sans Thai โหลดจาก Google Fonts เมื่อออนไลน์; ถ้าออฟไลน์จะใช้ฟอนต์ระบบ
