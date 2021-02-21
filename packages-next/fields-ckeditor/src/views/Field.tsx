import React from 'react';
import { FieldProps } from '@keystone-next/types';

import { FieldContainer, FieldLabel } from '@keystone-ui/fields';

import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('./Editor'), {
  ssr: false,
});

export const Field = ({
  onChange,
  autoFocus,
  field,
  errors,
  value = '',
  isDisabled,
}: FieldProps<typeof import('.').controller>) => {
  const accessError = errors?.find(
    (error: any) => error instanceof Error && error.name === 'AccessDeniedError'
  );

  if (accessError) return null;

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <div css={{ display: 'flex', flex: 1 }}>
        <Editor
          onChange={(_, editor) => onChange(editor.getData())}
          data={value}
          disabled={isDisabled}
          {...field.config?.editorConfig}
          // onReady={(editor) => {
          //   if (autoFocus) editor.editing.view.focus();
          //   if (field.config?.editorConfig && field.config.editorConfig.onInit)
          //     field.config?.editorConfig.onInit(editor);
          // }}
        />
      </div>
    </FieldContainer>
  );
};
