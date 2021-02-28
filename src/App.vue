<template>
  <div class="flex-box" ref="application" :class="[{'is-smartphone': isMobile, 'is-ios': isIos}]">
    <div class="img-box">
      <div ref="target"
           @dragover="dragOverFiles"
           @dragleave="dragEndFiles"
           @drop.stop="dropFiles"
           :class="[{'drop-over': fileDragged, demo}]" class="target">
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
    <ControlPanel
        @update="updateGradientMap"
        @remove="removeGradientMap"
        @changeImage="changeInputImage"
        @dragColor="dragColor"
    />
  </div>
</template>

<script>
import Vue from "vue";
import ControlPanel from "./ControlPanel";
import "./styles.scss";

export default Vue.extend({
  components: {
    ControlPanel,
  },
  data: function() {
    return {
      UA: window.navigator.userAgent.toLowerCase(),
      uploadImgSrc: null,
      ctx: null,
      fileDragged: false,
      colorDragged: false,
      demo: true,
    }
  },
  mounted() {
    this.setupCanvas();
  },
  computed: {
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
     * 画像にグラデーションマップを適用する
     */
    updateGradientMap(gradient) {
      GradientMaps.applyGradientMap(this.$refs.iframes, gradient);

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
     * カラーリストをドラッグしているかどうか
     */
    dragColor(e) {
      this.colorDragged = e;
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
     * @param files ファイル
     */
    changeInputImage(files) {
      if (files.length === 0) {
        alert('ファイルを選択してください');
        this.demo = true;
        return;
      }
      this.loadLocalImage(files[0]);
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
        this.demo = true;
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

      this.demo = false;

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

  },
});
</script>