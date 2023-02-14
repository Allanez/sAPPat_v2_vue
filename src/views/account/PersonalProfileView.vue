<template>
    <v-row class="pt-5">
        <v-col cols="3">
            <v-row justify="center">
                <v-card class="img-style" flat variant="outlined">
                    <!-- <v-file-input class="icon-style" accept="image/*" hide-input prepend-icon="mdi-pencil"></v-file-input> -->
                    <v-icon class="icon-style" @click="showDialog=true">mdi-pencil</v-icon>
                </v-card>
                
                <template>
                    <v-dialog v-model="showDialog" width="500">
                        <v-card class="px-2 pb-2">
                            <cropper ref="cropper" class="cropper" @change="change" :src="image.src" />
                            <div class="button-wrapper">
                                <button class="button" @click="$refs.file.click()">
                                    <input
                                        type="file"
                                        ref="file"
                                        @change="uploadImage($event)"
                                        accept="image/*"
                                    />
                                    Upload image
                                </button>
                                <button class="button" @click="cropImage()">Crop image</button>
                            </div>
                        </v-card>
                    </v-dialog>
                </template>

            </v-row>
            <v-row class="pt-5" justify="center">
                {{ role.toUpperCase() }}
            </v-row>
        </v-col>
        <v-col cols="6">
            <b>Change Password</b>
            <br/><br/>
            <v-form class="pt-5">
                <v-text-field variant="outlined" label="Old Password">
                    <v-icon class="custom-button" :icon="showOldPw ? 'mdi-eye' : 'mdi-eye-off'" @click="showOldPw = !showOldPw"/>
                </v-text-field> 
                <br/>
                
                <v-text-field variant="outlined" label="New Password">
                    <v-icon class="custom-button" :icon="showNewPw ? 'mdi-eye' : 'mdi-eye-off'" @click="showNewPw = !showNewPw"/>
                </v-text-field>
                <br/>

                <v-text-field variant="outlined" label="Re-enter Password">
                    <v-icon class="custom-button" :icon="showNewPw2 ? 'mdi-eye' : 'mdi-eye-off'" @click="showNewPw2 = !showNewPw2"/>
                </v-text-field> 
            </v-form>
            <v-row justify="end">
                <v-col cols="3">
                    <v-btn style="background-color: aquamarine;">Save</v-btn>
                </v-col>
                <v-col cols="3">
                    <v-btn @click="$router.go(-1)">Cancel</v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
// import { defineComponent } from "vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
export default {
    components: {
		Cropper,
	},
    data(){
        return {
            showDialog: false,
            showOldPw: false,
            showNewPw: false,
            showNewPw2: false,
            role: "Value Chain Analyst",
            image: {
                // src:
                // "https://images.unsplash.com/photo-1619737307100-55b82496fcda?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                src: "",
                type: "image/jpg",
            },
        }
    },
    methods: {
		change(result) {
            console.log(result);
        },
        cropImage() {
            const result = this.$refs.cropper.getResult();
            const newTab = window.open();
            newTab.document.body.innerHTML = `<img src="${result.canvas.toDataURL(
                this.image.type
            )}"></img>`;
        },
        uploadImage(event) {
            /// Reference to the DOM input element
            const { files } = event.target;
            // Ensure that you have a file before attempting to read it
            if (files && files[0]) {
                // 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
                if (this.image.src) {
                    URL.revokeObjectURL(this.image.src);
                }
                // 2. Create the blob link to the file to optimize performance:
                const blob = URL.createObjectURL(files[0]);

                // 3. Update the image. The type will be derived from the extension and it can lead to an incorrect result:
                this.image = {
                    src: blob,
                    type: files[0].type,
                };
            }
        },
	},
    unmounted() {
        // Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
        if (this.image.src) {
            URL.revokeObjectURL(this.image.src);
        }
    },
}
</script>
<style lang="scss" scoped>
.custom-button {
    position: absolute;
    right: 10px;
    z-index: 2;
    border: none;
    cursor: pointer;
    background-color: transparent;
}
.img-style{
    height: 20vh;
    width: 20vh;
}
.icon-style{
    position: absolute;
    top: 5px;
    right: 5px;
}

.cropper {
  max-height: 500px;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 17px;
}

.button {
  color: rgb(37, 19, 19);
  font-size: 16px;
  padding: 10px 20px;
  width: 100%;
  background: #ffffff;
  cursor: pointer;
  transition: background 0.5s;
  border: 1px solid black;
  &:not(:last-of-type) {
    margin-right: 10px;
  }
  &:hover {
    background: #bdbdbd;
  }
  input {
    display: none;
  }
}
</style>