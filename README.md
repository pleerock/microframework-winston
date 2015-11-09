# Winston module for Microframework

Adds integration between [winston][1] and [microframework][2].

## Simple Usage

Assuming you have already installed [microframework][2]. If you didn't do it yet, go to its page, read instructions
 and install it.

1. Install module:

    `npm install --save microframework-winston`

2. Install required [tsd](http://definitelytyped.org/tsd/) dependencies:

    `tsd install --save winston es6-promise`

3. Simply register module in the microframework when you are bootstrapping it.
    
    ```typescript
    
    import {MicroFrameworkBootstrapper} from "microframework/MicroFrameworkBootstrapper";
    import {WinstonModule} from "microframework-winston/WinstonModule";
    
    new MicroFrameworkBootstrapper({ baseDirectory: __dirname })
        .registerModules([
            // ... your other modules ...
            new WinstonModule()
        ])
        .bootstrap()
        .then(result => console.log('Module is running. Logging is available now.'))
        .catch(error => console.error('Error: ', error));
            
    ```
    
4. Add configuration section to your microframework's configuration:

    ```json

    {
        "winston": {
            "defaultLogger": {
                "transports": {
                    "console": {
                        "colorize": true,
                        "prettyPrint": true
                    },
                    "file": {
                        "prettyPrint": true,
                        "logstash": true,
                        "filename": "logs.log"
                    }
                }
            }
        }
    }
    ```
    
    This configuration will add two winston transports: **console** and **file**, you can add/remove transports.
    For more options on "transports" please take a look winston documentation
    [here](https://github.com/winstonjs/winston#working-with-multiple-loggers-in-winston) and 
    [here](https://github.com/winstonjs/winston/blob/master/docs/transports.md).

5. Now you can inject winston logger instance in your classes:

    ```typescript
    
    export class UserRepository {
    
        private logger: LoggerInstance;
    
        constructor(@Logger() logger: LoggerInstance) {
            this.logger = logger;
        }
        
        find() {
            this.logger.info('Users has been found');
        }
        
        save() {
            this.logger.info('User has been saved');
        }
        
        remove() {
            this.logger.error('Sorry, cannot remove given user');
        }
    
    }
    
    ```

## Using multiple loggers

You can use multiple loggers. To do so, you need to define extra loggers in the configuration:

```json
{
    "winston": {
        "defaultLogger": {
            "transports": {
                "console": {
                    "colorize": true,
                    "prettyPrint": true
                },
                "file": {
                    "prettyPrint": true,
                    "logstash": true,
                    "filename": "logs.log"
                }
            }
        },
        "loggers": [{
            "name": "consoleLogger",
            "transports": {
                "console": {
                    "prettyPrint": true,
                    "colorize": true
                }
            }
        },{
            "name": "fileLogger",
            "transports": {
                "file": {
                    "prettyPrint": true,
                    "logstash": true,
                    "filename": "logs.log"
                }
            }
        }]
    }
}

```

This configuration will create 3 loggers: **default**, **consoleLogger** and **fileLogger**. 
You will be able to inject them by specifying a name parameter to `@Logger` annotation:

```typescript
constructor(@Logger() defaultLogger: LoggerInstance,
            @Logger('consoleLogger') consoleLogger: LoggerInstance,
            @Logger('fileLogger') fileLogger: LoggerInstance) {
    this.defaultLogger = defaultLogger;
    this.consoleLogger = consoleLogger;
    this.fileLogger = fileLogger;
}
```

## Todos

* check what extra winston features can be used and implement its configuration

[1]: https://github.com/PLEEROCK/microframework
[2]: https://github.com/winstonjs/winston