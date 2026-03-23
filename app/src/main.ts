import {type App, createApp} from "vue";
import {createMVVM} from "vue-mvvm";

import MVVMApp from "./App.vue";
import {AppConfig} from "./config";
import "./main.css";


const app: App = createApp(MVVMApp)
const config: AppConfig = new AppConfig(
    "http://127.0.0.1:54321",
    import.meta.env.VITE_ANON_KEY,
    "app",
    "http://localhost:5173");

app.use(createMVVM(config));

config.trySSO().then(() => app.mount("#app"));

