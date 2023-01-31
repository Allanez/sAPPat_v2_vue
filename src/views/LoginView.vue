<template>
    <v-row color="#ffff00">
        <v-col class="dflex" align-self="center" fill-height >
            <v-card class="main-style" elevation="3">
                <v-row justify-self="center">
                    <v-col cols="6" class="pa-0 logo-style">
                        
                    </v-col>
                    <v-col cols="6" class="px-10 py-10">
                        <v-row class="mb-2" justify="center">
                            <v-col cols="3">
                                <h4>Login</h4>
                            </v-col>
                        </v-row>

                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row no-gutters class="header-5">Username</v-row>
                            <v-text-field :rules="[v => !!v || 'Username is required']" required density="compact" variant="outlined" v-model="user.username"/>
                            
                            <v-row no-gutters class="header-5">Password</v-row>
                            <v-text-field :rules="[v => !!v || 'Password is required']" required density="compact" v-on:keyup.enter="onLogin" :type="showPassword ? 'text' : 'password'" variant="outlined" v-model="user.password"> 
                                <!-- <v-btn flat class="custom-button" icon size="x-small" @click="showPassword = !showPassword"><v-icon :icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"/></v-btn> -->
                                <v-icon class="custom-button" :icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click="showPassword = !showPassword"/>
                            </v-text-field>
                            
                            <!-- <v-row class="note-text font-italic text-right-justify">
                                <router-link class="ml-2" to="">Forgot Password?</router-link>
                            </v-row> -->

                            <v-row no-gutters>
                                <v-col class="text-red" style="font-size: 10px;">
                                    {{ errorMessage }}
                                </v-col>
                            </v-row>
                            <v-row class="note-text font-italic" no-gutters>
                                Don't have an account yet? <router-link class="ml-2" to="/register">Register</router-link>
                            </v-row>
                            <v-btn flat class="text-capitalize" @click="onLogin" width="100%" style="background: #E5E2DA; font-weight: bold;">Sign in</v-btn>
                        </v-form>
                        <v-row no-gutters class="text justify-center my-3">Or</v-row>
                        <v-btn class="text-capitalize text-white" color="#3B5998" width="100%" @click="onLoginThroughFB"> Login using Facebook</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data() {
        return {
            user:{
                username: '',
                password: '',
            },
            errorMessage: "",
            showPassword: false,
        }
    },
    mounted(){
        
    },
    methods: {
        async onLogin(){
            const isValid = await this.$refs.form.validate()
            if(!isValid.valid){
                // this.errorMessage = await this.$store.dispatch('loginUser', this.user);
                this.errorMessage = "Login Failed";
            } else {
                this.errorMessage = await this.$store.dispatch('loginUser', this.user);
            }
        },
    },
    mounted(){
    }
}
</script>

<style lang="scss" scoped>
    .note-text {
        font-size: 12px;
        // color: #c5c5c5
    }
    .custom-input {
        position: relative;
    }
    .custom-button {
        position: absolute;
        right: 10px;
        z-index: 2;
        border: none;
        cursor: pointer;
        background-color: transparent;
    }
    .text-right-justify {
        text-align: right;
    }
    .logo-style {
        background-color: #E5E2DA;
    }
    .main-style {
        max-width: 1000px;
        margin-left: auto;
        margin-right: auto;
    }
</style>