import {Module, ModuleInitOptions} from "microframework/Module";
import {WinstonModuleConfig} from "./WinstonModuleConfig";
import {loggers} from "winston";

/**
 * Winston module integration with microframework.
 */
export class WinstonModule implements Module {

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    private options: ModuleInitOptions;
    private configuration: WinstonModuleConfig;

    // -------------------------------------------------------------------------
    // Accessors
    // -------------------------------------------------------------------------

    getName(): string {
        return 'WinstonModule';
    }

    getConfigurationName(): string {
        return 'winston';
    }

    isConfigurationRequired(): boolean {
        return true;
    }

    init(options: ModuleInitOptions, configuration: WinstonModuleConfig): void {
        this.options = options;
        this.configuration = configuration;
    }

    onBootstrap(): Promise<any> {
        this.setupLoggers();
        return Promise.resolve();
    }

    onShutdown(): Promise<any> {
        return Promise.resolve();
    }

    // -------------------------------------------------------------------------
    // Accessors
    // -------------------------------------------------------------------------

    private setupLoggers() {

        if (this.configuration.defaultLogger) {
            loggers.add('default', this.configuration.defaultLogger.transports);
        }

        if (this.configuration.loggers) {
            this.configuration.loggers.forEach(logger => {
                loggers.add(logger.name, logger.transports);
            });
        }
    }

}