<template>
  <section class="modal flex align-center center column">
      <h3>Enter name for location</h3>
      <input v-model="locTitle" type="text">
      <div class="btn-container">
      <button @click="saveLoc">Save</button>
      <button @click="$emit('saveLoc', '')">Cancel</button>
      </div>
  </section>
</template>

<script>
export default {
    data(){
        return{
            locTitle: ''
        }
    },
    methods:{
        saveLoc(){
            this.locTitle = this.locTitle.trim()
            if(!this.locTitle) return
            this.$emit('saveLoc', this.locTitle)
        },
        // closeModal(){
        //     this.$emit('closeModal', this.locTitle)
        // }
    },
}
</script>

<style>

</style>