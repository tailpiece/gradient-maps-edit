<template>
  <div class="control" ref="control">
    <h1 class="title">
      Gradient Map Editor
      for <a href="https://comicshare.net/">ComicShare</a>
      by <a href="https://tailpiece.dev/">Tail</a>
    </h1>

    <div class="files">
      <input type="file" accept="image/*" name="file" class="file" @change="changeInputImage">
    </div>

    <div class="flexbox">
      <div class="left">
        <h2 class="subtitle">パレット</h2>
        <div class="palette">
          <div class="touch">
            <v-swatches
                v-for="(_, i) in colors"
                v-model="colors[i]"
                @input="updateGradientMap"
                :key="`colors${i}`"
                :swatches="comicShareColor"
                :spacing-size="4"
                :show-border="true"
                :swatch-style="{ width: '21px', height: '21px', borderRadius: '4px', marginBottom: '0' }"
                :trigger-style="{ width: '59px', height: '30px', borderRadius: '4px', margin: '0', border: '1px solid #000' }"
                :wrapper-style="{ width: '200px' }"
                class="color"
            />
          </div>
        </div>

        <div class="buttons">
          <button @click="updateGradientMap">Set</button>
          <button @click="removeGradientMap">Remove</button>
          <button @click="resetGradientMap" class="right">Reset</button>
        </div>
      </div>
      <div class="right">
        <h2 class="subtitle">カラーサンプル</h2>
        <ul class="sample">
          <li v-for="(color, i) in ComicShareColorsSample"
              :id="color.id"
              :style="gradientStyle(color.hex)"
              :title="color.title"
              :key="'colorSample' + i"
              @click="sampleSet(color.id)"
              class="sample-color"
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
</template>

<script>
import Vue from "vue";
import {Color} from "./modules/const";
import VSwatches from 'vue-swatches'
import "./styles.scss";
import "vue-swatches/dist/vue-swatches.css"

export default Vue.extend({
  components: {
    VSwatches
  },
  data: function() {
    return {
      colors: [],
      ratio: [15, 35, 45, 60, 70, 75, 85, 90, 95],
      // ratio: [15, 35, 45, 55, 65, 75, 85, 90, 95],
    }
  },
  mounted() {
    this.colors = Color.ComicShareColors.Default.hex.concat();
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
  },
  methods: {
    /**
     * 画像にグラデーションマップを適用する
     */
    updateGradientMap() {
      console.log(this.colors.join(", "));
      this.$emit('update', this.gradient);
    },

    /**
     * グラデーションマップを解除する
     */
    removeGradientMap() {
      this.$emit('remove');
    },

    /**
     * グラデーションマップを初期化する
     */
    resetGradientMap() {
      this._setColorValue(Color.ComicShareColors.Default.hex.concat());
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
     * ファイルが指定された（ファイル情報を取得）
     * @param e event
     */
    changeInputImage(e) {
      this.$emit('changeImage', e.target.files);
    },
  },
});
</script>

<style lang="scss" scoped>
  .title {
    margin: 40px 0 16px;
    padding: 0;
    font-size: 14px;
    text-align: center;
  }

  .palette {
    margin: 0 0 8px;
    .color {
      width: calc((100% - 10px) / 5);
      padding: 0;
      cursor: pointer;
      margin: 0 2px 0 0;
      box-sizing: border-box;
    }
  }

  .buttons {
    margin: 0 0 16px;
    display: flex;
    flex-wrap: wrap;

    button {
      margin: 0 8px 0 0;
      cursor: pointer;
    }

    .right {
      margin-left: auto;
      margin-right: 0;
    }
  }

  .files{
    margin: 0 0 16px;
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;

    .file {
      width: 100%;
      margin: 0 0 8px;
      padding-top: 8px;
    }
    .gamma {
      width: 100%;
      display: none;
      font-size: 12px;
    }
    .canvas-save {
      display: none;
    }
  }

  .color-list {
    margin: 0 0 16px;
    padding: 16px 12px 8px;
    list-style: none;
    background: #fff;
    box-sizing: border-box;
    li {
      margin: 0 4px 0 0;
      padding: 0;
      width: calc((100% - 32px) / 8);
      height: 22px;
      display: inline-block;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
      cursor: grab;
      &:hover {
        opacity: .7;
      }
      &:active {
        cursor: grabbing;
      }
    }
  }

  .sample {
    margin: 0 0 16px;
    padding: 12px 12px 8px;
    list-style: none;
    background: #fff;
    box-sizing: border-box;
    li {
      margin: 0 4px 4px 0;
      padding: 4px 8px;
      width: 100%;
      font-size: 12px;
      display: block;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
      text-align: right;
      cursor: pointer;
      &:hover {
        opacity: .7;
      }
    }
  }

  .subtitle {
    margin: 0 0 6px;
    padding: 0;
    font-size: 14px;
  }

  .readme {
    p {
      font-size: 12px;
      margin: 0 0 8px;
      padding: 0;
    }
  }
</style>
