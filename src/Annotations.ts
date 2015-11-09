import {loggers} from "winston";
import {Container} from "typedi/Container";

/**
 * Injects a winston's LoggerInstance registered with the specific name.
 */
export function Logger(name: string = 'default'): Function {
    return function(target: Function, key: string, index: number) {

        Container.registerCustomParamHandler({
            type: target,
            index: index,
            getValue: () => loggers.get(name)
        });
    }
}
