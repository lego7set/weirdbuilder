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
            width: "350",
            height: "30",
            class: "editorContainer",
            overflow: "visible"
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
            // EditorView.lineWrapping,
            autocompletion(),
            EditorView.updateListener.of((v) => {
              console.log(v, v.docChanged);
              if (v.heightChanged) { this.container_.setAttribute("height", (this.container_.firstChild.offsetHeight || 30)); this.size_.height = (this.container_.firstChild.offsetHeight || 30); this.forceRerender() }
              //this.size_.width = this.container_.firstChild.offsetWidth;
              //this.container_.setAttribute("width", this.container_.firstChild.offsetWidth);
              if (v.docChanged) {
                // Document changed
                this.setValue(this.view_.state.doc.toString())
              }
           })
          ],
          parent: this.container_
        });
        console.log(this.view_);
        this.size_.width = 380;
        this.size_.height = (this.container_.firstChild.offsetHeight || 30);
        console.log(this.container_.firstChild);
        this.container_.setAttribute("height", (this.container_.firstChild.offsetHeight || 30));
        this.container_.firstChild.style.left = "20";
        this.container_.firstChild.style.bottom = "3";
        this.container_.firstChild.style.borderRadius = "80px";
      }

      getText() {
        return this.value_.substring(0, 8) + "..."
      }

      toXml(el) {
        el.textContent = this.value_.replace(/\n/g, "&#10;");
        return el;
      }
      fromXml(el) {
        this.setValue(el.textContent.replace(/&#10;/g, "\n"))
      }
      render_() {}
    }
  )
  Blockly.fieldRegistry.register('field_javascript', Blockly.FieldJavascript)
}
