import {loggers} from "winston";
import {Container} from "typedi/Container";

export function Logger(name: string = 'default'): Function {
    return function(target: Function, key: string, index: number) {

        Container.registerCustomParamHandler({
            type: target,
            index: index,
            getValue: () => {
                return loggers.get(name);
            }
        });

    }
}
