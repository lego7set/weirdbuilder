import Blockly from "blockly/core";
import { basicSetup, EditorView } from "codemirror";
import { autocompletion } from "@codemirror/autocomplete";
import { keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";

const { utils: { dom, Svg } } = Blockly

export default function registerField() {
  Blockly.fieldRegistry.unregister('field_javascript');
  Blockly.FieldJavascript = (
    class jseditor extends Blockly.Field {
      SERIALIZABLE = true
      static fromJson(options) {
        return new this(String(options.value))
      }
      initView() {
        this.createBorderRect_();
        this.createEditor_();
      }
      
      createEditor_() {
        this.container_ = dom.createSvgElement(
          Svg.FOREIGNOBJECT,
          {
            class: "editorContainer"
          },
          this.fieldGroup_
        );
        console.log(this.container_);
        const js = javascript();
        /* 
        const completions = [
          {label: "panic", type: "keyword"},
          {label: "park", type: "constant", info: "Test completion"},
          {label: "password", type: "variable", detail: "test"},
          {label: "magic", type: "keyword", apply: "⠁⭒*.✩.*⭒⠁", detail: "macro"},
          {label: "globalThis", type: "constant"}
        ]
        
        function myCompletions(context) {
          let before = context.matchBefore(/\w+/)
          // If completion wasn't explicitly started and there
          // is no word before the cursor, don't open completions.
          if (!context.explicit && !before) return null
          return {
            from: before ? before.from : context.pos,
            options: completions,
            validFor: /^\w*$/
          }
        }
        */
        // js.language.data.of({ autocomplete: myCompletions })

        this.view_ = new EditorView({
          doc: String(this.value_),
          extensions: [
            basicSetup,
            keymap.of([indentWithTab]),
            js,
            autocompletion(),
            EditorView.updateListener.of((v) => {
              console.log(v, v.docChanged);
              if (v.docChanged) {
                // Document changed
                this.setValue(this.view_.state.doc.toString())
              }
           })
          ],
          parent: this.container_
        });
        console.log(this.view_)
      }

      toXml(el) {
        el.textContent = this.value_.replace(/\n/g, "&#10;");
        return el;
      }
      fromXml(el) {
        this.setValue(el.textContent.replace(/&#10;/g, "\n"))
      }
    }
  )
  Blockly.fieldRegistry.register('field_javascript', Blockly.FieldJavascript)
}
