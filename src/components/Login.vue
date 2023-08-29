<template>
    <div class="auth">
        <template v-if="!this.authStore.user">
            <!--OLD CODE-->
            <!-- Email: <input type="text" v-model.trim="email"/>
            <br>
            Password: <input type="password" v-model.trim="password"/>
            <br>
            <button @click="this.authStore.login(this.email, this.password)">Login</button>
            <br/> -->
            <v-sheet rounded>
                <v-card class="mx-auto px-6 py-8" min-width="344">
                    <v-form
                    v-model="form"
                    @submit.prevent="onSubmit">
                        <v-text-field
                        v-model="email"
                        :readonly="loading"
                        :rules="[required]"
                        class="mb-2"
                        clearable
                        label="Email"
                        ></v-text-field>

                        <v-text-field
                        v-model="password"
                        :readonly="loading"
                        :rules="[required]"
                        :type="show1 ? 'text' : 'password'"
                        clearable
                        label="Password"
                        placeholder="Enter your password"
                        ></v-text-field>

                        <br>

                        <v-btn
                        :disabled="!form"
                        :loading="loading"
                        block
                        color="success"
                        size="large"
                        type="submit"
                        variant="elevated"
                        @click="this.authStore.login(this.email, this.password)">
                        Sign In
                        </v-btn>
                    </v-form>
                </v-card>
            </v-sheet>
            <RouterLink to="/register"><button>Sign Up</button></RouterLink>
        </template>
        <template v-else>
            <div>
                {{ this.authStore.email + ', ' + this.authStore.password }}
                <br>
            </div>
            <button @click="this.authStore.logout()">Sign Out</button>
        </template>
    </div>
</template>


<script>
import { useAuthStore } from '../stores/authStore';
import { mapStores } from 'pinia';


export default{
    data(){
        return{
            email: null,
            password: null,
            notFound: false,
            invalidPassword: false,
            loggedIn: false,
        }
    },
    computed:{
        ...mapStores(useAuthStore),
    },
}

</script>