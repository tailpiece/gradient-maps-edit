<template>
  <div class="flex-box" ref="application" :class="[{'is-smartphone': isMobile, 'is-ios': isIos}]">
    <div class="img-box">
      <div ref="target"
           @dragover="dragOverFiles"
           @dragleave="dragEndFiles"
           @drop.stop="dropFiles"
           :class="[{'drop-over': fileDragged}]" class="target">
        <div ref="iframes" class="iframes">
          <div class="iframe"><img src="img/comic_001.png?210219" alt="p1"></div>
          <div class="iframe"><img src="img/comic_002.png?210219" alt="p2"></div>
          <div class="iframe"><img src="img/comic_004.png?210219" alt="p4"></div>
          <div class="iframe"><img src="img/comic_005.png?210219" alt="p5"></div>
        </div>
        <div ref="canvasArea" class="canvas-area">
          <canvas ref="canvas" class="canvas"></canvas>
        </div>
      </div>
    </div>
    <div class="control" ref="control">
      <h1 class="title">
        Gradient Map Editor
        for <a href="https://comicshare.net/">ComicShare</a>
        by <a href="http://tail.dojin.com/comicshare/">Tail</a>
      </h1>

      <div class="files">
        <input type="file" accept="image/*" name="file" ref="file" class="file" @change="changeInputImage">
        <div class="gamma" ref="gammaArea" title="標準は1 増えると明るくなり、0.9以下で暗くなる">
          ガンマ調整：
          <label><input type="range" value="1" min="0.1" max="3" step="0.1" ref="gamma"></label>
          <output ref="output1">1</output>
        </div>
        <button ref="canvasSave" class="canvas-save">save canvas</button>
      </div>

      <div class="flexbox">
        <div class="left">
          <h2 class="subtitle">パレット</h2>
          <div class="palette">
            <label v-for="(_, i) in colors">
              <input type="color"
                     :ref="`color${('0' + i).slice(-2)}`"
                     :value="colors[i]"
                     :key="`color${i}`"
                     :data-index="i"
                     @change="updateColor"
                     @dragover="dragover"
                     @dragleave="dragend"
                     @drop.stop="drop"
                     class="dropzone" list="comics-share">
            </label>
          </div>
          <datalist id="comics-share">
            <option v-for="(color, i) in comicShareColor" :value="color" :key="'colorPaletteList' + i"></option>
          </datalist>

          <div class="buttons">
            <button ref="set" @click="updateGradientMap">Set</button>
            <button ref="remove" @click="removeGradientMap">Remove</button>
            <button ref="reset" class="right" @click="resetGradientMap">Reset</button>
          </div>

          <h2 class="subtitle">カラーリスト <small>(これ以外はComicShareにありません)</small></h2>
          <ul ref="colorList" class="color-list">
            <li v-for="(color, i) in comicShareColor"
                :title="color" :data-hex="color"
                :style="`background-color: ${color}`"
                :key="'colorList' + i"
                @dragstart="dragstart"
                @dragend="dragend"
                draggable="true"
                class="drag-and-drop"
            ></li>
          </ul>
        </div>
        <div class="right">
          <h2 class="subtitle">カラーサンプル</h2>
          <ul ref="sample" class="sample">
            <li v-for="(color, i) in ComicShareColorsSample"
                :id="color.id"
                :style="gradientStyle(color.hex)"
                class="sample-color"
                :key="'colorSample' + i"
                @click="sampleSet(color.id)"
            >{{color.text}}</li>
          </ul>
        </div>
      </div>
      <div class="readme">
        <h3 class="subtitle">これは何？</h3>
        <p>ComicShareで自動着色機能を利用した際の表示を、疑似確認することができます。
          カラーリストの色をパレットにドラッグ＆ドロップすると、色をセットします。<br>
          画像ファイルを選択すると、画像ファイルに対してフィルタを掛けてみることが可能です
          （※ファイルは何処にもアップロードされません。ローカルでのみ参照されます）</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import {Color} from "./modules/const";
import "./styles.scss";

export default Vue.extend({
  data: function() {
    return {
      DomElement: {},
      UA: window.navigator.userAgent.toLowerCase(),
      colors: [],
      ratio: [15, 35, 45, 60, 70, 75, 85, 90, 95],
      uploadImgSrc: null,
      ctx: null,
      fileDragged: false,
      colorDragged: false,
    }
  },
  mounted() {
    this.colors = Color.ComicShareColors.Default.hex;
    this.setupCanvas();
  },
  computed: {
    comicShareColor() {
      return Color.ComicShare;
    },
    ComicShareColorsSample() {
      return Color.ComicShareColors.Sample;
    },
    gradient() {
      return this._getGradientString(this.colors);
    },
    isMobile() {
      return (/iphone|ipod|blackberry/.test(this.UA) ||
          (/android|firefox/.test(this.UA) && /mobile/.test(this.UA)))
    },
    isIos() {
      return (/iphone|ipad/.test(this.UA) ||
          (/safari/.test(this.UA) && 'ontouchstart' in window))
    }
  },
  methods: {
    /**
     * カラーが変更された場合、this.colorsの値を更新し、グラデーションマップを更新する
     */
    updateColor(e) {
      // 変数を直接書き換えるとVueが補足しなくなるので、setで変更する
      // this.colors[e.target.dataset.index] = e.target.value;
      this.$set(this.colors, e.target.dataset.index, e.target.value);
      this.updateGradientMap();
    },

    /**
     * 画像にグラデーションマップを適用する
     */
    updateGradientMap() {
      // console.info(this.$refs.iframes);
      console.log(this.colors.join(", "));
      GradientMaps.applyGradientMap(this.$refs.iframes, this.gradient);

      this.$refs.canvas.style.filter = 'url(#filter-0)';
      this.updateCanvas();
    },

    /**
     * グラデーションマップを解除する
     */
    removeGradientMap() {
      this.$refs.iframes.style.filter = '';
      this.$refs.canvas.style.filter = '';
    },

    /**
     * グラデーションマップを初期化する
     */
    resetGradientMap() {
      this._setColorValue(Color.ComicShareColors.Default.hex);
      this.updateGradientMap();
    },

    /**
    * グラデーションを指定するための文字列を作成する
     * * @param {array} hex カラーコード
     * @returns {string} カンマ区切りで％指定されたカラーコード
     */
    _getGradientString(hex) {
      let colorAry = [];
      colorAry.push(`${hex[0]} ${this.ratio[0]}%`);
      colorAry.push(`${hex[1]} ${this.ratio[1]}%`);
      colorAry.push(`${hex[2]} ${this.ratio[2]}%`);
      colorAry.push(`${hex[3]} ${this.ratio[3]}%`);
      colorAry.push(`${hex[4]} ${this.ratio[4]}%`);
      colorAry.push(`${hex[5]} ${this.ratio[5]}%`);
      colorAry.push(`${hex[6]} ${this.ratio[6]}%`);
      colorAry.push(`${hex[7]} ${this.ratio[7]}%`);
      colorAry.push(`${hex[8]} ${this.ratio[8]}%`);
      colorAry.push(`${hex[9]}`);
      return colorAry.join(', ');
    },

    /**
     * グラデーションを指定するための文字列を作成する
     * @param {array} hex カラーコード
     * @returns {string} css
     */
    gradientStyle(hex) {
      return `background-image: linear-gradient(to right, ${this._getGradientString(hex)}`;
    },

    /**
     * input.colorを、渡された値で書き換える
     * @param {array} colors hex(string) * 10
     */
    _setColorValue(colors) {
      if (colors.length !== 10) {
        return
      }
      this.colors = colors;
    },

    /**
     * input.colorを、カラーサンプルで置き換える
     * @param {number} id Color.ComicShareColors.SampleのID
     */
    sampleSet(id) {
      const color = Color.ComicShareColors.Sample.filter(v => v.id === id);
      if (color) {
        this._setColorValue(color[0].hex.concat());
        this.updateGradientMap();
      }
    },

    /**
     * Canvasの準備
     */
    setupCanvas() {
      this.canvasWidth = this.$refs.target.clientWidth - 32;
      this.canvasHeight = this.$refs.target.clientHeight - 32;
      this.ctx = this.$refs.canvas.getContext('2d');
    },

    /**
     * ファイルが指定された（ファイル情報を取得）
     * @param e event
     */
    changeInputImage(e) {
      if (e.target.files.length === 0) {
        alert('画像を選択してください');
        return;
      }
      this.loadLocalImage(e.target.files[0]);
    },

    /**
     * ウィンドゥ外から、ファイルがドラッグされた
     * @param e event
     */
    dragOverFiles(e) {
      e.preventDefault();
      if (this.colorDragged) {
        return;
      }
      e.dataTransfer.dropEffect = 'copy';
      this.fileDragged = true;
    },

    /**
     * ウィンドゥ外からファイルがドラッグされたが、範囲外になった
     */
    dragEndFiles() {
      this.fileDragged = false;
    },

    /**
     * ウィンドゥ外からファイルがドロップされた（ファイル情報を取得）
     * @param e event
     */
    dropFiles(e) {
      e.preventDefault();
      if (this.colorDragged) {
        this.colorDragged = false;
        return;
      }
      this.fileDragged = false;
      const files = e.dataTransfer.files;
      if (files.length === 0) {
        return;
      }
      this.loadLocalImage(files[0]);
    },

    /**
     * 指定されたファイルをロードする
     * @param fileData
     */
    loadLocalImage(fileData) {
      // 画像ファイル以外は処理を止める
      if (!fileData.type.match('image.*')) {
        alert('画像を選択してください');
        return;
      }

      this.$refs.canvasArea.style.display = "flex";
      this.$refs.iframes.style.display = "none";

      // FileReaderオブジェクトを使ってファイル読み込み
      const reader = new FileReader();
      // ファイル読み込みに成功したときの処理
      reader.onload = (e) => {
        // Canvas上に表示する
        this.uploadImgSrc = e.target.result;
        this.updateCanvas();
      }
      // ファイル読み込みを実行
      reader.readAsDataURL(fileData);
    },

    /**
     * Canvasに画像を表示する
     */
    updateCanvas() {
      if (!this.uploadImgSrc) {
        return;
      }
      // canvas内の要素をクリアする
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      // Canvas上に画像を表示
      const img = new Image();
      img.src = this.uploadImgSrc;
      img.onload = () => {
        this.$refs.canvas.width = img.width;
        this.$refs.canvas.height = img.height;
        this.ctx.drawImage(img, 20, 20);
      }
    },

    /**
     * カラーリストのドラッグ開始
     * @param e event
     */
    dragstart(e){
      e.dataTransfer.setData("text", e.target.dataset.hex);
      e.target.style.opacity = ".5";
      this.colorDragged = true;
    },

    /**
     * カラーリストのドラッグを終えた、またはinput.colorの上から離れた
     * @param e event
     */
    dragend(e) {
      e.target.style.opacity = "";
    },

    /**
     * カラーリストをドラッグした状態で、input.colorの上に乗った
     * @param e event
     */
    dragover(e) {
      e.preventDefault();
      e.target.style.opacity = ".5";
    },

    /**
     * カラーリストをドラッグした状態で、input.colorの上でドロップした
     * @param e event
     */
    drop(e) {
      e.preventDefault();
      e.target.style.opacity = "";
      this.colorDragged = false;
      this.$set(this.colors, e.target.dataset.index, e.dataTransfer.getData("text"));
      this.updateGradientMap();
    },

  },
});
</script>