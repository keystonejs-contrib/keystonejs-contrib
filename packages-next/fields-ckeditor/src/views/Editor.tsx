import React, { useLayoutEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import EditorBuild from '@ckeditor/ckeditor5-build-classic';

const Editor = (props: any) => {
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useLayoutEffect(() => {
    setIsLayoutReady(true);
  }, []);

  return <div>{isLayoutReady ? <CKEditor editor={EditorBuild} {...props} /> : null}</div>;
  return <div>Test</div>;
};

export default Editor;
