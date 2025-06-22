import React, { useState } from 'react';

import $ from 'jquery';
window.$ = $;
window.jQuery = $;

import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';
import PublishButton from './PublishButton';

function BlogMaker() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Create Blog Post</h2>

      <input
        type="text"
        className="w-full border p-2 rounded mb-4"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <FroalaEditor
        tag='textarea'
        model={content}
        onModelChange={setContent}
        config={{
          placeholderText: 'Write your blog here...',
          charCounterCount: true,
          heightMin: 300,
          toolbarButtons: [
            'bold', 'italic', 'underline', 'strikeThrough', '|',
            'formatUL', 'formatOL', '|',
            'insertLink', 'insertImage', 'insertVideo', '|',
            'undo', 'redo', 'html'
          ],
          toolbarSticky: false,
        }}
      />

      <div className="mt-4">
        <PublishButton title={title} content={content} />
      </div>
    </div>
  );
}

export default BlogMaker;
