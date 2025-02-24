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
                backgroundPrimary: "#000000",
                backgroundSecondary: "#292929",
                customBg: "#2929296a"
            }
        },
        components: {
            VaButton: true,
            VaInput: true,
            VaChip: true,
            VaScrollContainer: true,
            VaSelect: true,
            VaModal: true,
            VaIcon: {
                sizesConfig: {
                    defaultSize: 16,
                    sizes: {
                        small: 16,
                        medium: 24,
                        large: 32,
                    },
                },
            },
            VaForm: true,
            VaInputWrapper: true,
            VaTextarea: true,
            VaFileUpload: true,
            VaFormField: true,
            VaSwitch: true,
            VaButtonDropdown: true,
            VaMenu: true,
            VaMenuList: true,
            VaMenuItem: true,
            VaDivider: true,
            VaCard: true,
            VaCardContent: true,
            VaSkeleton: true,
            VaCardActions: true,
            VaPagination: true,
            VaSkeletonGroup: true,
            VaDropdownContent: true,
            VaDropdown: true,
            VaAlert: true,
            VaToast: {
                offsetY: 100,
            },
            VaTabs: true,
            VaInnerLoading: true,
        },
    }
}));
app.mount('#app')
