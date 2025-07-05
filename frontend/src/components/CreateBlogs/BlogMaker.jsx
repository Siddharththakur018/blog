import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { ArrowLeft } from 'phosphor-react';
import { Link, useLocation } from 'react-router-dom';
import PublishButton from './PublishButton';

function BlogMaker() {
  const location = useLocation();
  const editBlog = location.state?.blog;

  const [title, setTitle] = useState(editBlog?.title || '');
  const [content, setContent] = useState(editBlog?.content || '');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        to="/blog-view"
        className="flex items-center text-gray-600 hover:text-black transition duration-200 mb-8"
      >
        <ArrowLeft size={24} weight="bold" className="mr-2" />
        <span className="text-sm font-medium">Back to Blogs</span>
      </Link>

      <h2 className="text-2xl font-semibold mb-4">
        {editBlog ? 'Update Blog Post' : 'Create Blog Post'}
      </h2>

      <input
        type="text"
        className="w-full border p-2 rounded mb-4"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* TinyMCE Editor */}
      <Editor
        apiKey="nwpfrqu2brgnghj0jbw2g4iaxo2wpt04wimcfhkcwzvoxvb2"
        value={content}
        onEditorChange={(newContent) => setContent(newContent)}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists',
            'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
            'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed',
            'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable',
            'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments',
            'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography',
            'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
          ],
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | ' +
            'link image media table mergetags | addcomment showcomments | spellcheckdialog ' +
            'a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | ' +
            'emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          ai_request: (request, respondWith) =>
            respondWith.string(() =>
              Promise.reject('See docs to implement AI Assistant')
            ),
        }}
      />

      <div className="mt-4">
        <PublishButton
          title={title}
          content={content}
          isEditing={!!editBlog}
          blogId={editBlog?._id}
        />
      </div>
    </div>
  );
}

export default BlogMaker;
