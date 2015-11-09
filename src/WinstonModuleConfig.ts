/**
 * Configuration for mf-winston module.
 */
export interface WinstonModuleConfig {

    /**
     * If set to true then microframework and all its modules gonna use this logger.
     */
    useAsAppLogger: boolean;

    /**
     * Default logger.
     */
    defaultLogger: {
        transports: { [name: string]: Object; };
    }

    /**
     * Extra loggers.
     */
    loggers: {
        /**
         * Logger name.
         */
        name: string;

        /**
         * Logger transports.
         */
        transports: { [name: string]: Object; };

    }[];

}
