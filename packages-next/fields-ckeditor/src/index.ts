import path from 'path';
// @ts-ignore
import { CKEditor } from '@keystonejs-contrib/fields-ckeditor';
import type { FieldType, FieldConfig, BaseGeneratedListTypes } from '@keystone-next/types';

type CKEditorFieldConfig<
  TGeneratedListTypes extends BaseGeneratedListTypes
> = FieldConfig<TGeneratedListTypes> & {
  isRequired?: boolean;
  editorConfig: any;
};

export const ckEditor = <TGeneratedListTypes extends BaseGeneratedListTypes>({
  editorConfig,
  ...config
}: CKEditorFieldConfig<TGeneratedListTypes>): FieldType<TGeneratedListTypes> => ({
  type: CKEditor,
  config: {
    editorConfig,
    ...config,
  } as any,
  getAdminMeta(): any {
    return {
      editorConfig,
      ...config,
    };
  },
  views: path.join(
    path.dirname(require.resolve('@keystonejs-contrib-next/fields-ckeditor/package.json')),
    'views'
  ),
});
