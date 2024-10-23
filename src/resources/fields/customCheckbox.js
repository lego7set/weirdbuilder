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
        this.getTextElement().style.display = "block"; // override none
      }
      setValue(...args) {
        console.log(...args);
        super.setValue(...args);
        if (this.textElement_) (this.getTextElement().style.display = "block"), this.forceRerender(); // idk
      }
      doValueUpdate() {
        super.doValueUpdate();
        console.log(this.getTextElement());
        if (this.textElement_) {
          this.textElement_.style.display = "block" // override none, again
          console.log(this.textElement_, this.getTextElement())
        }
      }
      getDisplayText_() {
        return this.getValueBoolean() ? '✓' : '✗';
      }
    }
  )
  
  Blockly.fieldRegistry.register('field_better_checkbox', Blockly.FieldBetterCheckbox);
}
