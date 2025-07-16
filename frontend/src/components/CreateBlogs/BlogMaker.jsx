import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { ArrowLeft } from 'phosphor-react';
import { Link, useLocation } from 'react-router-dom';
import PublishButton from './PublishButton';
import axios from 'axios';

function BlogMaker() {
  const location = useLocation();
  const editBlog = location.state?.blog;

  const [title, setTitle] = useState(editBlog?.title || '');
  const [content, setContent] = useState(editBlog?.content || '');

  const API_KEY_URL = 'AIzaSyAp2npRnRiviJpxeawCAjCDJ7SCUqD-f38';


  const apiUrl = async () => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY_URL}`;

    const prompt = `
Write a professional blog post titled: "${title}".

Strictly use this markdown format:

## ${title}

### Introduction

(3-4 sentences introducing the topic)

### Key Point 1: [Insert Relevant Subheading]

- Bullet 1
- Bullet 2

### Key Point 2: [Insert Relevant Subheading]

- Explanation
- Examples
- Lists if needed

### Conclusion

Summarize the post in 2-3 sentences.

Rules:
- Use proper markdown.
- Add line breaks after all headings.
- Do NOT append text to the title heading line.
`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };

    try {
      const response = await axios.post(url, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const aiText = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (aiText) {
        const cleanBlogMarkdown = (text) => {
          return text
            // Add new lines after headings
            .replace(/(#+ .+)/g, '\n$1\n')
            // Remove duplicate newlines
            .replace(/\n{3,}/g, '\n\n')
            // Clean up any strange title formatting issues
            .replace(/##\s+([^\n]+)\n+(.+)/, '## $1\n\n$2')
            .trim();
        };

        const cleanedText = cleanBlogMarkdown(aiText);
        setContent(cleanedText);
      }

    } catch (error) {
      console.error('Error occurred:', error);
    }
  };


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
      <button onClick={apiUrl}>Use Ai</button>

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
