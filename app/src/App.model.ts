import {ViewModel} from "vue-mvvm";
import {RouterService} from "vue-mvvm/router";

export class AppModel extends ViewModel {
    private readonly routerService: RouterService;

    public readonly routerViewKey: string = this.computed(() =>
        this.routerService.getNative().currentRoute.value.path
    );
    public readonly isDashboardActive: boolean = this.computed(() => this.routerViewKey == "/");
    public readonly isTodosActive: boolean = this.computed(() => this.routerViewKey == "/todos");
    public readonly isProjectActive: string | undefined = this.computed(() => {
        if (this.isDashboardActive) {
            return undefined;
        }

        if (!this.routerViewKey.startsWith("/project/")) {
            return undefined;
        }

        return this.routerService.params.getString("id");
    });

    public constructor() {
        super();

        this.routerService = this.ctx.getService(RouterService);

    }

}