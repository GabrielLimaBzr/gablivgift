import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/styles/essential.css'
import 'vuestic-ui/styles/typography.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)


app.use(createVuestic({
    config: {
        colors: {
            variables: {
                primary: "#f32c42",
                secondary: "#36a8b3",
                backgroundPrimary: "#fdfffb",
                backgroundSecondary: "#caccc8",
                customBg: "#292929aa"
            }
        }
    }
}));
app.mount('#app')
