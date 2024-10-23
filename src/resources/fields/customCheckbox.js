import Blockly from 'blockly/core';

export default function registerField() {
  console.log(Object.keys(Blockly));
  console.log(Object.keys(Blockly.FieldCheckbox.prototype));

  Blockly.fieldRegistry.unregister('field_better_checkbox');

  Blockly.FieldBetterCheckbox = (
    class btcheckbox extends Blockly.FieldCheckbox {
      constructor(value) {
        super(value);
      }
      initView() {
        super.initView();
        textElement.style.display = "block"; // override none
      }
      getDisplayText_() {
        return this.getValueBoolean() ? '✓' : '✗';
      }
    }
  )
  
  Blockly.fieldRegistry.register('field_better_checkbox', Blockly.FieldBetterCheckbox);
}
