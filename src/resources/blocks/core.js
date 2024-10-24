import javascriptGenerator from "../javascriptGenerator";
import registerBlock from "../register";

const prefix = "core_";
const color = "#FFFFFF"; // white

export default function register() {
  registerBlock(`${prefix}number`, {
        message0: '%1',
        args0: [
            {
                "type": "field_number",
                "name": "NUM",
                "value": 0
            }
        ],
        output: ["Number", "Core"],
        inputsInline: true,
        colour: color
    }, (block) => {
        const num = block.getFieldValue('NUM');
        let code = !Number.isNaN(Number(num)) ? `(${num})` : "NaN";
        return [code, javascriptGenerator.ORDER_ATOMIC];
    });

  registerBlock(`${prefix}text`, {
        message0: '%1',
        args0: [
            {
                "type": "field_input",
                "name": "TEXT",
                "text": ""
            }
        ],
        output: ["String", "Core"],
        inputsInline: true,
        colour: color
    }, (block) => {
        const TEXT = block.getFieldValue('TEXT');
        const code = JSON.stringify(TEXT);
        return [code, javascriptGenerator.ORDER_ATOMIC];
    });
  registerBlock(`${prefix}checkbox`, {
    message0: "%1",
    args0: [
      {
        type: "field_better_checkbox",
        name: "CHECKBOX",
        checked: true
      }
    ],
    output: ["Boolean", "Core"],
    inputsInline: true,
    colour: color
  }, (block) => {
        const TEXT = block.getFieldValue('CHECKBOX');
        return [TEXT === "TRUE" ? "true" : "false", javascriptGenerator.ORDER_ATOMIC]
    }),

  registerBlock(`${prefix}javascriptText`, {
    message0: "%1",
    args0: [
      {
        type: "field_javascript",
        name: "TEXT",
        value: 'console.log("Hello, World!")'
      }
    ],
    output: ["String", "JavascriptText", "Core"],
    inputsInline: true,
    colour: color
  }, (block) => {
    return [block.getFieldValue("TEXT"), javascriptGenerator.ORDER_ATOMIC]
  });
}
