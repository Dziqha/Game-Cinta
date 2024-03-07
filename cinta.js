const Check = document.querySelector('button')
const hasil = document.querySelector('#hasil')
const cursor = document.querySelector('.pointer');
const inputPertama = document.getElementById("pertama");
const inputKedua = document.getElementById("kedua");
const checkButton = document.getElementById('Check');

let x = 0,
    y = 0,
    currX = 0,
    currY = 0;

const mouseMove = () => {
    requestAnimationFrame(() => {
        currX = currX + (x - currX) * 0.15;
        currY = currY + (y - currY) * 0.15;

        cursor.style.transform = `translate(calc(${currX}px - .35vw), calc(${currY}px - .35vw))`;

        mouseMove();
    });
};

document.addEventListener('mousemove', event => {
    let e = event.touches ? event.touches[0] : event;
    x = e.clientX;
    y = e.clientY;
});

mouseMove();

Check.addEventListener('click', hitungDanTampilkanKesesuaian);
inputPertama.addEventListener('input', periksaInputDanTampilkanKesesuaian);
inputKedua.addEventListener('input', periksaInputDanTampilkanKesesuaian);
checkButton.addEventListener('click', function () {
    hitungDanTampilkanKesesuaian();
});

function hitungKesesuaianCinta(nama1, nama2) {
    const nama1TanpaSpasi = nama1.toLowerCase().replace(/\s/g, '');
    const nama2TanpaSpasi = nama2.toLowerCase().replace(/\s/g, '');

    const hurufCount1 = countHuruf(nama1TanpaSpasi);
    const hurufCount2 = countHuruf(nama2TanpaSpasi);

    let jumlahHurufSama = 0;

    for (let huruf in hurufCount1) {
        if (hurufCount2.hasOwnProperty(huruf)) {
            jumlahHurufSama += Math.min(hurufCount1[huruf], hurufCount2[huruf]);
        }
    }

    const totalHuruf = nama1TanpaSpasi.length + nama2TanpaSpasi.length;
    const tingkatKesesuaian = (jumlahHurufSama / totalHuruf) * 100;

    return tingkatKesesuaian.toFixed(2);
}

function countHuruf(nama) {
    const hurufCount = {};

    for (let i = 0; i < nama.length; i++) {
        const huruf = nama[i];
        hurufCount[huruf] = (hurufCount[huruf] || 0) + 1;
    }

    return hurufCount;
}

function periksaInputDanTampilkanKesesuaian() {
    const namaPertama = inputPertama.value;
    const namaKedua = inputKedua.value;

    if (namaPertama === '' && namaKedua === '') {
        hasil.innerText = '0%';
    }
}

function hitungDanTampilkanKesesuaian() {
    const namaPertama = inputPertama.value;
    const namaKedua = inputKedua.value;

    if (namaPertama === '' || namaKedua === '') {
        hasil.innerText = '0%';
        return;
    }

    const kesesuaian = hitungKesesuaianCinta(namaPertama, namaKedua);
    hasil.innerText = `${kesesuaian}%`;
}
