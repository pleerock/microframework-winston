# Winston module for Microframework

Adds integration between [winston](https://github.com/winstonjs/winston) and 
[microframework](https://github.com/PLEEROCK/microframework).

## Usage

1. Install module:

    `npm install --save microframework-winston`

2. Simply register module in the microframework when you are bootstrapping it.
    
    ```typescript
    
        import {MicroFrameworkBootstrapper} from "microframework/MicroFrameworkBootstrapper";
        import {WinstonModule} from "microframework-winston/WinstonModule";
        
        new MicroFrameworkBootstrapper({ baseDirectory: __dirname })
            .registerModules([
                new WinstonModule()
            ])
            .bootstrap()
            .then(result => console.log('Module is running. Logging is available now.'))
            .catch(error => console.error('Error: ', error));
            
    ```

3. Now you can use [winston](http://github.com/PLEEROCK/winston) module in your microframework.

## Todos

* cover with tests
* add more docs