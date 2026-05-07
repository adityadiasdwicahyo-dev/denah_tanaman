const url = "https://opensheet.elk.sh/1OhKuwUB97PaoCIh58t2gwVQFnn6gRMoqfqhx7eV8HIs/MASTER_TANAMAN";

// LOAD DATA DARI GOOGLE SHEET
fetch(url)
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {

      // skip kalau belum ada posisi
      if(!item.TOP || !item.LEFT) return;

      let pin = document.createElement("div");
      pin.className = "pin";

      pin.style.top = item.TOP + "%";
      pin.style.left = item.LEFT + "%";

      // warna berdasarkan kondisi
      if(item.KONDISI === "Rusak"){
        pin.style.background = "red";
      }

      pin.onclick = () => {
        showPopup(item, pin);
      };

      document.querySelector(".map-container").appendChild(pin);
    });
  });


// FUNCTION POPUP CHAT
function showPopup(item, el){

  // hapus popup lama
  document.querySelectorAll(".popup").forEach(p => p.remove());

  let popup = document.createElement("div");
  popup.className = "popup";

  popup.innerHTML = `
    <div class="popup-close" onclick="this.parentElement.remove()">×</div>
    <b>${item.NAMA_TANAM || '-'}</b><br>
    Jenis: ${item.JENIS || '-'}<br>
    Ruangan: ${item.RUANGAN || '-'}<br>
    Kondisi: ${item.KONDISI || '-'}<br>
    Penanggung: ${item.PENANGGUNG || '-'}<br>
    ${item.FOTO_URL ? `<img src="${item.FOTO_URL}">` : ""}
  `;

  let rect = el.getBoundingClientRect();
  let mapRect = document.querySelector(".map-container").getBoundingClientRect();

  popup.style.top = (rect.top - mapRect.top - 120) + "px";
  popup.style.left = (rect.left - mapRect.left + 20) + "px";

  document.querySelector(".map-container").appendChild(popup);
}


// AMBIL KOORDINAT UNTUK ISI SHEET
document.getElementById("map").addEventListener("click", function(e){
  let rect = this.getBoundingClientRect();
  let x = ((e.clientX - rect.left) / rect.width) * 100;
  let y = ((e.clientY - rect.top) / rect.height) * 100;

  alert(`TOP: ${y.toFixed(2)}, LEFT: ${x.toFixed(2)}`);
});