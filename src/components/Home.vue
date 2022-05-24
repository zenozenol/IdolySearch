<template>
  <main class="home">
    <footer>
      <div v-if="isMobile === false" class="word_helper_settings">
        <!-- <label class=""
          ><input type="checkbox" v-model="overwritable" />上書き</label
        >
        <button class="word_helper" @click="insertWord('段階')">段階</button> -->
        <select
          class="word_helper"
          v-model="wordHelper"
          @change="insertWord(wordHelper)"
        >
          <option value="">なし</option>
          <option v-for="(item, index) in filteringCandidates" :key="index">
            {{ item }}
          </option>
        </select>
        <select
          class="word_helper"
          v-model="wordHelperUD"
          @change="insertWord(wordHelperUD)"
        >
          <option value="">なし</option>
          <option value="上昇">上昇</option>
          <option value="低下">低下</option>
          <option value="減少">減少</option>
          <option value="増強">増強</option>
          <option value="延長">延長</option>
          <option value="移動">移動</option>
        </select>
        <input
          type="text"
          placeholder="例: ダンス上昇"
          v-model="freeWord"
          @keypress.enter="sortIdol"
        />
        <input
          class="reset_button"
          type="button"
          value="RESET"
          @click="resetWord"
        />
      </div>
      <ul class="viewmode_changer">
        <li>
          <label
            ><input
              type="radio"
              name="viewmode"
              v-model="viewMode"
              value="normal"
            /><span>通常表示</span></label
          >
        </li>
        <!-- <li>
          <label
            ><input
              type="radio"
              name="viewmode"
              v-model="viewMode"
              value="dual"
            /><span>デュアル</span></label
          >
        </li> -->
        <li>
          <label
            ><input
              type="radio"
              name="viewmode"
              v-model="viewMode"
              value="compact"
            /><span>コンパクト</span></label
          >
        </li>
      </ul>
    </footer>
    <header>
      <ul class="header_sort_type">
        <li
          v-for="(item, index) in sortTypes"
          :key="index"
          :class="{ selected: selectedSortType === item ? true : false }"
        >
          <label
            ><input
              :key="item"
              v-model="selectedSortType"
              type="radio"
              name="sortType2"
              :value="item"/><span></span
          ></label>
        </li>
      </ul>
      <!-- <span @click="showLane" class="show_lane">レーン</span> -->
      <h1>IDOLY SEARCH</h1>
      <span class="hamborger" @click="showBoard">三</span>
    </header>
    <div v-if="isMobile === false" class="idol_selector">
      <ul class="target_characters">
        <li>
          <label
            ><input
              v-model="allCheck"
              type="checkbox"
              @change="toggleSelect"
            /><span>全選択</span></label
          >
        </li>
        <li v-for="(character, index) in characters" :key="index">
          <label
            ><input
              v-model="selectedIdols"
              type="checkbox"
              :value="character"
            /><span>{{ character }}</span></label
          >
        </li>
      </ul>
    </div>
    <nav v-show="isShow" class="search_board" @dblclick="closeBoard">
      <div class="freeword">
        <h2>スキルフリーワード検索</h2>
        <label
          ><input
            type="checkbox"
            v-model="allSkill"
            @change="toggleSkillType"
          /><span>全選択</span></label
        >
        <ul>
          <li v-for="(skill, index) in skillTypes" :key="index">
            <label
              ><input
                type="checkbox"
                v-model="selectedSkillTypes"
                :value="skill"
              /><span>{{ skill }}</span></label
            >
          </li>
        </ul>
        <div class="word_helper_settings">
          <!-- <label class=""
            ><input type="checkbox" v-model="overwritable" />上書き</label
          >
          <button class="word_helper" @click="insertWord('段階')">段階</button> -->
          <select
            class="word_helper"
            v-model="wordHelper"
            @change="insertWord(wordHelper)"
          >
            <option value="">なし</option>
            <option v-for="(item, index) in filteringCandidates" :key="index">
              {{ item }}
            </option>
          </select>
          <select
            class="word_helper"
            v-model="wordHelperUD"
            @change="insertWord(wordHelperUD)"
          >
            <option value="">なし</option>
            <option value="上昇">上昇</option>
            <option value="低下">低下</option>
            <option value="減少">減少</option>
            <option value="増強">増強</option>
            <option value="延長">延長</option>
            <option value="移動">移動</option>
          </select>
          <input
            type="text"
            placeholder="例: ダンス上昇"
            v-model="freeWord"
            @keypress.enter="sortIdol"
          />
          <input
            class="reset_button"
            type="button"
            value="RESET"
            @click="resetWord"
          />
        </div>
      </div>
      <div class="targeted_idol">
        <h2>検索対象キャラ</h2>
        <label
          ><input
            v-model="allCheck"
            type="checkbox"
            @change="toggleSelect"
          /><span>全選択</span></label
        >
      </div>
      <ul class="target_characters">
        <li v-for="(character, index) in characters" :key="index">
          <label
            ><input
              v-model="selectedIdols"
              type="checkbox"
              :value="character"
            /><span>{{ character }}</span></label
          >
        </li>
      </ul>
      <div class="order">
        <h2>並び替え</h2>
        <ul>
          <li v-for="(item, index) in sortTypes" :key="index">
            <label
              ><input
                :key="item"
                v-model="selectedSortType"
                type="radio"
                name="sortType"
                :value="item"
              /><span>{{ item }}</span></label
            >
          </li>
          <li>
            <label
              ><input
                v-model="selectedSortType"
                name="sortType"
                type="radio"
                value="total"
              /><span>トータル</span></label
            >
          </li>
          <li>
            <label
              ><input
                v-model="selectedSortType"
                name="sortType"
                type="radio"
                value="cardType"
              /><span>カードタイプ</span></label
            >
          </li>
          <li>
            <label
              ><input
                v-model="selectedSortType"
                name="sortType"
                type="radio"
                value="default"
              /><span>キャラ別</span></label
            >
          </li>
        </ul>
      </div>
      <div class="idol_type">
        <h2>タイプ</h2>
        <label
          ><input
            v-model="allIdolTypeCheck"
            type="checkbox"
            @change="toggleIdolType"
          /><span>全選択</span></label
        >
        <ul>
          <li v-for="(idolType, index) in idolTypes" :key="index">
            <label
              ><input
                v-model="selectedIdolTypes"
                :value="idolType"
                type="checkbox"
              /><span>{{ idolType }}</span></label
            >
          </li>
        </ul>
      </div>
      <div class="specialities">
        <h2>傾向</h2>
        <label
          ><input
            v-model="allSpecialityCheck"
            type="checkbox"
            @change="toggleSpeciality"
          /><span>全選択</span></label
        >
        <ul>
          <li v-for="(speciality, index) in specialities" :key="index">
            <label
              ><input
                v-model="selectedSpecialities"
                :value="speciality"
                type="checkbox"
              /><span>{{ speciality }}</span></label
            >
          </li>
        </ul>
      </div>
      <div class="skill_combination">
        <h2>スキル組み合わせ</h2>
        <label
          ><input
            type="checkbox"
            v-model="allCombo"
            @change="toggleCombination"
          /><span>全選択</span></label
        >
        <ul>
          <li v-for="(combo, index) in skillCombination" :key="index">
            <label
              ><input
                type="checkbox"
                v-model="selectedSkillCombo"
                :value="combo"
              /><span>{{ combo }}</span></label
            >
          </li>
        </ul>
      </div>

      <div class="card_types">
        <h2>カードタイプ</h2>
        <label
          ><input
            v-model="allCardCheck"
            type="checkbox"
            @change="toggleCardType"
          /><span>全選択</span></label
        >
        <ul>
          <li v-for="(cardType, index) in cardTypes" :key="index">
            <label
              ><input
                v-model="selectedCardTypes"
                type="checkbox"
                :value="cardType"
              /><span>{{ cardType }}</span></label
            >
          </li>
        </ul>
      </div>
      <div class="sort_order">
        <label
          ><input
            v-model="selectedOrder"
            type="radio"
            value="asc"
            :disabled="selectedSortType === 'default' ? true : false"
          /><span>昇順</span></label
        >
        <label
          ><input
            v-model="selectedOrder"
            type="radio"
            value="desc"
            :disabled="selectedSortType === 'default' ? true : false"
          /><span>降順</span></label
        >
      </div>
    </nav>
    <p class="num_of_idol">{{ idolList.length }} / {{ idolLength }}</p>

    <ol class="idol_list" :class="viewMode">
      <li
        v-for="(idol, index) in idolList"
        :key="index"
        @mousedown="showSkills(idol.skills)"
        @mouseup="showSkills(null)"
        @touchstart="showSkills(idol.skills)"
        @touchend="showSkills(null)"
      >
        <div class="list_wrapper">
          <p class="rank">{{ index + 1 }}</p>
          <div class="idol_status">
            <div class="icon_container">
              <div class="dummy"></div>
              <img
                class="icon"
                :src="baseUrl + idol.image + '.jpg'"
                :alt="idol.image"
              />
            </div>
            <div class="idol">
              <p class="character">
                <span class="idol_character">{{ idol.character }}</span
                ><span class="card_type">{{ idol.cardType }}</span>
              </p>
              <p class="idol_name">{{ idol.name }}</p>
              <p class="status">
                <span class="vocal" title="ボーカル">{{
                  idol.status.ボーカル
                }}</span>
                <span class="dance" title="ダンス">{{
                  idol.status.ダンス
                }}</span>
                <span class="visual" title="ビジュアル">{{
                  idol.status.ビジュアル
                }}</span>
                <span class="stamina" title="スタミナ">{{
                  idol.status.スタミナ
                }}</span>
                <span class="status_total" title="四種合計">{{
                  idol.status.ボーカル +
                    idol.status.ダンス +
                    idol.status.ビジュアル +
                    idol.status.スタミナ
                }}</span>
              </p>
            </div>
            <p v-if="idol.yell" class="yell">
              {{ idol.yell }}
            </p>
          </div>
          <ul class="skills">
            <li
              v-for="(skill, skillIndex) in idol.skills"
              :key="skillIndex"
              class="skill"
            >
              <span class="skill_type" :class="'skill_' + skill.type">{{
                skill.type
              }}</span>
              <span class="skill_name">{{ skill.name }}</span>
              <ul class="skill_effect">
                <li v-for="(efx, efxIndex) in skill.effect" :key="efxIndex">
                  {{ efx }}
                </li>
              </ul>
              <dl>
                <dt>スタミナ</dt>
                <dd>{{ skill.スタミナ }}</dd>
                <dt v-if="skill.ct">CT</dt>
                <dd>{{ skill.ct === -1 ? "ライブ中1回のみ" : skill.ct }}</dd>
              </dl>
            </li>
          </ul>
        </div>
      </li>
    </ol>
    <ul class="picked_skillList" v-show="pickedSkills">
      <li
        v-for="(skill, skillIndex) in pickedSkills"
        :key="skillIndex"
        class="skill"
      >
        <span class="skill_type" :class="'skill_' + skill.type">{{
          skill.type
        }}</span>
        <span class="skill_name">{{ skill.name }}</span>
        <ul class="skill_effect">
          <li v-for="(efx, efxIndex) in skill.effect" :key="efxIndex">
            {{ efx }}
          </li>
        </ul>
        <dl>
          <dt>スタミナ</dt>
          <dd>{{ skill.スタミナ }}</dd>
          <dt v-if="skill.ct">CT</dt>
          <dd>{{ skill.ct === -1 ? "ライブ中1回のみ" : skill.ct }}</dd>
        </dl>
      </li>
    </ul>
    <!-- <img
      v-show="isLane > 0"
      class="lane"
      :src="'./images/lane' + isLane + '.png'"
      alt=""
    /> -->
  </main>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { Status, Skill, Idol } from "../idols";
@Component
export default class Home extends Vue {
  public idolData!: Idol[];
  public baseUrl = "./images/";
  public isShow = false;
  public allCardCheck = true;
  public cardTypes: string[] = [
    "初期恒常",
    "追加恒常",
    "期間限定",
    "フェス限定",
    "プロモ",
    "ファンイベ",
    "配布"
  ];
  public selectedCardTypes: string[] = [];
  public characters: string[] = [];
  public selectedIdols: string[] = [];
  public allCheck = true;
  public allIdolTypeCheck = true;
  public idolLength = 0;
  public idolTypes: string[] = ["スコアラー", "バッファー", "サポーター"];
  public selectedIdolTypes: string[] = [];
  public allSpecialityCheck = true;
  public specialities: string[] = ["ボーカル", "ダンス", "ビジュアル"];
  public selectedSpecialities: string[] = [];
  public sortTypes: string[] = this.specialities.concat(["スタミナ"]);
  public filteringCandidates: string[] = this.sortTypes.concat([
    "消費スタミナ",
    "スコア",
    "ビートスコア",
    "Aスキルスコア",
    "クリティカル率",
    "クリティカル係数",
    "集目状態",
    "ステルス",
    "スキル成功率"
  ]);
  public selectedSortType = "default";
  public selectedOrder = "desc";
  public idolList: Idol[] = [];
  public skillCombination: string[] = ["SP A P", "SP A A", "A A P", "A P P"];
  public selectedSkillCombo: string[] = [];
  public allCombo = true;
  public freeWord = "";
  public viewMode = "normal";
  public pickedSkills: Skill[] | null = null;
  public skillTypes: string[] = ["SP", "A", "P"];
  public allSkill = true;
  public selectedSkillTypes: string[] = Object.assign([], this.skillTypes);
  public isLane = 0;
  public wordHelper = "";
  public wordHelperUD = "";
  public overwritable = true;
  public isMobile = false;

  @Watch("selectedCardTypes")
  @Watch("selectedIdols")
  @Watch("selectedIdolTypes")
  @Watch("selectedSpecialities")
  @Watch("selectedSortType")
  @Watch("selectedOrder")
  @Watch("selectedSkillCombo")
  @Watch("selectedSkillTypes")
  onSelected(): void {
    this.sortIdol();
  }

  mounted() {
    this.checkDevice();
    window.addEventListener("orientationchange", this.checkDevice);

    axios
      .get("data/idols.json", {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        },
        responseType: "json"
      })
      .then((response: any) => {
        this.idolData = response.data.data;
        this.idolLength = this.idolData.length;
        this.characters = [
          ...new Set(this.idolData.map(idol => idol.character))
        ];
        this.toggleCardType();
        this.toggleSelect();
        this.toggleIdolType();
        this.toggleSpeciality();
        this.toggleCombination();
      })
      .catch((e: any) => {
        console.log("[Error]", e);
      });
  }

  destroyed() {
    window.removeEventListener("orientationchange", this.checkDevice);
  }

  private checkDevice(): void {
    this.isMobile = navigator.userAgent.match(/iPhone|Android.+Mobile/)
      ? true
      : false;
    console.log(screen.orientation);
  }

  public showBoard(): void {
    this.isShow = !this.isShow;
  }

  public closeBoard(): void {
    this.isShow = false;
  }

  public sortIdol(): void {
    this.idolList = this.idolData
      .filter(idol => {
        return this.getCardType(idol.cardType);
      })
      .filter(idol => {
        return this.getSelectedIdol(idol.character);
      })
      .filter(idol => {
        return this.getIdolTypes(idol.type);
      })
      .filter(idol => {
        return this.getSpecialities(idol.speciality);
      })
      .filter(idol => {
        return this.getCombination(idol.skills);
      })
      .filter(idol => {
        return this.searchWord(idol.skills);
      });
    if (this.selectedSortType === "cardType") {
      if (this.selectedOrder === "asc") {
        this.idolList.sort((a, b) => a.cardType.localeCompare(b.cardType));
      } else {
        this.idolList.sort((a, b) => b.cardType.localeCompare(a.cardType));
      }
    } else {
      this.idolList.sort((a, b) => {
        let aStatus: number;
        let bStatus: number;
        if (this.selectedSortType === "total") {
          aStatus =
            a.status.ボーカル +
            a.status.ダンス +
            a.status.ビジュアル +
            a.status.スタミナ;
          bStatus =
            b.status.ボーカル +
            b.status.ダンス +
            b.status.ビジュアル +
            b.status.スタミナ;
        } else {
          aStatus = a.status[this.selectedSortType];
          bStatus = b.status[this.selectedSortType];
        }
        if (this.selectedOrder === "asc") {
          return aStatus - bStatus;
        } else {
          return bStatus - aStatus;
        }
      });
    }
  }

  private getCardType(cardType: string): boolean {
    for (const item of this.selectedCardTypes) {
      if (cardType === item) {
        return true;
      }
    }
    return false;
  }

  private getSelectedIdol(character: string): boolean {
    for (const item of this.selectedIdols) {
      if (character === item) {
        return true;
      }
    }
    return false;
  }
  private getIdolTypes(idolType: string): boolean {
    for (const item of this.selectedIdolTypes) {
      if (idolType === item) {
        return true;
      }
    }
    return false;
  }

  private getSpecialities(speciality: string): boolean {
    for (const item of this.selectedSpecialities) {
      if (speciality === item) {
        return true;
      }
    }
    return false;
  }

  private getCombination(skills: Skill[]): boolean {
    const skillTypes: string[] = skills.map(skill => {
      return skill.type;
    });
    const skillCombination = skillTypes.join(" ");
    for (const combo of this.selectedSkillCombo) {
      if (skillCombination === combo) {
        return true;
      }
    }
    return false;
  }

  public searchWord(skills: Skill[]): boolean {
    for (const skill of skills) {
      if (this.checkEfx(skill.effect)) {
        for (const skillType of this.selectedSkillTypes) {
          if (skillType === skill.type) {
            return true;
          }
        }
      }
    }
    return false;
  }

  private checkEfx(effects: string[]): boolean {
    const reg: RegExp = new RegExp(this.freeWord, "i");
    for (const efx of effects) {
      if (reg.test(efx)) {
        return true;
      }
    }
    return false;
  }

  public toggleCardType(): void {
    this.selectedCardTypes = this.allCardCheck === true ? this.cardTypes : [];
  }

  public toggleSelect(): void {
    this.selectedIdols = this.allCheck === true ? this.characters : [];
  }

  public toggleIdolType(): void {
    this.selectedIdolTypes =
      this.allIdolTypeCheck === true ? this.idolTypes : [];
  }

  public toggleSpeciality(): void {
    this.selectedSpecialities =
      this.allSpecialityCheck === true ? this.specialities : [];
  }

  public toggleCombination(): void {
    this.selectedSkillCombo =
      this.allCombo === true ? this.skillCombination : [];
  }

  public toggleSkillType(): void {
    this.selectedSkillTypes = this.allSkill === true ? this.skillTypes : [];
  }

  public showSkills(skills: Skill[] | null): void {
    if (this.viewMode === "normal") {
      return;
    }
    this.pickedSkills = skills;
  }

  public resetWord(): void {
    this.freeWord = "";
    this.sortIdol();
  }

  public showLane() {
    this.isLane = this.isLane === 1 ? 0 : this.isLane + 1;
    // this.isLane = this.isLane === 2 ? 0 : this.isLane + 1;
    this.isShow = this.isLane > 0 ? false : true;
  }

  public insertWord(str: string): void {
    if (this.overwritable === true) {
      this.freeWord = "段階" + this.wordHelper + this.wordHelperUD;
    } else {
      this.freeWord += str;
    }
    this.sortIdol();
  }
}
</script>

<style scoped lang="scss">
@import "../sass/variable";
%skills {
  list-style-type: none;
  margin-bottom: 0.5em;
  line-height: 160%;
  border-bottom: 3px solid $gray;
  &:last-of-type {
    margin-bottom: 0;
    border-style: none;
  }
  .skill_type {
    display: inline-block;
    box-sizing: border-box;
    padding: 5px 0;
    font-size: 1.2rem;
    width: 2em;
    text-align: center;
    margin-right: 0.5em;
    font-weight: bold;
    line-height: 1em;
    border: 2px solid $black;
    border-radius: 4px;
  }
  .skill_SP {
    background-color: $sp;
  }
  .skill_A {
    background-color: $appeal;
  }
  .skill_P {
    background-color: $passive;
  }
  .skill_name {
    margin-right: 0.5em;
    font-weight: bold;
    vertical-align: top;
  }
  .skill_effect {
    display: inline-block;
    vertical-align: top;
    list-style-type: square;
    padding: 0;
    margin: 0 0 0 2em;
  }
  & > dl {
    margin: 0;
    padding: 0;
    display: flex;
    dt {
      font-weight: bold;
    }
    dd {
      margin-left: 0.5em;
      margin-right: 1em;
    }
  }
}
.home {
  text-align: center;
  padding-top: 0;
}
header {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: $blue;
  cursor: pointer;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 255;
  .show_lane {
    user-select: none;
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    padding: 20px;
    font-size: 1.2rem;
    color: #fff;
  }
}

.header_sort_type {
  display: flex;
  list-style-type: none;
  color: $black;
  font-weight: bold;
  li {
    width: 40px;
    height: 40px;
    box-sizing: border-box;
    padding: 10px;
    border-style: solid;
    border-width: 2px;
    &:nth-of-type(1) {
      background-color: $vocal;
      border-color: $vocal;
    }
    &:nth-of-type(2) {
      background-color: $dance;
      border-color: $dance;
    }
    &:nth-of-type(3) {
      background-color: $visual;
      border-color: $visual;
    }
    &:nth-of-type(4) {
      display: none;
      background-color: $stamina;
      border-color: $stamina;
    }
    &.selected {
      border-color: $white;
    }
    & > label {
      min-width: 0;
      width: 100%;
      height: 100%;
      & > input {
        display: none;
        margin: 0;
      }
    }
  }
}

.idol_selector {
  position: absolute;
  right: 0;
  top: 60px;
  z-index: 10;
  color: $white;
  background-color: rgba(20, 40, 255, 0.33);
  label {
    display: block;
    margin-bottom: 0.5em;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  .target_characters {
    text-align: left;
    display: block;
    li {
      margin: 0 0 1.5em 0;
    }
  }
}

.lane {
  position: fixed;
  z-index: 1;
  bottom: 0;
  right: 0;
  height: calc(100% - 56px);
  opacity: 0.75;
}

footer {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  position: fixed;
  gap: 10px;
  justify-content: space-evenly;
  align-items: center;
  z-index: 11;
  right: 0;
  bottom: 0;
  color: #fff;
  font-size: 1.4rem;
  text-align: left;
  background-color: $blue;
  label input {
    margin: 0 0.25em 0 0;
  }
  .viewmode_changer {
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    label {
      padding: 5px 20px;
      min-width: 0;
    }
  }
  .footer_sort_type {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0 100px 0 0;
  }
}

h1 {
  color: $white;
  margin: 0;
  text-align: center;
  font-size: 2rem;
}

.hamborger {
  /* position: absolute;
  right: 5px;
  top: 5px; */
  display: block;
  padding: 5px;
  background-color: #fff;
  color: $gray;
  font-size: 3rem;
  font-weight: bold;
  line-height: 1em;
}

label {
  cursor: pointer;
  input,
  span {
    vertical-align: middle;
  }
  input {
    margin-right: 0.25em;
  }
}

.search_board {
  position: sticky;
  max-height: calc(100vh - 86px);
  overflow: auto;
  left: 0;
  top: 56px;
  z-index: 10;
  padding: 0 0 20px 0;
  background-color: rgba(240, 241, 235, 0.95);
  user-select: none;
}

h2 {
  font-size: 1.4rem;
}
.card_types,
.targeted_idol,
.idol_type,
.specialities,
.skill_combination {
  h2 {
    display: inline;
  }
  & > label {
    font-size: 1.2rem;
  }
}

.reset_button {
  cursor: pointer;
}

.sort_order {
  font-size: 1.4rem;
}

.card_types ul,
.target_characters,
.skill_combination ul,
.idol_type ul,
.specialities ul,
.order ul,
.freeword ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;
  list-style-type: none;
  font-size: 1.4rem;
  li {
    margin-bottom: 10px;
  }
  label {
    padding: 5px 0;
  }
}

.word_helper_settings {
  & > label {
    vertical-align: middle;
  }
  select,
  input {
    margin: 5px;
  }
}

.word_helper {
  padding: 5px;
  vertical-align: bottom;
}
.freeword {
  margin-bottom: 20px;
  h2 {
    display: inline;
  }
  label {
    font-size: 1.2rem;
  }
  ul {
    margin-bottom: 0;
  }
}

.target_characters {
  & > li {
    margin-bottom: 0.5em;
  }
}

.num_of_idol {
  display: inline-block;
  margin: 0;
  padding-left: 5px;
  font-size: 1.2rem;
  background-color: $blue;
  color: $white;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 100;
}

.idol_list {
  position: relative;
  z-index: 0;
  margin-top: 66px;
  text-align: left;
  list-style-type: none;
  font-size: 1.4rem;
  & > li {
    margin: 20px 0;
    padding-bottom: 20px;
    border-bottom: 3px solid $gray;
  }
  .list_wrapper {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 60px 290px 1fr;
    gap: 20px;
    align-content: center;
  }
  .rank {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 1.5em;
    text-align: center;
    background-color: $blue;
    color: #fff;
    font-weight: bold;
    font-size: 4rem;
    line-height: 1em;
    margin-right: 10px;
  }
  .icon_container {
    position: relative;
    .dummy {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
    }
  }
  .icon {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  .idol {
    width: 170px;
  }

  .idol_status {
    display: flex;
    flex-wrap: wrap;
  }
  .character {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .idol_character {
    display: block;
  }
  .card_type {
    display: block;
    font-size: 0.9em;
    background-color: #fff;
    border-radius: 2px;
    padding: 2px 5px;
    border: 1px solid $gray;
  }
  p {
    margin: 0;
    line-height: 160%;
  }
  .idol_name {
    margin: 0 0 5px 0;
  }
  .idol_character {
    font-weight: bold;
    margin-right: 1em;
  }

  .status {
    display: grid;
    grid-template-rows: 1.5em 1.5em;
    grid-template-columns: 4em 4em 4em;
    margin-bottom: 5px;
    font-weight: bold;
    & > span {
      display: block;
      text-align: center;
      padding: 0 5px;
      color: $black;
    }
  }
  .vocal {
    background-color: $vocal;
  }
  .dance {
    background-color: $dance;
  }
  .visual {
    background-color: $visual;
  }
  .stamina {
    background-color: $stamina;
  }
  .status_total {
    background-color: #fff;
  }
  .yell {
    font-size: 1.2rem;
    text-indent: -2em;
    margin-left: 2em;
    &::before {
      content: "Y";
      display: inline-block;
      box-sizing: border-box;
      text-indent: 0;
      width: 2em;
      font-weight: bold;
      text-align: center;
      padding: 5px 0;
      line-height: 1em;
      background-color: $yell;
      border: 2px solid $black;
      border-radius: 4px;
    }
  }

  .skill {
    @extend %skills;
  }
  &.dual {
    display: flex;
    flex-wrap: wrap;
    & > li {
      width: 50%;
      .list_wrapper {
        padding-right: 10px;
      }
    }
  }
  &.compact {
    user-select: none;
    display: flex;
    flex-wrap: wrap;
    margin-left: 10px;
    gap: 5px;
    & > li {
      width: 170px;
      position: relative;
      border: 3px solid $gray;
      padding: 10px;
      border-radius: 8px;
      background-color: #fff;
      margin: 0;
      &:hover {
        border-color: $blue;
      }
    }
    .list_wrapper {
      display: block;
    }
    .rank {
      display: flex;
      position: absolute;
      left: 0;
      top: 0;
      font-size: 1.5rem;
      width: 2em;
      height: 2em;
      padding: 2px;
      border-top-left-radius: 6px;
    }

    .icon_container {
      margin: 0 auto;
    }
    .icon {
      display: block;
      margin: 0 auto;
    }
    .idol {
      margin-top: 10px;
    }
    .yell {
      margin-top: 10px;
    }
    .skills {
      display: none;
    }
  }
}

.picked_skillList {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9;
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  color: #fff;
  text-align: left;
  background-color: rgba(0, 0, 0, 0.85);
  .skill {
    @extend %skills;
    font-size: 1.2rem;
    border-width: 1px;
    padding-bottom: 10px;
    margin-bottom: 10px;
    .skill_type {
      color: $black;
      border-style: none;
    }
  }
}

@media screen and (max-width: 480px) {
  .search_board {
    height: 100vh;
    overflow: auto;
  }
  .idol_list {
    padding-bottom: 10px;
    &.normal {
      .idol {
        width: 160px;
      }
    }
    &.compact {
      font-size: 1.2rem;
      & > li {
        box-sizing: border-box;
        width: 48%;
      }

      .idol {
        width: auto;
      }
    }
    & > li {
      margin: 0;
      padding-top: 2px;
      padding-bottom: 2px;
      border-style: none;
    }
    .list_wrapper {
      gap: 10px;
      grid-template-rows: 160px 1fr;
      grid-template-columns: 60px 1fr;
    }
    .rank {
      grid-row: 1/3;
      grid-column: 1/2;
    }
    .icon {
      margin-top: 20px;
    }
    .idol {
      margin-top: 20px;
    }

    .yell {
      margin-top: 20px;
    }

    .skills {
      margin-top: 30px;
      grid-row: 2/3;
      grid-column: 2/4;
      margin-bottom: 20px;
      li {
        box-sizing: border-box;
        padding-right: 20px;
      }
    }
  }
}
</style>
