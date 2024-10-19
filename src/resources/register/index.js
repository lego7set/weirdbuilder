import Blockly from 'blockly/core';
import javascriptGenerator from '../javascriptGenerator';

export default (blockName, jsonData, compileFunction) => {
    for (const property in jsonData) {
        if (['previousStatement', 'nextStatement'].includes(property) && jsonData[property] === null) {
            jsonData[property] == 'Regular'
        }
    }

    const blockObject = {
        init: function () {
            this.jsonInit(jsonData);
        }
    };

    // register visual block
    Blockly.Blocks[blockName] = blockObject

    // register block compile function
    javascriptGenerator[blockName] = (block) => {
        //field safe thing
        let altFunc = a=>block.getField(a).getValue()
        block.getFieldValue = (name) => {
            let returns = altFunc(name)
            if (typeof(returns) == 'string' && name !== "RAW") {
                returns = returns.replace(/\\/g, "\\\\")
                returns = returns.replace(/'/g, "\\'")
                returns = returns.replace(/"/g, "\\\"")
            }
            return returns
        }

        return compileFunction(block)
    };
}