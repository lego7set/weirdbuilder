import Blockly from 'blockly/core';

export default function registerField() {
  console.log(Object.keys(Blockly));
  console.log(Object.keys(Blockly.FieldCheckbox.prototype));
  
  const fromJson = function(options) {
    this.setValue(!!options['checked']);
  };
  
  Blockly.FieldBetterCheckbox = function(opt_value) {
      Blockly.FieldCheckbox.call(this, opt_value);
  };
  Blockly.FieldBetterCheckbox.prototype = Object.create(Blockly.FieldCheckbox.prototype);
  Blockly.FieldBetterCheckbox.prototype.constructor = Blockly.FieldBetterCheckbox;
  Blockly.FieldBetterCheckbox.superClass_ = Blockly.FieldCheckbox.prototype;
  
  Blockly.FieldBetterCheckbox.prototype.init = function() {
      Blockly.FieldBetterCheckbox.superClass_.init.call(this);
      this.setValue(this.getValue());
      this.fromJson = fromJson.bind(this);
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
