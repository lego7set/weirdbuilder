import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'json_';
const categoryColor = '#FF661A';

function register() {
    // check if a string is json
    registerBlock(`${categoryPrefix}validate`, {
        message0: 'is %1 valid JSON?',
        args0: [
            {
                "type": "input_value",
                "name": "INPUT",
                "check": "String"
            }
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const INPUT = block.getFieldValue('INPUT')
        return [`(() => { try { JSON.parse(${INPUT}); return true; } catch { return false; } })()`, javascriptGenerator.ORDER_ATOMIC];
    })

    // convert string to json
    registerBlock(`${categoryPrefix}tojson`, {
        message0: 'string %1 to JSON',
        args0: [
            {
                "type": "input_value",
                "name": "INPUT",
                "check": "String"
            }
        ],
        output: ["JSONArray", "JSONObject"],
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const INPUT = block.getFieldValue('INPUT')
        return [`(() => { try { return JSON.parse(${INPUT}); } catch { return false; } })()`, javascriptGenerator.ORDER_ATOMIC];
    })

    // convert json to string
    registerBlock(`${categoryPrefix}tostring`, {
        message0: 'JSON %1 to string',
        args0: [
            {
                "type": "input_value",
                "name": "INPUT",
                "check": ["JSONArray", "JSONObject"]
            }
        ],
        output: "String",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const INPUT = block.getFieldValue('INPUT')
        return [`JSON.stringify(${INPUT})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // insert
    registerBlock(`${categoryPrefix}arrayinsert`, {
        message0: 'insert %1 at end of %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "JSONArray"
            },
        ],
        output: "String",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = block.getFieldValue('X')
        const Y = block.getFieldValue('Y')
        return [`(${X}.push(${Y}))`, javascriptGenerator.ORDER_ATOMIC];
    })

    // get
    registerBlock(`${categoryPrefix}arrayget`, {
        message0: 'get %1 from array %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "JSONArray"
            },
        ],
        output: "String",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = block.getFieldValue('X')
        const Y = block.getFieldValue('Y')
        return [`(${X}[${Y}])`, javascriptGenerator.ORDER_ATOMIC];
    })
}

export default register;