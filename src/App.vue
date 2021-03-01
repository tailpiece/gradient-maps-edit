<template>
  <div class="flex-box"
       :class="[{'is-smartphone': isMobile, 'is-ios': isIos, 'menu-open': menuOpen}]">
    <div class="img-box">
      <div ref="target"
           @dragover="dragOverFiles"
           @dragleave="dragEndFiles"
           @drop.stop="dropFiles"
           :class="[{'drop-over': fileDragged, demo}]"
           class="target">
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
        class="control-panel"
    />
    <div class="toggle">
      <button @click="toggle">toggle</button>
    </div>
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
      menuOpen: true,
    }
  },
  mounted() {
    this.setupCanvas();
    window.addEventListener('resize', this.calculateWindowWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calculateWindowWidth);
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

    calculateWindowWidth() {
      this.canvasWidth = this.$refs.canvasArea.clientWidth - 32;
      this.canvasHeight = this.$refs.canvasArea.clientHeight - 32;
      this.updateCanvas();
    },

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
      this.calculateWindowWidth();
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

    /**
     * コントロールパネルの表示切替
     */
    toggle() {
      this.menuOpen = !this.menuOpen;
    },

  },
});
</script>

<style lang="scss" scoped>
  .flex-box {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }

  .img-box {
    background: #000;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    .target {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      &.demo {
        .iframes {
          display: flex;
        }
        .canvas-area {
          display: none;
        }
      }
    }

    .canvas-area,
    .iframes {
      position: absolute;
      top: 0;
      left: 0;
      flex-flow: wrap;
      justify-content: space-around;
      align-items: center;
      box-sizing: border-box;
      padding: 16px 16px 0;
      flex-direction: row-reverse;
      width: 100%;
      min-width: 320px;
      height: 100%;
      overflow: auto;
      transition: width 0.3s cubic-bezier(.175, .885, .32, 1.275);

      .menu-open & {
        width: calc(100% - 368px);
      }

      .iframe {
        width: 50%;
        margin-bottom: 8px;
        box-sizing: border-box;
        img {
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 100%;
        }
      }
    }

    .iframes {
      display: none;
    }

    .canvas {
      max-width: 100%;
      max-height: 100%;
      margin: auto;
    }

    .canvas-area {
      display: flex;
      padding-bottom: 12px;
    }
  }

  .control-panel {
    position: absolute;
    top: 0;
    right: 0;
    width: 368px;
    height: 100%;
    background: #ddd;
    overflow: auto;
    padding: 16px;
    box-sizing: border-box;
    transform: translateX(369px);
    transition: transform 0.3s cubic-bezier(.175, .885, .32, 1.275);
    .menu-open & {
      transform: translateX(0px);
    }
  }

  .drop-over {
    background: repeating-linear-gradient(-45deg, gray, gray 5px, white 5px, white 10px);
    opacity: 0.7;
  }

  .toggle {
    position: fixed;
    top: 10px;
    right: 30px;
    padding: 0 0 10px;
    button {
      padding: 10px;
    }
  }

  @mixin sp() {
    position: static;
    display: flex;
    flex-direction: column;

    .img-box {
      position: static;
      width: 100%;
      height: 100%;
      .target {
        position: static;
      }
      .canvas-area,
      .iframes {
        position: static;
        width: 80%;
        margin: 0 auto;
        .iframe:nth-child(n + 3) {
          display: none;
        }
      }
      .canvas-area {
        margin: -27px auto 0;
      }
      .canvas {
        margin: -22px auto 0;
        max-width: 100%;
        max-height: 90vh;
      }
    }
    .files {
      .gamma {
        display: none !important;
      }
    }

    .control {
      position: static;
      width: 100%;
      height: auto;
      .palette li {
        height: 30px;
      }
    }
  }

  .is-smartphone {
    @include sp();
  }

  .is-ios {
    .img-box {
      .iframes {
        .iframe:nth-child(n + 3) {
          display: none;
        }
      }
    }
  }

  @media screen and (max-width:1024px) {
    .is-ios {
      @include sp();
    }
  }

  @media screen and (max-width:1024px) and (min-width:480px) {
    .is-smartphone,
    .is-ios {
      .flexbox {
        display: flex;

        .left {
          width: 58%;
          margin-right: 2%;
        }

        .right {
          width: 40%;
        }
      }
      .toggle {
        display: none;
      }
    }
  }

  @media screen and (max-width:1023px) and (min-width:480px) {
    .is-smartphone,
    .is-ios {
      .img-box {
        .canvas-area,
        .iframes {
          width: 100%;
        }
      }
      .toggle {
        display: none;
      }
    }
  }
</style>
