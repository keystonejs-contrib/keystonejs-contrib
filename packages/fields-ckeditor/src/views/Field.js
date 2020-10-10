import React from 'react';

import { FieldContainer, FieldLabel } from '@arch-ui/fields';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DropdownView from '@ckeditor/ckeditor5-ui/src/dropdown/dropdownview';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';

const CKEditorField = ({ onChange, autoFocus, field, errors, value = '', isDisabled }) => {
  const htmlID = `ks-input-${field.path}`;
  const accessError = errors.find(
    (error) => error instanceof Error && error.name === 'AccessDeniedError'
  );

  if (accessError) return null;

  return (
    <FieldContainer>
      <FieldLabel htmlFor={htmlID} field={field} errors={errors} />
      <div css={{ display: 'flex', flex: 1 }}>
        <CKEditor
          editor={ClassicEditor}
          onChange={(_, editor) => onChange(editor.getData())}
          data={value}
          disabled={isDisabled}
          {...field.config.editorConfig}
          onInit={(editor) => {
            if (autoFocus) editor.editing.view.focus();
            // editor.config.removePlugins = ['ImageUpload'];
            const { imageList } = field.config;
            if (imageList) {
              editor.plugins.init([
                class KeystoneImage extends Plugin {
                  init() {
                    const editor = this.editor;
                    editor.ui.componentFactory.add('keystoneImage', (locale) => {
                      const view = DropdownView(locale);

                      view.set({
                        label: 'Insert image',
                        icon: imageIcon,
                        tooltip: true,
                      });

                      view.on('execute', () => {
                        const imageURL = prompt('Image URL');
                        editor.model.change((writer) => {
                          editor.model.insertContent(
                            writer.createElement('image', {
                              src: imageUrl,
                            }),
                            editor.model.document.selection
                          );
                        });
                      });

                      return view;
                    });
                    editor.config.define('toolbar', 'keystoneImage');
                  }
                },
              ]);
            }
            if (field.config.editorConfig && field.config.editorConfig.onInit)
              field.config.editorConfig.onInit(editor);
          }}
        />
      </div>
    </FieldContainer>
  );
};

export default CKEditorField;
