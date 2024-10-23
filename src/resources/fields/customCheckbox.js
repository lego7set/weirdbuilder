import Blockly from 'blockly/core';

export default function registerField() {
  console.log(Object.keys(Blockly));
  console.log(Object.keys(Blockly.FieldCheckbox.prototype));

  Blockly.fieldRegistry.unregister('field_better_checkbox');
  
  Blockly.FieldBetterCheckbox = function(opt_value) {
      Blockly.FieldCheckbox.call(this, opt_value);
  };
  Blockly.FieldBetterCheckbox.prototype = Object.create(Blockly.FieldCheckbox.prototype);
  Blockly.FieldBetterCheckbox.prototype.constructor = Blockly.FieldBetterCheckbox;
  Blockly.FieldBetterCheckbox.superClass_ = Blockly.FieldCheckbox.prototype;
  
  Blockly.FieldBetterCheckbox.prototype.init = function() {
      Blockly.FieldBetterCheckbox.superClass_.init.call(this);
      this.setValue(this.getValue());
  };
  
  Blockly.FieldBetterCheckbox.prototype.getText = function() {
      return this.getValue() ? '✓' : '✗';
  };
  
  
  Blockly.FieldBetterCheckbox.prototype.render_ = function() {
      console.log(this.getTextElement());
      Blockly.FieldBetterCheckbox.superClass_.render_.call(this);
  };

  Blockly.FieldBetterCheckbox.fromJson = function(options) {
    const checked = Boolean(Blockly.utils.parsing.replaceMessageReferences(
      options['checked']));
    return new (Blockly.FieldBetterCheckbox)(checked);
  }
  
  Blockly.fieldRegistry.register('field_better_checkbox', Blockly.FieldBetterCheckbox);
}
