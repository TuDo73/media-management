<template>
  <div class="main-content img-page">
    <div class="top-row">
      <div class="img-page-top-left">
        <div class="change-name-box">
          <input
            type="text"
            class="change-name-input"
            v-model="file.name"
            ref="fieldChangeName"
          />
        </div>
      </div>
    </div>
    <div class="main-img-page">
      <div class="property-row">
        <div class="prop-title-col">
          <div class="prop-title">{{ file.type }}</div>
        </div>
      </div>
      <div class="property-row">
        <div class="prop-title-col">
          <div class="prop-title">
            Upload Image
            <span style="color: red">*</span>
          </div>
        </div>
        <div class="prop-detail">
          <img :src="`${globalUrl}${file.url}`" alt="" />
        </div>
      </div>
      <div class="property-row" v-if="file.type == 'Image'">
        <div class="prop-title-col">
          <div class="prop-title">Width</div>
          <div class="prop-subtitle">in pixels</div>
        </div>
        <div class="prop-detail">
          {{ file.width }}
        </div>
      </div>
      <div class="property-row" v-if="file.type == 'Image'">
        <div class="prop-title-col">
          <div class="prop-title">Height</div>
          <div class="prop-subtitle">in pixels</div>
        </div>
        <div class="prop-detail">
          {{ file.height }}
        </div>
      </div>
      <div class="property-row">
        <div class="prop-title-col">
          <div class="prop-title">Size</div>
          <div class="prop-subtitle">in bytes</div>
        </div>
        <div class="prop-detail">
          {{ file.size }}
        </div>
      </div>
      <div class="property-row">
        <div class="prop-title-col">
          <div class="prop-title">Type</div>
        </div>
        <div class="prop-detail">
          {{ file.type }}
        </div>
      </div>
      <div class="property-row">
        <div class="prop-title-col">
          <div class="prop-title">Alt</div>
        </div>
        <div class="prop-detail">
          <textarea
            class="description-box"
            cols="40"
            rows="4"
            v-model="fileDescription"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="action-row">
      <div class="col-btn">
        Get URL
      </div>
      <div class="col-btn" @click="updateFile()">
        Save
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import System from "@/services/System";
import Sidebar from "@/components/Sidebar.vue";

export default {
  components: {
    Sidebar,
  },

  computed: {
    ...mapState({
      file: (state) => state.sidebar.file,
      globalUrl: (state) => state.sidebar.globalUrl,
    }),
  },

  data() {
    return {
      fileDescription: "",
    };
  },

  methods: {
    updateFile() {
      if (this.file.name == "") return;
      let fieldChangeName = this.$refs.fieldChangeName;

      let data = {
        FileName: fieldChangeName.value,
        FileDescription: this.fileDescription,
      };
      data = JSON.stringify(data);
      System.updateFile(this.file.id, data);
    },
  },

  created() {
    this.$store.commit("sidebar/setFileUrl");
  },
};
</script>

<style lang="scss"></style>
