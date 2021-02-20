import "./styles.scss";
import {Color} from "./modules/const";
// const colorMap = require('colormap');

const DomElement = {
  application: document.getElementById('application'),
  control: document.getElementById('control'),
  target: document.getElementById('target'),

  color01: document.getElementById('color01'),
  color02: document.getElementById('color02'),
  color03: document.getElementById('color03'),
  color04: document.getElementById('color04'),
  color05: document.getElementById('color05'),
  color06: document.getElementById('color06'),
  color07: document.getElementById('color07'),
  color08: document.getElementById('color08'),
  color09: document.getElementById('color09'),
  color10: document.getElementById('color10'),

  colorizeBtn: document.getElementById('set'),
  resetBtn: document.getElementById('reset'),
  removeBtn: document.getElementById('remove'),

  palette: document.getElementById('palette'),
  // colorsSelect: document.getElementById('color-select'),
  comicShareList: document.getElementById('comics-share'),
  sample: document.getElementById('sample'),
  file: document.getElementById('file'),
  iframes: document.getElementById('iframes'),
  canvas: document.getElementById('canvas'),
  canvasArea: document.getElementById('canvas-area'),
  gamma: document.getElementById('gamma'),
  gammaArea: document.getElementById('gamma-area'),
  canvasSave: document.getElementById('canvas-save'),
};

let gradient = "black, #fc0, #ddd, white";

/**
 * colorMapからカラーコードを取得する
 * @param mode colorMapの認識コード
 * @returns {array} hexカラーコード配列
 */
// const getColors = (mode = 'jet') => {
//   return colorMap({
//     colormap: mode,
//     nshades: 10,
//     format: 'hex',
//     alpha: 1
//   });
// };

/**
 * 現在のカラーパレット一覧から、カラーコード配列を取得する
 * @returns {string} カンマ区切りのhexカラーコード
 */
const getGradientString = () => {
  let colorAry = [];
  colorAry.push(DomElement.color01.value + ' 15%');
  colorAry.push(DomElement.color02.value + ' 35%'); // purple
  colorAry.push(DomElement.color03.value + ' 45%'); // dark-pink
  colorAry.push(DomElement.color04.value + ' 60%'); // pink
  colorAry.push(DomElement.color05.value + ' 70%'); // yellow
  colorAry.push(DomElement.color06.value + ' 75%'); // pink
  colorAry.push(DomElement.color07.value + ' 85%'); // yellow
  colorAry.push(DomElement.color08.value + ' 90%'); // pink
  colorAry.push(DomElement.color09.value + ' 95%'); // gray
  colorAry.push(DomElement.color10.value);
  return colorAry.join(', ');
};

/**
 * 現在select選択されているカラーで、画像にグラデーションマップを適用する
 */
// const changeColorSelect = () => {
//   const num = DomElement.colorsSelect.selectedIndex;
//   const str = DomElement.colorsSelect.options[num].value;
//
//   if (str !== "" && Color.ColorMaps.includes(str)) {
//     setColorValue(getColors(str));
//     colorize();
//   }
// };

/**
 * input.colorを、引数で渡された値で書き換える
 * @param {array} colors hex(string) * 10
 */
const setColorValue = (colors) => {
  if (colors.length !== 10) {
    return
  }

  DomElement.color01.value = colors[0];
  DomElement.color02.value = colors[1];
  DomElement.color03.value = colors[2];
  DomElement.color04.value = colors[3];
  DomElement.color05.value = colors[4];
  DomElement.color06.value = colors[5];
  DomElement.color07.value = colors[6];
  DomElement.color08.value = colors[7];
  DomElement.color09.value = colors[8];
  DomElement.color10.value = colors[9];
};

/**
 * 現在設定されているカラーパレットで、画像にグラデーションマップを適用する
 */
const colorize = () => {
  gradient = getGradientString();
  updateGradientMap();
};

/**
 * 画像にグラデーションマップを適用する
 */
const updateGradientMap = () => {
  console.info(gradient);
  // gradient = 'black 10%, red 30%, yellow, white';
  // gradient = "red, gray 60%, pink, yellow";
  GradientMaps.applyGradientMap(DomElement.iframes, gradient);

  // console.info(document.getElementById("filter-0"));
  // ctx.applyFilter(document.getElementById("filter-0"));
  // filter
  // if (typeof ctx.filter !== "undefined") {
  //   ctx.filter = "sepia(0.8)";
  //   ctx.drawImage(this, 0, 0);
  // }
  // GradientMaps.applyGradientMap(DomElement.canvas, gradient);

  DomElement.canvas.style.filter = 'url(#filter-0)';
  updateCanvas();
};

/**
 * ColorMapsのグラデーションをSelectに流し込む
 */
// const setColorMaps = () => {
//   const fragment = document.createDocumentFragment();
//   for (let i = 0, l = Color.ColorMaps.length; i < l; i++) {
//     const option = document.createElement('option');
//     option.text = option.value = Color.ColorMaps[i];
//     fragment.appendChild(option);
//   }
//   DomElement.colorsSelect.appendChild(fragment);
// };

/**
 * ComicShareで使えるHEXを、input.colorで選択可能にする
 */
const setColorList = () => {
  const fragment = document.createDocumentFragment();
  for (let i = 0, l = Color.ComicShare.length; i < l; i++) {
    const option = document.createElement('option');
    option.value = Color.ComicShare[i];
    fragment.appendChild(option);
  }
  DomElement.comicShareList.appendChild(fragment);
};

/**
 * ComicShareで使えるHEXを、ドラッグ可能なチップとして並べる
 */
const setColorPalette = () => {
  const fragment = document.createDocumentFragment();
  for (let i = 0, l = Color.ComicShare.length; i < l; i++) {
    const li = document.createElement('li');
    li.style.backgroundColor = Color.ComicShare[i];
    li.className = 'drag-and-drop';
    li.dataset.hex = Color.ComicShare[i];
    li.title = Color.ComicShare[i];
    li.draggable = true;
    fragment.appendChild(li);
  }
  DomElement.palette.appendChild(fragment);
};

const setSampleColors = () => {
  const fragment = document.createDocumentFragment();
  for (let i = 0, l = Color.ComicShareColors.Sample.length; i < l; i++) {
    const li = document.createElement('li');
    const hex = Color.ComicShareColors.Sample[i].hex;
    li.id = Color.ComicShareColors.Sample[i].id;
    li.className = `sample-color`;
    li.style.background = `linear-gradient(to right,
            ${hex[0]} 0%, ${hex[1]} 11%, ${hex[2]} 22%, ${hex[3]} 33%, ${hex[4]} 44%,
            ${hex[5]} 55%, ${hex[6]} 66%, ${hex[7]} 77%, ${hex[8]} 88%, ${hex[9]} 100%)`;
    li.innerText = Color.ComicShareColors.Sample[i].text;
    fragment.appendChild(li);
  }
  DomElement.sample.appendChild(fragment);
};

let dragged;
const dragstart = (e) => {
  e.dataTransfer.setData("text", e.target.id);
  dragged = e.target.dataset.hex;
  e.target.style.opacity = ".5";
};
const dragend = (e) => {
  e.target.style.opacity = "";
};
const dragover = (e) => {
  e.preventDefault();
  e.target.style.opacity = ".5";
};
const drop = (e) => {
  e.preventDefault();
  e.target.style.opacity = "";
  document.getElementById(e.target.id).value = dragged;
  dragged = null;
  colorize();
};

const reset = () => {
  setColorValue(Color.ComicShareColors.Default.hex);
  colorize();
};
const remove = () => {
  DomElement.iframes.style.filter = '';
  DomElement.canvas.style.filter = '';
};

const sampleSet = (e) => {
  const color = Color.ComicShareColors.Sample.filter(v => v.id === e.target.id);
  if (color) {
    setColorValue(color[0].hex);
    colorize();
  }
};


let uploadImgSrc;
const canvasWidth = DomElement.target.clientWidth - 32;
const canvasHeight = DomElement.target.clientHeight - 32;
let ctx;

const setupCanvas = () => {
  // Canvasの準備
  // DomElement.canvas.width = canvasWidth;
  // DomElement.canvas.height = canvasHeight;
  ctx = DomElement.canvas.getContext('2d');

  // ファイルが指定された時にloadLocalImage()を実行
  DomElement.file.addEventListener('change', changeInputImage, false);
};

const changeInputImage = (e) => {
  // ファイル情報を取得
  const fileData = e.target.files[0];
  loadLocalImage(fileData);
}

const loadLocalImage = (fileData) => {
  // 画像ファイル以外は処理を止める
  if (!fileData.type.match('image.*')) {
    alert('画像を選択してください');
    return;
  }

  DomElement.canvasArea.style.display = "flex";
  // DomElement.gammaArea.style.display = "block";
  // DomElement.canvasSave.style.display = "block";
  DomElement.iframes.style.display = "none";

  // FileReaderオブジェクトを使ってファイル読み込み
  const reader = new FileReader();
  // ファイル読み込みに成功したときの処理
  reader.onload = function() {
    // Canvas上に表示する
    uploadImgSrc = reader.result;
    updateCanvas();
  }
  // ファイル読み込みを実行
  reader.readAsDataURL(fileData);
}

// Canvas上に画像を表示する
const updateCanvas = () => {
  if (!uploadImgSrc) {
    return;
  }
  // canvas内の要素をクリアする
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Canvas上に画像を表示
  const img = new Image();
  img.src = uploadImgSrc;
  img.onload = function() {
    DomElement.canvas.width = img.width;
    DomElement.canvas.height = img.height;
    // ctx.filter = "sepia(0.8)";
    ctx.drawImage(img, 20, 20);

    // // 画像情報の取得（offsetX, offsetY, 幅、高さ）
    // const imageData = ctx.getImageData(0, 0, DomElement.canvas.clientWidth, DomElement.canvas.clientHeight);
    //
    // // imageData.dataが1pxごとのRGBAが含まれる
    // let data = imageData.data;
    //
    // // ガンマ値 = 2.0
    // const gamma = DomElement.gamma.value;
    // // 補正式
    // const correctly = val => 255 * Math.pow(val / 255, 1 / gamma);
    //
    // for (let i = 0; i < data.length; i += 4) {
    //   data[i]   = correctly(data[i]);
    //   data[i+1] = correctly(data[i+1]);
    //   data[i+2] = correctly(data[i+2]);
    // }
    //
    // // 画像情報からCanvasに書き戻す
    // ctx.putImageData(imageData, 0, 0);

    // if ( this.width > this.height) {
    //   ctx.drawImage(img, 0, 0, canvasWidth, this.height * (canvasWidth / this.width));
    // } else {
    //   ctx.drawImage(img, 0, 0, this.width * (canvasHeight / this.height), canvasHeight);
    // }
  }
}

const canvasSave = () => {
  const a = document.createElement("a"); //Create <a>
  a.href = DomElement.canvas.toDataURL();
  a.download = "sample.png"; //File name Here
  a.click(); //Downloaded file
}

/**
 * 各種イベントリスナーの登録
 */
const resistEventListener = () => {
  // buttonのclickリスナー
  DomElement.colorizeBtn.addEventListener('click', colorize);
  DomElement.resetBtn.addEventListener('click', reset);
  DomElement.removeBtn.addEventListener('click', remove);

  DomElement.gamma.addEventListener('change', updateCanvas);
  DomElement.canvasSave.addEventListener('click', canvasSave);


  // selectの変更リスナー
  // DomElement.colorsSelect.addEventListener('change', changeColorSelect);

  // ドラッグドロップ操作
  const dragElement = DomElement.control.getElementsByClassName("drag-and-drop");
  for(let i = 0; i < dragElement.length; i++) {
    dragElement[i].addEventListener("dragstart", dragstart, false);
    dragElement[i].addEventListener("dragend", dragend, false);
  }
  const dropElement = DomElement.control.getElementsByClassName("dropzone");
  for(let i = 0; i < dropElement.length; i++) {
    dropElement[i].addEventListener("dragover", dragover, false);
    dropElement[i].addEventListener("dragleave", dragend, false);
    dropElement[i].addEventListener("drop", drop, false);
    dropElement[i].addEventListener("change", colorize);
  }

  const listElement = DomElement.control.getElementsByClassName("sample-color");
  for(let i = 0; i < listElement.length; i++) {
    listElement[i].addEventListener('click', sampleSet);
  }
}


const showDropping = () => {
  DomElement.target.classList.add('drop-over');
};

const hideDropping = () => {
  DomElement.target.classList.remove('drop-over');
};

const dropFiles = (files) => {
  console.info('files', files);
  loadLocalImage(files[0]);
};

const UA = () => {
 const ua = window.navigator.userAgent.toLowerCase();
 if (
   /iphone|ipod|blackberry/.test(ua) ||
   (/android|firefox/.test(ua) && /mobile/.test(ua))
 ) {
   DomElement.application.classList.add('is-smartphone');
 } else if (
    /iphone|ipad/.test(ua) ||
    (/safari/.test(ua) && 'ontouchstart' in window)
  ) {
    DomElement.application.classList.add('is-ios');
  } else {
   DomElement.target.addEventListener('dragover', function(event) {
     event.preventDefault();
     event.dataTransfer.dropEffect = 'copy';
     showDropping();
   });

   DomElement.target.addEventListener('dragleave', function() {
     hideDropping();
   });

   DomElement.target.addEventListener('drop', function(event) {
     event.preventDefault();
     hideDropping();

     const files = event.dataTransfer.files;
     dropFiles(files);
   });
 }
};


/**
 * 初期化
 */
const init = () => {
  setColorList();
  // setColorMaps();
  setSampleColors();

  setColorPalette();
  resistEventListener();

  setupCanvas();

  UA();
};

init();
