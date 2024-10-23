import Blockly from 'blockly/core';

export default function registerField() {
  console.log(Blockly);
  Blockly.FieldBetterCheckbox = function(opt_value) {
      Blockly.FieldCheckbox.call(this, opt_value);
  };
  Blockly.utils.object.inherits(Blockly.FieldCustomCheckbox, Blockly.FieldCheckbox);
  
  Blockly.FieldBetterCheckbox.prototype.init = function() {
      Blockly.FieldBetterCheckbox.superClass_.init.call(this);
      this.setValue(this.getValue());
  };
  
  Blockly.FieldBetterCheckbox.prototype.getText = function() {
      return this.getValue() ? '✓' : '✗';
  };
  
  
  Blockly.FieldBetterCheckbox.prototype.render = function() {
      this.textElement_.textContent = this.getText();
      Blockly.FieldBetterCheckbox.superClass_.render.call(this);
  };
  
  Blockly.fieldRegistry.register('field_better_checkbox', Blockly.FieldBetterCheckbox);
}
